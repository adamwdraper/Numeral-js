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

        // strip format of spaces and $
        format = format.replace(/\s?\$\s?/, '');

        // format the number
        output = formatNumber(value, format, roundingFunction);

        // position the symbol
        if (symbolIndex <= 1) {
            if (output.includes('(') || output.includes('-')) {
                output = output.split('');

                spliceIndex = symbolIndex < openParenIndex || symbolIndex < minusSignIndex ? 0 : 1;

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

        return hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
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
            int,
            precision,
            thousands,
            decimal = '',
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

        int = value.toString().split('.')[0];
        precision = format.split('.')[1];
        thousands = format.indexOf(',');

        if (precision) {
            if (precision.includes('[')) {
                precision = precision.replace(']', '');
                precision = precision.split('[');
                decimal = toFixed(value, (precision[0].length + precision[1].length), roundingFunction, precision[1].length);
            } else {
                decimal = toFixed(value, precision.length, roundingFunction);
            }

            int = decimal.split('.')[0];

            if (decimal.includes('.')) {
                decimal = locales[options.currentLocale].delimiters.decimal + decimal.split('.')[1];
            } else {
                decimal = '';
            }

            if (optDec && Number(decimal.slice(1)) === 0) {
                decimal = '';
            }
        } else {
            int = toFixed(value, null, roundingFunction);
        }

        // format number
        if (int.includes('-')) {
            int = int.slice(1);
            neg = true;
        }

        if (thousands > -1) {
            int = int.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + locales[options.currentLocale].delimiters.thousands);
        }

        if (format.indexOf('.') === 0) {
            int = '';
        }

        return (negP && neg ? '(' : '') + (!negP && neg ? '-' : '') + (!neg && signed ? '+' : '') + int + decimal + (abbr ? abbr : '') + (negP && neg ? ')' : '');
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

    numeral.reset = function() {
        for (var property in defaults) {
            options[property] = defaults[property];
        }
    };

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
        if (!!val.match(/^\d+$/)) {
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

        return parts.length < 2 ? 1 : Math.pow(10, parts[1].length);
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

/*! @preserve 
 * numeral.js locale configuration
 * locale : belgium-dutch (be-nl)
 * author : Dieter Luypaert : https://github.com/moeriki
 */
(function () {
    var locale = {
        delimiters: {
            thousands: ' ',
            decimal  : ','
        },
        abbreviations: {
            thousand : 'k',
            million  : ' mln',
            billion  : ' mld',
            trillion : ' bln'
        },
        ordinal : function (number) {
            var remainder = number % 100;
            return (number !== 0 && remainder <= 1 || remainder === 8 || remainder >= 20) ? 'ste' : 'de';
        },
        currency: {
            symbol: '€ '
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('be-nl', locale);
    }
}());

/*! @preserve
 * numeral.js locale configuration
 * locale : Bulgarian
 * author : Don Vince : https://github.com/donvince/
 */
(function () {
    var locale = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: { // I found these here http://www.unicode.org/cldr/charts/28/verify/numbers/bg.html
            thousand: 'хил',
            million: 'млн',
            billion: 'млрд',
            trillion: 'трлн'
        },
        ordinal: function (number) {
            // google translate suggests:
            // 1st=1-ви; 2nd=2-ри; 7th=7-ми;
            // 8th=8-ми and many others end with -ти
            // for example 3rd=3-ти
            // However since I've seen suggestions that in
            // Bulgarian the ordinal can be taken in
            // different forms (masculine, feminine, neuter)
            // I've opted to wimp out on commiting that to code
            return '';
        },
        currency: {
            symbol: 'лв'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('bg', locale);
    }
}());

/*! @preserve 
 * numeral.js locale configuration
 * locale : simplified chinese
 * author : badplum : https://github.com/badplum
 */
(function () {
    var locale = {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: '千',
            million: '百万',
            billion: '十亿',
            trillion: '兆'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: '¥'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('chs', locale);
    }
}());

/*! @preserve
 * numeral.js locale configuration
 * locale : czech (cs)
 * author : Anatoli Papirovski : https://github.com/apapirovski
 */
(function () {
    var locale = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'tis.',
            million: 'mil.',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function () {
            return '.';
        },
        currency: {
            symbol: 'Kč'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('cs', locale);
    }
}());

/*! @preserve 
 * numeral.js locale configuration
 * locale : danish denmark (dk)
 * author : Michael Storgaard : https://github.com/mstorgaard
 */
(function () {
    var locale = {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'mio',
            billion: 'mia',
            trillion: 'b'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: 'DKK'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('da-dk', locale);
    }
}());
/*! @preserve 
 * numeral.js locale configuration
 * locale : German in Switzerland (de-ch)
 * author : Michael Piefel : https://github.com/piefel (based on work from Marco Krage : https://github.com/sinky)
 */ 
(function () {
    var locale = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: 'CHF'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('de-ch', locale);
    }
}());
/*! @preserve 
 * numeral.js locale configuration
 * locale : German (de) – generally useful in Germany, Austria, Luxembourg, Belgium
 * author : Marco Krage : https://github.com/sinky
 */
(function () {
    var locale = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: '€'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('de', locale);
    }
}());
/*! @preserve 
 * numeral.js locale configuration
 * locale : English Australia
 * author : Don Vince : https://github.com/donvince/
 */
(function () {
    var locale = {
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
        ordinal: function (number) {
            var b = number % 10;
            return (~~ (number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
        },
        currency: {
            symbol: '$'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('en-au', locale);
    }
}());

/*! @preserve 
 * numeral.js locale configuration
 * locale : english united kingdom (uk)
 * author : Dan Ristic : https://github.com/dristic
 */
(function () {
    var locale = {
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
        ordinal: function (number) {
            var b = number % 10;
            return (~~ (number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
        },
        currency: {
            symbol: '£'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('en-gb', locale);
    }
}());
/*!
 * numeral.js locale configuration
 * locale : english south africa (uk)
 * author : Etienne Boshoff : etienne@zailab.com
 */
(function () {
    var locale = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number) {
            var b = number % 10;
            return (~~ (number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                    (b === 2) ? 'nd' :
                        (b === 3) ? 'rd' : 'th';
        },
        currency: {
            symbol: 'R'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('en-za', locale);
    }
}());
/*! @preserve
 * numeral.js locale configuration
 * locale : spanish Spain
 * author : Hernan Garcia : https://github.com/hgarcia
 */
(function () {
    var locale = {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'mm',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number) {
            var b = number % 10;
            return (b === 1 || b === 3) ? 'er' :
                (b === 2) ? 'do' :
                    (b === 7 || b === 0) ? 'mo' :
                        (b === 8) ? 'vo' :
                            (b === 9) ? 'no' : 'to';
        },
        currency: {
            symbol: '€'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('es-es', locale);
    }
}());

/*! @preserve 
 * numeral.js locale configuration
 * locale : spanish
 * author : Hernan Garcia : https://github.com/hgarcia
 */
(function () {
    var locale = {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'mm',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number) {
            var b = number % 10;
            return (b === 1 || b === 3) ? 'er' :
                (b === 2) ? 'do' :
                (b === 7 || b === 0) ? 'mo' : 
		(b === 8) ? 'vo' :
		(b === 9) ? 'no' : 'to';
        },
        currency: {
            symbol: '$'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('es', locale);
    }
}());

/*! @preserve 
 * numeral.js locale configuration
 * locale : Estonian
 * author : Illimar Tambek : https://github.com/ragulka
 *
 * Note: in Estonian, abbreviations are always separated
 * from numbers with a space
 */
(function () {
    var locale = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: ' tuh',
            million: ' mln',
            billion: ' mld',
            trillion: ' trl'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: '€'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('et', locale);
    }
}());

/*! @preserve 
 * numeral.js locale configuration
 * locale : Finnish
 * author : Sami Saada : https://github.com/samitheberber
 */
(function () {
    var locale = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'M',
            billion: 'G',
            trillion: 'T'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: '€'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('fi', locale);
    }
}());

/*! @preserve
 * numeral.js locale configuration
 * locale : french (Canada) (fr-ca)
 * author : Léo Renaud-Allaire : https://github.com/renaudleo
 */
(function () {
    var locale = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'M',
            billion: 'G',
            trillion: 'T'
        },
        ordinal : function (number) {
            return number === 1 ? 'er' : 'e';
        },
        currency: {
            symbol: '$'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('fr-ca', locale);
    }
}());
/*! @preserve 
 * numeral.js locale configuration
 * locale : french (fr-ch)
 * author : Adam Draper : https://github.com/adamwdraper
 */
(function () {
    var locale = {
        delimiters: {
            thousands: '\'',
            decimal: '.'
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal : function (number) {
            return number === 1 ? 'er' : 'e';
        },
        currency: {
            symbol: 'CHF'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('fr-ch', locale);
    }
}());

/*! @preserve 
 * numeral.js locale configuration
 * locale : french (fr)
 * author : Adam Draper : https://github.com/adamwdraper
 */
(function () {
    var locale = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal : function (number) {
            return number === 1 ? 'er' : 'e';
        },
        currency: {
            symbol: '€'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('fr', locale);
    }
}());
/*! @preserve
 * numeral.js locale configuration
 * locale : Hungarian (hu)
 * author : Peter Bakondy : https://github.com/pbakondy
 */
(function () {
    var locale = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'E',  // ezer
            million: 'M',   // millió
            billion: 'Mrd', // milliárd
            trillion: 'T'   // trillió
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: ' Ft'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('hu', locale);
    }
}());
/*! @preserve 
 * numeral.js locale configuration
 * locale : italian Italy (it)
 * author : Giacomo Trombi : http://cinquepunti.it
 */
(function () {
    var locale = {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'mila',
            million: 'mil',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number) {
            return 'º';
        },
        currency: {
            symbol: '€'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('it', locale);
    }
}());
/*! @preserve
 * numeral.js locale configuration
 * locale : japanese
 * author : teppeis : https://github.com/teppeis
 */
(function () {
    var locale = {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: '千',
            million: '百万',
            billion: '十億',
            trillion: '兆'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: '¥'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('ja', locale);
    }
}());

/*! @preserve
 * numeral.js locale configuration
 * locale : Latvian (lv)
 * author : Lauris Bukšis-Haberkorns : https://github.com/Lafriks
 */
(function () {
    var locale = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: ' tūkst.',
            million: ' milj.',
            billion: ' mljrd.',
            trillion: ' trilj.'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: '€'
        }
    };
    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('lv', locale);
    }
}());

/*! @preserve 
 * numeral.js locale configuration
 * locale : netherlands-dutch (nl-nl)
 * author : Dave Clayton : https://github.com/davedx
 */
(function () {
    var locale = {
        delimiters: {
            thousands: '.',
            decimal  : ','
        },
        abbreviations: {
            thousand : 'k',
            million  : 'mln',
            billion  : 'mrd',
            trillion : 'bln'
        },
        ordinal : function (number) {
            var remainder = number % 100;
            return (number !== 0 && remainder <= 1 || remainder === 8 || remainder >= 20) ? 'ste' : 'de';
        },
        currency: {
            symbol: '€ '
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('nl-nl', locale);
    }
}());
/*! 
 * numeral.js locale configuration
 * locale : norwegian (bokmål)
 * author : Ove Andersen : https://github.com/azzlack
 */
(function () {
    var locale = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: 'kr'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('nb-no', locale);
        this.numeral.locale('nn-no', locale);
        this.numeral.locale('no', locale);
        this.numeral.locale('nb', locale);
        this.numeral.locale('nn', locale);
    }
}());
/*! @preserve 
 * numeral.js locale configuration
 * locale : polish (pl)
 * author : Dominik Bulaj : https://github.com/dominikbulaj
 */
(function () {
    var locale = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'tys.',
            million: 'mln',
            billion: 'mld',
            trillion: 'bln'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: 'PLN'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('pl', locale);
    }
}());
/*! @preserve 
 * numeral.js locale configuration
 * locale : portuguese brazil (pt-br)
 * author : Ramiro Varandas Jr : https://github.com/ramirovjr
 */
(function () {
    var locale = {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'mil',
            million: 'milhões',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number) {
            return 'º';
        },
        currency: {
            symbol: 'R$'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('pt-br', locale);
    }
}());
/*! @preserve 
 * numeral.js locale configuration
 * locale : portuguese (pt-pt)
 * author : Diogo Resende : https://github.com/dresende
 */
(function () {
    var locale = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal : function (number) {
            return 'º';
        },
        currency: {
            symbol: '€'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('pt-pt', locale);
    }
}());

// numeral.js locale configuration
// locale : Russian for the Ukraine (ru-ua)
// author : Anatoli Papirovski : https://github.com/apapirovski
(function () {
    var locale = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'тыс.',
            million: 'млн',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function () {
            // not ideal, but since in Russian it can taken on 
            // different forms (masculine, feminine, neuter)
            // this is all we can do
            return '.'; 
        },
        currency: {
            symbol: '\u20B4'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('ru-ua', locale);
    }
}());

/*! @preserve
 * numeral.js locale configuration
 * locale : russian (ru)
 * author : Anatoli Papirovski : https://github.com/apapirovski
 */
(function () {
    var locale = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'тыс.',
            million: 'млн.',
            billion: 'млрд.',
            trillion: 'трлн.'
        },
        ordinal: function () {
            // not ideal, but since in Russian it can taken on
            // different forms (masculine, feminine, neuter)
            // this is all we can do
            return '.';
        },
        currency: {
            symbol: 'руб.'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('ru', locale);
    }
}());

/*! @preserve
 * numeral.js locale configuration
 * locale : slovak (sk)
 * author : Ahmed Al Hafoudh : http://www.freevision.sk
 */
(function () {
    var locale = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'tis.',
            million: 'mil.',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function () {
            return '.';
        },
        currency: {
            symbol: '€'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('sk', locale);
    }
}());

/*! @preserve 
 * numeral.js locale configuration
 * locale : thai (th)
 * author : Sathit Jittanupat : https://github.com/jojosati
 */
(function () {
    var locale = {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: 'พัน',
            million: 'ล้าน',
            billion: 'พันล้าน',
            trillion: 'ล้านล้าน'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: '฿'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('th', locale);
    }
}());

/*! @preserve 
 * numeral.js locale configuration
 * locale : turkish (tr)
 * author : Ecmel Ercan : https://github.com/ecmel, Erhan Gundogan : https://github.com/erhangundogan, Burak Yiğit Kaya: https://github.com/BYK
 */
(function () {
    var suffixes = {
            1: '\'inci',
            5: '\'inci',
            8: '\'inci',
            70: '\'inci',
            80: '\'inci',

            2: '\'nci',
            7: '\'nci',
            20: '\'nci',
            50: '\'nci',

            3: '\'üncü',
            4: '\'üncü',
            100: '\'üncü',

            6: '\'ncı',

            9: '\'uncu',
            10: '\'uncu',
            30: '\'uncu',

            60: '\'ıncı',
            90: '\'ıncı'
        },
        locale = {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'bin',
                million: 'milyon',
                billion: 'milyar',
                trillion: 'trilyon'
            },
            ordinal: function (number) {
                if (number === 0) {  // special case for zero
                    return '\'ıncı';
                }

                var a = number % 10,
                    b = number % 100 - a,
                    c = number >= 100 ? 100 : null;

              return suffixes[a] || suffixes[b] || suffixes[c];
            },
            currency: {
                symbol: '\u20BA'
            }
        };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('tr', locale);
    }
}());

// numeral.js locale configuration
// locale : Ukrainian for the Ukraine (uk-ua)
// author : Michael Piefel : https://github.com/piefel (with help from Tetyana Kuzmenko)
(function () {
    var locale = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'тис.',
            million: 'млн',
            billion: 'млрд',
            trillion: 'блн'
        },
        ordinal: function () {
            // not ideal, but since in Ukrainian it can taken on 
            // different forms (masculine, feminine, neuter)
            // this is all we can do
            return ''; 
        },
        currency: {
            symbol: '\u20B4'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('uk-ua', locale);
    }
}());
