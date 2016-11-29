/*! @preserve
 * numeral.js
 * version : 1.5.6
 * author : Adam Draper
 * license : MIT
 * http://adamwdraper.github.com/Numeral-js/
 */

(function() {

    /************************************
        Variables
    ************************************/

    var numeral,
        VERSION = '1.5.6',
        // internal storage for locale config files
        locales = {},
        defaults = {
            currentLocale: 'en',
            zeroFormat: null,
            nullFormat: null,
            defaultFormat: '0,0'
        },
        options = {
            currentLocale: defaults.currentLocale,
            zeroFormat: defaults.zeroFormat,
            nullFormat: defaults.nullFormat,
            defaultFormat: defaults.defaultFormat
        },
        config = {
            bytes: {
                decimal: {
                    base: 1000,
                    suffixes: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
                },
                binary: {
                    base: 1024,
                    suffixes: ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
                }
            }
        };


    /************************************
        Constructors
    ************************************/


    // Numeral prototype object
    function Numeral(number) {
        this._value = number;
    }

    /**
     * Implementation of toFixed() that treats floats more like decimals
     *
     * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
     * problems for accounting- and finance-related software.
     */
    function toFixed (value, maxDecimals, roundingFunction, optionals) {
        var splitValue = value.toString().split('.'),
            minDecimals = maxDecimals - (optionals || 0),
            boundedPrecision,
            optionalsRegExp,
            power,
            output;

        // Use the smallest precision value possible to avoid errors from floating point representation
        if (splitValue.length === 2) {
          boundedPrecision = Math.min(Math.max(splitValue[1].length, minDecimals), maxDecimals);
        } else {
          boundedPrecision = minDecimals;
        }

        power = Math.pow(10, boundedPrecision);

        //roundingFunction = (roundingFunction !== undefined ? roundingFunction : Math.round);
        // Multiply up by precision, round accurately, then divide and use native toFixed():
        output = (roundingFunction(value * power) / power).toFixed(boundedPrecision);

        if (optionals > maxDecimals - boundedPrecision) {
            optionalsRegExp = new RegExp('\\.?0{1,' + (optionals - (maxDecimals - boundedPrecision)) + '}$');
            output = output.replace(optionalsRegExp, '');
        }

        return output;
    }

    /************************************
        Formatting
    ************************************/

    // determine what type of formatting we need to do
    function formatNumeral(n, format, roundingFunction) {
        var value = n._value,
            kind,
            output,
            formatFunction;

        if (value === 0 && options.zeroFormat !== null) {
            output = options.zeroFormat;
        } else if (value === null && options.nullFormat !== null) {
            output = options.nullFormat;
        } else {
            kind = format.match(/(\$|%|:|[ai]?b|o|e\+|e-)/);

            switch (kind ? kind[0] : '') {
                case '$':
                    formatFunction = formatCurrency;
                    break;
                case '%':
                    formatFunction = formatPercentage;
                    break;
                case ':':
                    formatFunction = formatTime;
                    break;
                case 'b':
                case 'ib':
                    formatFunction = formatBytes;
                    break;
                case 'o':
                    formatFunction = formatOrdinal;
                    break;
                case 'e+':
                case 'e-':
                    formatFunction = formatExponential;
                    break;
                default:
                    formatFunction = formatNumber;
            }

            output = formatFunction(value, format, roundingFunction);
        }

        return output;
    }

    function formatCurrency(value, format, roundingFunction) {
        var symbolIndex = format.indexOf('$'),
            openParenIndex = format.indexOf('('),
            minusSignIndex = format.indexOf('-'),
            space = format.includes(' $') || format.includes('$ ') ? ' ' : '',
            spliceIndex,
            output;

        // check for space before or after currency
        format = format.replace(/\s?\$\s?/, '');

        // format the number
        output = formatNumber(value, format, roundingFunction);

        // position the symbol
        if (symbolIndex <= 1) {
            if (output.includes('(') || output.includes('-')) {
                output = output.split('');
                spliceIndex = 1;
                if (symbolIndex < openParenIndex || symbolIndex < minusSignIndex) {
                    // the symbol appears before the "(" or "-"
                    spliceIndex = 0;
                }
                output.splice(spliceIndex, 0, locales[options.currentLocale].currency.symbol + space);
                output = output.join('');
            } else {
                output = locales[options.currentLocale].currency.symbol + space + output;
            }
        } else {
            if (output.includes(')')) {
                output = output.split('');
                output.splice(-1, 0, space + locales[options.currentLocale].currency.symbol);
                output = output.join('');
            } else {
                output = output + space + locales[options.currentLocale].currency.symbol;
            }
        }

        return output;
    }

    function formatPercentage(value, format, roundingFunction) {
        var space = format.includes(' %') ? ' ' : '',
            output;

        value = value * 100;

        // check for space before %
        format = format.replace(/\s?\%/, '');

        output = formatNumber(value, format, roundingFunction);

        if (output.includes(')')) {
            output = output.split('');
            output.splice(-1, 0, space + '%');
            output = output.join('');
        } else {
            output = output + space + '%';
        }

        return output;
    }

    function formatBytes(value, format, roundingFunction) {
        var output,
            bytes = format.includes('ib') ? config.bytes.binary : config.bytes.decimal,
            suffix = format.includes(' b') || format.includes(' ib') ? ' ' : '',
            power,
            min,
            max;

        // check for space before
        format = format.replace(/\s?i?b/, '');

        for (power = 0; power <= bytes.suffixes.length; power++) {
            min = Math.pow(bytes.base, power);
            max = Math.pow(bytes.base, power + 1);

            if (value === null || value === 0 || value >= min && value < max) {
                suffix += bytes.suffixes[power];

                if (min > 0) {
                    value = value / min;
                }

                break;
            }
        }

        output = formatNumber(value, format, roundingFunction);

        return output + suffix;
    }

    function formatOrdinal(value, format, roundingFunction) {
        var output,
            ordinal = format.includes(' o') ? ' ' : '';

        // check for space before
        format = format.replace(/\s?o/, '');

        ordinal += locales[options.currentLocale].ordinal(value);

        output = formatNumber(value, format, roundingFunction);

        return output + ordinal;
    }

    function formatExponential(value, format, roundingFunction) {
        var output,
            exponential = typeof value === 'number' && !Number.isNaN(value) ? value.toExponential() : '0e+0',
            parts = exponential.split('e');

        format = format.replace(/e[\+|\-]{1}0/, '');

        output = formatNumber(Number(parts[0]), format, roundingFunction);

        return output + 'e' + parts[1];
    }

    function formatTime(value) {
        var hours = Math.floor(value / 60 / 60),
            minutes = Math.floor((value - (hours * 60 * 60)) / 60),
            seconds = Math.round(value - (hours * 60 * 60) - (minutes * 60));

        return hours + ':' + ((minutes < 10) ? '0' + minutes : minutes) + ':' + ((seconds < 10) ? '0' + seconds : seconds);
    }

    function formatNumber(value, format, roundingFunction) {
        var negP = false,
            signed = false,
            optDec = false,
            abbr = '',
            abbrK = false, // force abbreviation to thousands
            abbrM = false, // force abbreviation to millions
            abbrB = false, // force abbreviation to billions
            abbrT = false, // force abbreviation to trillions
            abbrForce = false, // force abbreviation
            trillion = 1000000000000,
            billion = 1000000000,
            million = 1000000,
            thousand = 1000,
            abs,
            min,
            max,
            power,
            w,
            precision,
            thousands,
            d = '',
            neg = false;

        // make sure we never format a null value
        value = value || 0;

        abs = Math.abs(value);

        // see if we should use parentheses for negative number or if we should prefix with a sign
        // if both are present we default to parentheses
        if (format.includes('(')) {
            negP = true;
            format = format.slice(1, -1);
        } else if (format.includes('+')) {
            signed = true;
            format = format.replace(/\+/g, '');
        }

        // see if abbreviation is wanted
        if (format.includes('a')) {
            // check if abbreviation is specified
            abbrK = format.includes('ak');
            abbrM = format.includes('am');
            abbrB = format.includes('ab');
            abbrT = format.includes('at');
            abbrForce = abbrK || abbrM || abbrB || abbrT;

            // check for space before abbreviation
            if (format.includes(' a')) {
                abbr = ' ';
            }

            format = format.replace(new RegExp(abbr + 'a[kmbt]?'), '');

            if (abs >= trillion && !abbrForce || abbrT) {
                // trillion
                abbr += locales[options.currentLocale].abbreviations.trillion;
                value = value / trillion;
            } else if (abs < trillion && abs >= billion && !abbrForce || abbrB) {
                // billion
                abbr += locales[options.currentLocale].abbreviations.billion;
                value = value / billion;
            } else if (abs < billion && abs >= million && !abbrForce || abbrM) {
                // million
                abbr += locales[options.currentLocale].abbreviations.million;
                value = value / million;
            } else if (abs < million && abs >= thousand && !abbrForce || abbrK) {
                // thousand
                abbr += locales[options.currentLocale].abbreviations.thousand;
                value = value / thousand;
            }
        }


        if (format.includes('[.]')) {
            optDec = true;
            format = format.replace('[.]', '.');
        }

        w = value.toString().split('.')[0];
        precision = format.split('.')[1];
        thousands = format.indexOf(',');

        if (precision) {
            if (precision.includes('[')) {
                precision = precision.replace(']', '');
                precision = precision.split('[');
                d = toFixed(value, (precision[0].length + precision[1].length), roundingFunction, precision[1].length);
            } else {
                d = toFixed(value, precision.length, roundingFunction);
            }

            w = d.split('.')[0];

            if (d.includes('.')) {
                d = locales[options.currentLocale].delimiters.decimal + d.split('.')[1];
            } else {
                d = '';
            }

            if (optDec && Number(d.slice(1)) === 0) {
                d = '';
            }
        } else {
            w = toFixed(value, null, roundingFunction);
        }

        // format number
        if (w.includes('-')) {
            w = w.slice(1);
            neg = true;
        }

        if (thousands > -1) {
            w = w.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + locales[options.currentLocale].delimiters.thousands);
        }

        if (format.indexOf('.') === 0) {
            w = '';
        }

        return ((negP && neg) ? '(' : '') + ((!negP && neg) ? '-' : '') + ((!neg && signed) ? '+' : '') + w + d + ((abbr) ? abbr : '') + ((negP && neg) ? ')' : '');
    }


    /************************************
        Unformatting
    ************************************/

    // revert to number
    function unformatNumeral(n, string) {
        var stringOriginal = string,
            thousandRegExp,
            millionRegExp,
            billionRegExp,
            trillionRegExp,
            bytesMultiplier = false,
            power,
            value;

        if (string.includes(':')) {
            value = unformatTime(string);
        } else if (string.includes('e+') || string.includes('e-')) {
            value = unformatExponential(string);
        } else {
            if (string === options.zeroFormat || string === options.nullFormat) {
                value = 0;
            } else {
                if (locales[options.currentLocale].delimiters.decimal !== '.') {
                    string = string.replace(/\./g, '').replace(locales[options.currentLocale].delimiters.decimal, '.');
                }

                // see if abbreviations are there so that we can multiply to the correct number
                thousandRegExp = new RegExp('[^a-zA-Z]' + locales[options.currentLocale].abbreviations.thousand + '(?:\\)|(\\' + locales[options.currentLocale].currency.symbol + ')?(?:\\))?)?$');
                millionRegExp = new RegExp('[^a-zA-Z]' + locales[options.currentLocale].abbreviations.million + '(?:\\)|(\\' + locales[options.currentLocale].currency.symbol + ')?(?:\\))?)?$');
                billionRegExp = new RegExp('[^a-zA-Z]' + locales[options.currentLocale].abbreviations.billion + '(?:\\)|(\\' + locales[options.currentLocale].currency.symbol + ')?(?:\\))?)?$');
                trillionRegExp = new RegExp('[^a-zA-Z]' + locales[options.currentLocale].abbreviations.trillion + '(?:\\)|(\\' + locales[options.currentLocale].currency.symbol + ')?(?:\\))?)?$');

                // see if bytes are there so that we can multiply to the correct number
                for (power = 1; power <= config.bytes.decimal.suffixes.length; power++) {
                    bytesMultiplier = ((string.includes(config.bytes.decimal.suffixes[power])) || (string.includes(config.bytes.binary.suffixes[power])))? Math.pow(1024, power) : false;

                    if (bytesMultiplier) {
                        break;
                    }
                }

                // do some math to create our number
                value = bytesMultiplier ? bytesMultiplier : 1;
                value *= stringOriginal.match(thousandRegExp) ? Math.pow(10, 3) : 1;
                value *= stringOriginal.match(millionRegExp) ? Math.pow(10, 6) : 1;
                value *= stringOriginal.match(billionRegExp) ? Math.pow(10, 9) : 1;
                value *= stringOriginal.match(trillionRegExp) ? Math.pow(10, 12) : 1;
                // check for percentage
                value *= string.includes('%') ? 0.01 : 1;
                // check for negative number
                value *= (string.split('-').length + Math.min(string.split('(').length - 1, string.split(')').length - 1)) % 2 ? 1 : -1;
                // remove non numbers
                value *= Number(string.replace(/[^0-9\.]+/g, ''));
                // round if we are talking about bytes
                value = bytesMultiplier ? Math.ceil(value) : value;
            }
        }

        n._value = value;

        return n._value;
    }

    function unformatTime(string) {
        var timeArray = string.split(':'),
            seconds = 0;
        // turn hours and minutes into seconds and add them all up
        if (timeArray.length === 3) {
            // hours
            seconds = seconds + (Number(timeArray[0]) * 60 * 60);
            // minutes
            seconds = seconds + (Number(timeArray[1]) * 60);
            // seconds
            seconds = seconds + Number(timeArray[2]);
        } else if (timeArray.length === 2) {
            // minutes
            seconds = seconds + (Number(timeArray[0]) * 60);
            // seconds
            seconds = seconds + Number(timeArray[1]);
        }
        return Number(seconds);
    }

    function unformatExponential(string) {
        var parts = string.includes('e+') ? string.split('e+') : string.split('e-'),
            value = Number(parts[0]),
            power = Number(parts[1]);

        power = string.includes('e-') ? power *= -1 : power;

        function cback(accum, curr, currI, O) {
            var corrFactor = correctionFactor(accum, curr),
                num = (accum * corrFactor) * (curr * corrFactor) / (corrFactor * corrFactor);
            return num;
        }

        return [value, Math.pow(10, power)].reduce(cback, 1);
    }


    /************************************
        Top Level Functions
    ************************************/

    numeral = function(input) {
        if (numeral.isNumeral(input)) {
            input = input.value();
        } else if (input === 0 || typeof input === 'undefined') {
            input = 0;
        } else if (input === null || Number.isNaN(input)) {
            input = null;
        } else if (!Number(input)) {
            input = numeral.fn.unformat(input);
        } else {
            input = Number(input);
        }

        return new Numeral(input);
    };

    // version number
    numeral.version = VERSION;

    // compare numeral object
    numeral.isNumeral = function(obj) {
        return obj instanceof Numeral;
    };


    // This function will load locales and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    numeral.locale = function(key, values) {
        if (!key) {
            return options.currentLocale;
        }

        // standardize to lowercase
        key = key.toLowerCase();

        if (key && !values) {
            if (!locales[key]) {
                throw new Error('Unknown locale : ' + key);
            }

            options.currentLocale = key;
        }

        if (values || !locales[key]) {
            loadLocale(key, values);
        }

        return numeral;
    };

    numeral.reset = function() {
        for (var property in defaults) {
            options[property] = defaults[property];
        }
    };

    // This function provides access to the loaded locale data.  If
    // no arguments are passed in, it will simply return the current
    // global locale object.
    numeral.localeData = function(key) {
        if (!key) {
            return locales[options.currentLocale];
        }

        key = key.toLowerCase();

        if (!locales[key]) {
            throw new Error('Unknown locale : ' + key);
        }

        return locales[key];
    };

    numeral.locale('en', {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function(number) {
            var b = number % 10;
            return (~~(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
        },
        currency: {
            symbol: '$'
        }
    });

    numeral.zeroFormat = function(format) {
        options.zeroFormat = typeof(format) === 'string' ? format : null;
    };

    numeral.nullFormat = function (format) {
        options.nullFormat = typeof(format) === 'string' ? format : null;
    };

    numeral.defaultFormat = function(format) {
        options.defaultFormat = typeof(format) === 'string' ? format : '0.0';
    };

    numeral.validate = function(val, culture) {
        var _decimalSep,
            _thousandSep,
            _currSymbol,
            _valArray,
            _abbrObj,
            _thousandRegEx,
            localeData,
            temp;

        //coerce val to string
        if (typeof val !== 'string') {
            val += '';
            if (console.warn) {
                console.warn('Numeral.js: Value is not string. It has been co-erced to: ', val);
            }
        }

        //trim whitespaces from either sides
        val = val.trim();

        //if val is just digits return true
        if ( !! val.match(/^\d+$/)) {
            return true;
        }

        //if val is empty return false
        if (val === '') {
            return false;
        }

        //get the decimal and thousands separator from numeral.localeData
        try {
            //check if the culture is understood by numeral. if not, default it to current locale
            localeData = numeral.localeData(culture);
        } catch (e) {
            localeData = numeral.localeData(numeral.locale());
        }

        //setup the delimiters and currency symbol based on culture/locale
        _currSymbol = localeData.currency.symbol;
        _abbrObj = localeData.abbreviations;
        _decimalSep = localeData.delimiters.decimal;
        if (localeData.delimiters.thousands === '.') {
            _thousandSep = '\\.';
        } else {
            _thousandSep = localeData.delimiters.thousands;
        }

        // validating currency symbol
        temp = val.match(/^[^\d]+/);
        if (temp !== null) {
            val = val.substr(1);
            if (temp[0] !== _currSymbol) {
                return false;
            }
        }

        //validating abbreviation symbol
        temp = val.match(/[^\d]+$/);
        if (temp !== null) {
            val = val.slice(0, -1);
            if (temp[0] !== _abbrObj.thousand && temp[0] !== _abbrObj.million && temp[0] !== _abbrObj.billion && temp[0] !== _abbrObj.trillion) {
                return false;
            }
        }

        _thousandRegEx = new RegExp(_thousandSep + '{2}');

        if (!val.match(/[^\d.,]/g)) {
            _valArray = val.split(_decimalSep);
            if (_valArray.length > 2) {
                return false;
            } else {
                if (_valArray.length < 2) {
                    return ( !! _valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx));
                } else {
                    if (_valArray[0].length === 1) {
                        return ( !! _valArray[0].match(/^\d+$/) && !_valArray[0].match(_thousandRegEx) && !! _valArray[1].match(/^\d+$/));
                    } else {
                        return ( !! _valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx) && !! _valArray[1].match(/^\d+$/));
                    }
                }
            }
        }

        return false;
    };

    /************************************
        Helpers
    ************************************/

    function loadLocale(key, values) {
        locales[key] = values;
    }

    // isNaN polyfill
    Number.isNaN = Number.isNaN || function(value) {
        return typeof value === 'number' && isNaN(value);
    };

    // String includes polyfill
    String.prototype.includes = String.prototype.includes || function(search, start) {
        return this.indexOf(search, start) !== -1;
    };

    // Production steps of ECMA-262, Edition 5, 15.4.4.21
    // Reference: http://es5.github.io/#x15.4.4.21
    if (!Array.prototype.reduce) {
        Array.prototype.reduce = function(callback /*, initialValue*/) {
            'use strict';
            if (this === null) {
                throw new TypeError('Array.prototype.reduce called on null or undefined');
            }

            if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
            }

            var t = Object(this), len = t.length >>> 0, k = 0, value;

            if (arguments.length === 2) {
                value = arguments[1];
            } else {
                while (k < len && !(k in t)) {
                    k++;
                }

                if (k >= len) {
                    throw new TypeError('Reduce of empty array with no initial value');
                }

                value = t[k++];
            }
            for (; k < len; k++) {
                if (k in t) {
                    value = callback(value, t[k], k, t);
                }
            }
            return value;
        };
    }

    /**
     * Computes the multiplier necessary to make x >= 1,
     * effectively eliminating miscalculations caused by
     * finite precision.
     */
    function multiplier(x) {
        var parts = x.toString().split('.');
        if (parts.length < 2) {
            return 1;
        }
        return Math.pow(10, parts[1].length);
    }

    /**
     * Given a variable number of arguments, returns the maximum
     * multiplier that must be used to normalize an operation involving
     * all of them.
     */
    function correctionFactor() {
        var args = Array.prototype.slice.call(arguments);
        return args.reduce(function(accum, next) {
            var mn = multiplier(next);
            return accum > mn ? accum : mn;
        }, 1);
    }


    /************************************
        Numeral Prototype
    ************************************/


    numeral.fn = Numeral.prototype = {

        clone: function() {
            return numeral(this);
        },

        format: function (inputString, roundingFunction) {
            return formatNumeral(this,
                inputString ? inputString : options.defaultFormat,
                roundingFunction !== undefined ? roundingFunction : Math.round
            );
        },

        unformat: function (inputString) {
            if (Object.prototype.toString.call(inputString) === '[object Number]') {
                return inputString;
            }

            return unformatNumeral(this, inputString ? inputString : options.defaultFormat);
        },

        value: function() {
            return this._value;
        },

        valueOf: function() {
            return this._value;
        },

        set: function(value) {
            this._value = Number(value);
            return this;
        },

        add: function(value) {
            var corrFactor = correctionFactor.call(null, this._value, value);

            function cback(accum, curr, currI, O) {
                return accum + Math.round(corrFactor * curr);
            }
            this._value = [this._value, value].reduce(cback, 0) / corrFactor;
            return this;
        },

        subtract: function(value) {
            var corrFactor = correctionFactor.call(null, this._value, value);

            function cback(accum, curr, currI, O) {
                return accum - Math.round(corrFactor * curr);
            }
            this._value = [value].reduce(cback, Math.round(this._value * corrFactor)) / corrFactor;
            return this;
        },

        multiply: function(value) {
            function cback(accum, curr, currI, O) {
                var corrFactor = correctionFactor(accum, curr);
                return Math.round(accum * corrFactor) * Math.round(curr * corrFactor) / Math.round(corrFactor * corrFactor);
            }
            this._value = [this._value, value].reduce(cback, 1);
            return this;
        },

        divide: function(value) {
            function cback(accum, curr, currI, O) {
                var corrFactor = correctionFactor(accum, curr);
                return Math.round(accum * corrFactor) / Math.round(curr * corrFactor);
            }
            this._value = [this._value, value].reduce(cback);
            return this;
        },

        difference: function(value) {
            return Math.abs(numeral(this._value).subtract(value).value());
        }

    };

    /************************************
        Exposing Numeral
    ************************************/

    // CommonJS module is defined
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = numeral;
    }

    /*global ender:false */
    if (typeof ender === 'undefined') {
        // here, `this` means `window` in the browser, or `global` on the server
        // add `numeral` as a global object via a string identifier,
        // for Closure Compiler 'advanced' mode
        this['numeral'] = numeral;
    }

    /*global define:false */
    if (typeof define === 'function' && define.amd) {
        define([], function() {
            return numeral;
        });
    }
}).call(this);
