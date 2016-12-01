/*! @preserve
 * numeral.js
 * version : Edge
 * author : Adam Draper
 * license : MIT
 * http://adamwdraper.github.com/Numeral-js/
 */

(function() {

    /************************************
        Variables
    ************************************/

    var numeral,
        _ = {},
        VERSION = 'Edge',
        // internal storage for locale config files
        formats = {},
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
    function Numeral(input, number) {
        this._input = input;

        this._value = number;
    }


    /************************************
        Formatting
    ************************************/

    formats.currency = {
        regexp: /(\$)/,
        format: function(value, format, roundingFunction) {
            var symbolIndex = format.indexOf('$'),
                openParenIndex = format.indexOf('('),
                minusSignIndex = format.indexOf('-'),
                space = _.includes(format, ' $') || _.includes(format, '$ ') ? ' ' : '',
                spliceIndex,
                output;

            // strip format of spaces and $
            format = format.replace(/\s?\$\s?/, '');

            // format the number
            output = formats.number(value, format, roundingFunction);

            // position the symbol
            if (symbolIndex <= 1) {
                if (_.includes(output, '(') || _.includes(output, '-')) {
                    output = output.split('');

                    spliceIndex = symbolIndex < openParenIndex || symbolIndex < minusSignIndex ? 0 : 1;

                    output.splice(spliceIndex, 0, locales[options.currentLocale].currency.symbol + space);

                    output = output.join('');
                } else {
                    output = locales[options.currentLocale].currency.symbol + space + output;
                }
            } else {
                if (_.includes(output, ')')) {
                    output = output.split('');

                    output.splice(-1, 0, space + locales[options.currentLocale].currency.symbol);

                    output = output.join('');
                } else {
                    output = output + space + locales[options.currentLocale].currency.symbol;
                }
            }

            return output;
        }
    };


    // function formatPercentage(value, format, roundingFunction) {
    //     var space = _.includes(format, ' %') ? ' ' : '',
    //         output;
    //
    //     value = value * 100;
    //
    //     // check for space before %
    //     format = format.replace(/\s?\%/, '');
    //
    //     output = formatNumber(value, format, roundingFunction);
    //
    //     if (_.includes(output, ')')) {
    //         output = output.split('');
    //
    //         output.splice(-1, 0, space + '%');
    //
    //         output = output.join('');
    //     } else {
    //         output = output + space + '%';
    //     }
    //
    //     return output;
    // }
    //
    // function formatBytes(value, format, roundingFunction) {
    //     var output,
    //         bytes = _.includes(format, 'ib') ? config.bytes.binary : config.bytes.decimal,
    //         suffix = _.includes(format, ' b') || _.includes(format, ' ib') ? ' ' : '',
    //         power,
    //         min,
    //         max;
    //
    //     // check for space before
    //     format = format.replace(/\s?i?b/, '');
    //
    //     for (power = 0; power <= bytes.suffixes.length; power++) {
    //         min = Math.pow(bytes.base, power);
    //         max = Math.pow(bytes.base, power + 1);
    //
    //         if (value === null || value === 0 || value >= min && value < max) {
    //             suffix += bytes.suffixes[power];
    //
    //             if (min > 0) {
    //                 value = value / min;
    //             }
    //
    //             break;
    //         }
    //     }
    //
    //     output = formatNumber(value, format, roundingFunction);
    //
    //     return output + suffix;
    // }
    //
    // function formatOrdinal(value, format, roundingFunction) {
    //     var output,
    //         ordinal = _.includes(format, ' o') ? ' ' : '';
    //
    //     // check for space before
    //     format = format.replace(/\s?o/, '');
    //
    //     ordinal += locales[options.currentLocale].ordinal(value);
    //
    //     output = formatNumber(value, format, roundingFunction);
    //
    //     return output + ordinal;
    // }
    //
    // function formatExponential(value, format, roundingFunction) {
    //     var output,
    //         exponential = typeof value === 'number' && !_.isNaN(value) ? value.toExponential() : '0e+0',
    //         parts = exponential.split('e');
    //
    //     format = format.replace(/e[\+|\-]{1}0/, '');
    //
    //     output = formatNumber(Number(parts[0]), format, roundingFunction);
    //
    //     return output + 'e' + parts[1];
    // }
    //
    // function formatTime(value) {
    //     var hours = Math.floor(value / 60 / 60),
    //         minutes = Math.floor((value - (hours * 60 * 60)) / 60),
    //         seconds = Math.round(value - (hours * 60 * 60) - (minutes * 60));
    //
    //     return hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
    // }

    formats.number = {
        regexp: null,
        format: function(value, format, roundingFunction) {
            var negP = false,
                signed = false,
                optDec = false,
                abbr = '',
                trillion = 1000000000000,
                billion = 1000000000,
                million = 1000000,
                thousand = 1000,
                abbrForce, // force abbreviation
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
            if (_.includes(format, '(')) {
                negP = true;
                format = format.slice(1, -1);
            } else if (_.includes(format, '+')) {
                signed = true;
                format = format.replace(/\+/g, '');
            }

            // see if abbreviation is wanted
            if (_.includes(format, 'a')) {
                abbrForce = format.match(/a(k|m|b|t)?/);

                abbrForce = abbrForce ? abbrForce[1] : false;

                // check for space before abbreviation
                if (_.includes(format, ' a')) {
                    abbr = ' ';
                }

                format = format.replace(new RegExp(abbr + 'a[kmbt]?'), '');

                if (abs >= trillion && !abbrForce || abbrForce === 't') {
                    // trillion
                    abbr += locales[options.currentLocale].abbreviations.trillion;
                    value = value / trillion;
                } else if (abs < trillion && abs >= billion && !abbrForce || abbrForce === 'b') {
                    // billion
                    abbr += locales[options.currentLocale].abbreviations.billion;
                    value = value / billion;
                } else if (abs < billion && abs >= million && !abbrForce || abbrForce === 'm') {
                    // million
                    abbr += locales[options.currentLocale].abbreviations.million;
                    value = value / million;
                } else if (abs < million && abs >= thousand && !abbrForce || abbrForce === 'k') {
                    // thousand
                    abbr += locales[options.currentLocale].abbreviations.thousand;
                    value = value / thousand;
                }
            }


            if (_.includes(format, '[.]')) {
                optDec = true;
                format = format.replace('[.]', '.');
            }

            int = value.toString().split('.')[0];
            precision = format.split('.')[1];
            thousands = format.indexOf(',');

            if (precision) {
                if (_.includes(precision, '[')) {
                    precision = precision.replace(']', '');
                    precision = precision.split('[');
                    decimal = _.toFixed(value, (precision[0].length + precision[1].length), roundingFunction, precision[1].length);
                } else {
                    decimal = _.toFixed(value, precision.length, roundingFunction);
                }

                int = decimal.split('.')[0];

                if (_.includes(decimal, '.')) {
                    decimal = locales[options.currentLocale].delimiters.decimal + decimal.split('.')[1];
                } else {
                    decimal = '';
                }

                if (optDec && Number(decimal.slice(1)) === 0) {
                    decimal = '';
                }
            } else {
                int = _.toFixed(value, null, roundingFunction);
            }

            // format number
            if (_.includes(int, '-')) {
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
    };


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

        if (_.includes(string, ':')) {
            value = unformatTime(string);
        } else if (_.includes(string, 'e+') || _.includes(string, 'e-')) {
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
                    bytesMultiplier = ((_.includes(string, config.bytes.decimal.suffixes[power])) || (_.includes(string, config.bytes.binary.suffixes[power])))? Math.pow(1024, power) : false;

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
                value *= _.includes(string, '%') ? 0.01 : 1;
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
        var parts = _.includes(string, 'e+') ? string.split('e+') : string.split('e-'),
            value = Number(parts[0]),
            power = Number(parts[1]);

        power = _.includes(string, 'e-') ? power *= -1 : power;

        function cback(accum, curr, currI, O) {
            var corrFactor = _.correctionFactor(accum, curr),
                num = (accum * corrFactor) * (curr * corrFactor) / (corrFactor * corrFactor);
            return num;
        }

        return [value, Math.pow(10, power)].reduce(cback, 1);
    }

    /************************************
        Top Level Functions
    ************************************/

    numeral = function(input) {
        var value;

        if (numeral.isNumeral(input)) {
            value = input.value();
        } else if (input === 0 || typeof input === 'undefined') {
            value = 0;
        } else if (input === null || _.isNaN(input)) {
            value = null;
        } else {
            value = Number(input)|| null;
        }

        return new Numeral(input, value);
    };

    // version number
    numeral.version = VERSION;

    // compare numeral object
    numeral.isNumeral = function(obj) {
        return obj instanceof Numeral;
    };

    // helper functions
    numeral._ = _ = {
        loadLocale: function (key, values) {
            locales[key] = values;
        },
        isNaN: function(value) {
            return typeof value === 'number' && isNaN(value);
        },
        includes: function(string, search) {
            return string.indexOf(search) !== -1;
        },
        reduce: function (array, callback) {
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
        },
        /**
         * Computes the multiplier necessary to make x >= 1,
         * effectively eliminating miscalculations caused by
         * finite precision.
         */
        multiplier: function (x) {
            var parts = x.toString().split('.');

            return parts.length < 2 ? 1 : Math.pow(10, parts[1].length);
        },
        /**
         * Given a variable number of arguments, returns the maximum
         * multiplier that must be used to normalize an operation involving
         * all of them.
         */
        correctionFactor: function () {
            var args = Array.prototype.slice.call(arguments);

            return args.reduce(function(accum, next) {
                var mn = _.multiplier(next);
                return accum > mn ? accum : mn;
            }, 1);
        },
        /**
         * Implementation of toFixed() that treats floats more like decimals
         *
         * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
         * problems for accounting- and finance-related software.
         */
        toFixed: function(value, maxDecimals, roundingFunction, optionals) {
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
            _.loadLocale(key, values);
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


    /************************************
        Numeral Prototype
    ************************************/

    numeral.fn = Numeral.prototype = {
        clone: function() {
            return numeral(this);
        },
        format: function(inputString, roundingFunction) {
            var value = this._value,
                format = inputString || options.defaultFormat,
                kind,
                output,
                formatFunction = formats.number.format;

            // make sure we have a roundingFunction
            roundingFunction = roundingFunction || Math.round;

            // format based on value
            if (value === 0 && options.zeroFormat !== null) {
                output = options.zeroFormat;
            } else if (value === null && options.nullFormat !== null) {
                output = options.nullFormat;
            } else {
                for (kind in formats) {
                    if (kind.regexp && format.match(kind.regexp)) {
                        formatFunction = kind.format;

                        break;
                    }
                }

                output = formatFunction(value, format, roundingFunction);
            }

            return output;
        },
        value: function() {
            return this._value;
        },
        set: function(value) {
            this._value = Number(value);

            return this;
        },
        register: function(type, name, format) {
            this[type][name] = format;
        }
    };



    /************************************
        Default Locale
    ************************************/

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
