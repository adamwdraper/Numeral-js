/*!
 * numeral.js
 * version : 1.5.3
 * author : Adam Draper
 * license : MIT
 * http://adamwdraper.github.com/Numeral-js/
 */

/************************************
    Constants
************************************/

var numeral,
    VERSION = '1.5.3',
    // internal storage for locale config files
    locales = {},
    currentLocale = 'en',
    zeroFormat = null,
    defaultFormat = '0,0',
    // check for nodeJS
    hasModule = (typeof module !== 'undefined' && module.exports);


/************************************
    Constructors
************************************/


// Numeral prototype object
function Numeral (number) {
    this._value = number;
}

/**
 * Implementation of toFixed() that treats floats more like decimals
 *
 * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
 * problems for accounting- and finance-related software.
 */
function toFixed (value, precision, roundingFunction, optionals) {
    var power = Math.pow(10, precision),
        optionalsRegExp,
        output;

    //roundingFunction = (roundingFunction !== undefined ? roundingFunction : Math.round);
    // Multiply up by precision, round accurately, then divide and use native toFixed():
    output = (roundingFunction(value * power) / power).toFixed(precision);

    if (optionals) {
        optionalsRegExp = new RegExp('0{1,' + optionals + '}$');
        output = output.replace(optionalsRegExp, '');
    }

    return output;
}

/************************************
    Formatting
************************************/

// determine what type of formatting we need to do
function formatNumeral (n, format, roundingFunction) {
    var output;

    // figure out what kind of format we are dealing with
    if (format.indexOf('$') > -1) { // currency!!!!!
        output = formatCurrency(n, format, roundingFunction);
    } else if (format.indexOf('%') > -1) { // percentage
        output = formatPercentage(n, format, roundingFunction);
    } else if (format.indexOf(':') > -1) { // time
        output = formatTime(n, format);
    } else { // plain ol' numbers or bytes
        output = formatNumber(n._value, format, roundingFunction);
    }

    // return string
    return output;
}

// revert to number
function unformatNumeral (n, string) {
    var stringOriginal = string,
        thousandRegExp,
        millionRegExp,
        billionRegExp,
        trillionRegExp,
        suffixes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        bytesMultiplier = false,
        power;

    if (string.indexOf(':') > -1) {
        n._value = unformatTime(string);
    } else {
        if (string === zeroFormat) {
            n._value = 0;
        } else {
            if (locales[currentLocale].delimiters.decimal !== '.') {
                string = string.replace(/\./g,'').replace(locales[currentLocale].delimiters.decimal, '.');
            }

            // see if abbreviations are there so that we can multiply to the correct number
            thousandRegExp = new RegExp('[^a-zA-Z]' + locales[currentLocale].abbreviations.thousand + '(?:\\)|(\\' + locales[currentLocale].currency.symbol + ')?(?:\\))?)?$');
            millionRegExp = new RegExp('[^a-zA-Z]' + locales[currentLocale].abbreviations.million + '(?:\\)|(\\' + locales[currentLocale].currency.symbol + ')?(?:\\))?)?$');
            billionRegExp = new RegExp('[^a-zA-Z]' + locales[currentLocale].abbreviations.billion + '(?:\\)|(\\' + locales[currentLocale].currency.symbol + ')?(?:\\))?)?$');
            trillionRegExp = new RegExp('[^a-zA-Z]' + locales[currentLocale].abbreviations.trillion + '(?:\\)|(\\' + locales[currentLocale].currency.symbol + ')?(?:\\))?)?$');

            // see if bytes are there so that we can multiply to the correct number
            for (power = 0; power <= suffixes.length; power++) {
                bytesMultiplier = (string.indexOf(suffixes[power]) > -1) ? Math.pow(1024, power + 1) : false;

                if (bytesMultiplier) {
                    break;
                }
            }

            // do some math to create our number
            n._value = ((bytesMultiplier) ? bytesMultiplier : 1) * ((stringOriginal.match(thousandRegExp)) ? Math.pow(10, 3) : 1) * ((stringOriginal.match(millionRegExp)) ? Math.pow(10, 6) : 1) * ((stringOriginal.match(billionRegExp)) ? Math.pow(10, 9) : 1) * ((stringOriginal.match(trillionRegExp)) ? Math.pow(10, 12) : 1) * ((string.indexOf('%') > -1) ? 0.01 : 1) * (((string.split('-').length + Math.min(string.split('(').length-1, string.split(')').length-1)) % 2)? 1: -1) * Number(string.replace(/[^0-9\.]+/g, ''));

            // round if we are talking about bytes
            n._value = (bytesMultiplier) ? Math.ceil(n._value) : n._value;
        }
    }
    return n._value;
}

function formatCurrency (n, format, roundingFunction) {
    var symbolIndex = format.indexOf('$'),
        openParenIndex = format.indexOf('('),
        minusSignIndex = format.indexOf('-'),
        space = '',
        spliceIndex,
        output;

    // check for space before or after currency
    if (format.indexOf(' $') > -1) {
        space = ' ';
        format = format.replace(' $', '');
    } else if (format.indexOf('$ ') > -1) {
        space = ' ';
        format = format.replace('$ ', '');
    } else {
        format = format.replace('$', '');
    }

    // format the number
    output = formatNumber(n._value, format, roundingFunction);

    // position the symbol
    if (symbolIndex <= 1) {
        if (output.indexOf('(') > -1 || output.indexOf('-') > -1) {
            output = output.split('');
            spliceIndex = 1;
            if (symbolIndex < openParenIndex || symbolIndex < minusSignIndex){
                // the symbol appears before the "(" or "-"
                spliceIndex = 0;
            }
            output.splice(spliceIndex, 0, locales[currentLocale].currency.symbol + space);
            output = output.join('');
        } else {
            output = locales[currentLocale].currency.symbol + space + output;
        }
    } else {
        if (output.indexOf(')') > -1) {
            output = output.split('');
            output.splice(-1, 0, space + locales[currentLocale].currency.symbol);
            output = output.join('');
        } else {
            output = output + space + locales[currentLocale].currency.symbol;
        }
    }

    return output;
}

function formatPercentage (n, format, roundingFunction) {
    var space = '',
        output,
        value = n._value * 100;

    // check for space before %
    if (format.indexOf(' %') > -1) {
        space = ' ';
        format = format.replace(' %', '');
    } else {
        format = format.replace('%', '');
    }

    output = formatNumber(value, format, roundingFunction);

    if (output.indexOf(')') > -1 ) {
        output = output.split('');
        output.splice(-1, 0, space + '%');
        output = output.join('');
    } else {
        output = output + space + '%';
    }

    return output;
}

function formatTime (n) {
    var hours = Math.floor(n._value/60/60),
        minutes = Math.floor((n._value - (hours * 60 * 60))/60),
        seconds = Math.round(n._value - (hours * 60 * 60) - (minutes * 60));
    return hours + ':' + ((minutes < 10) ? '0' + minutes : minutes) + ':' + ((seconds < 10) ? '0' + seconds : seconds);
}

function unformatTime (string) {
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

function formatNumber (value, format, roundingFunction) {
    var negP = false,
        signed = false,
        optDec = false,
        abbr = '',
        abbrK = false, // force abbreviation to thousands
        abbrM = false, // force abbreviation to millions
        abbrB = false, // force abbreviation to billions
        abbrT = false, // force abbreviation to trillions
        abbrForce = false, // force abbreviation
        bytes = '',
        ord = '',
        abs = Math.abs(value),
        suffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        min,
        max,
        power,
        w,
        precision,
        thousands,
        d = '',
        neg = false;

    // check if number is zero and a custom zero format has been set
    if (value === 0 && zeroFormat !== null) {
        return zeroFormat;
    } else {
        // see if we should use parentheses for negative number or if we should prefix with a sign
        // if both are present we default to parentheses
        if (format.indexOf('(') > -1) {
            negP = true;
            format = format.slice(1, -1);
        } else if (format.indexOf('+') > -1) {
            signed = true;
            format = format.replace(/\+/g, '');
        }

        // see if abbreviation is wanted
        if (format.indexOf('a') > -1) {
            // check if abbreviation is specified
            abbrK = format.indexOf('aK') >= 0;
            abbrM = format.indexOf('aM') >= 0;
            abbrB = format.indexOf('aB') >= 0;
            abbrT = format.indexOf('aT') >= 0;
            abbrForce = abbrK || abbrM || abbrB || abbrT;

            // check for space before abbreviation
            if (format.indexOf(' a') > -1) {
                abbr = ' ';
                format = format.replace(' a', '');
            } else {
                format = format.replace('a', '');
            }

            if (abs >= Math.pow(10, 12) && !abbrForce || abbrT) {
                // trillion
                abbr = abbr + locales[currentLocale].abbreviations.trillion;
                value = value / Math.pow(10, 12);
            } else if (abs < Math.pow(10, 12) && abs >= Math.pow(10, 9) && !abbrForce || abbrB) {
                // billion
                abbr = abbr + locales[currentLocale].abbreviations.billion;
                value = value / Math.pow(10, 9);
            } else if (abs < Math.pow(10, 9) && abs >= Math.pow(10, 6) && !abbrForce || abbrM) {
                // million
                abbr = abbr + locales[currentLocale].abbreviations.million;
                value = value / Math.pow(10, 6);
            } else if (abs < Math.pow(10, 6) && abs >= Math.pow(10, 3) && !abbrForce || abbrK) {
                // thousand
                abbr = abbr + locales[currentLocale].abbreviations.thousand;
                value = value / Math.pow(10, 3);
            }
        }

        // see if we are formatting bytes
        if (format.indexOf('b') > -1) {
            // check for space before
            if (format.indexOf(' b') > -1) {
                bytes = ' ';
                format = format.replace(' b', '');
            } else {
                format = format.replace('b', '');
            }

            for (power = 0; power <= suffixes.length; power++) {
                min = Math.pow(1024, power);
                max = Math.pow(1024, power+1);

                if (value >= min && value < max) {
                    bytes = bytes + suffixes[power];
                    if (min > 0) {
                        value = value / min;
                    }
                    break;
                }
            }
        }

        // see if ordinal is wanted
        if (format.indexOf('o') > -1) {
            // check for space before
            if (format.indexOf(' o') > -1) {
                ord = ' ';
                format = format.replace(' o', '');
            } else {
                format = format.replace('o', '');
            }

            ord = ord + locales[currentLocale].ordinal(value);
        }

        if (format.indexOf('[.]') > -1) {
            optDec = true;
            format = format.replace('[.]', '.');
        }

        w = value.toString().split('.')[0];
        precision = format.split('.')[1];
        thousands = format.indexOf(',');

        if (precision) {
            if (precision.indexOf('[') > -1) {
                precision = precision.replace(']', '');
                precision = precision.split('[');
                d = toFixed(value, (precision[0].length + precision[1].length), roundingFunction, precision[1].length);
            } else {
                d = toFixed(value, precision.length, roundingFunction);
            }

            w = d.split('.')[0];

            if (d.split('.')[1].length) {
                d = locales[currentLocale].delimiters.decimal + d.split('.')[1];
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
        if (w.indexOf('-') > -1) {
            w = w.slice(1);
            neg = true;
        }

        if (thousands > -1) {
            w = w.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + locales[currentLocale].delimiters.thousands);
        }

        if (format.indexOf('.') === 0) {
            w = '';
        }

        return ((negP && neg) ? '(' : '') + ((!negP && neg) ? '-' : '') + ((!neg && signed) ? '+' : '') + w + d + ((ord) ? ord : '') + ((abbr) ? abbr : '') + ((bytes) ? bytes : '') + ((negP && neg) ? ')' : '');
    }
}

/************************************
    Top Level Functions
************************************/

numeral = function (input) {
    if (numeral.isNumeral(input)) {
        input = input.value();
    } else if (input === 0 || typeof input === 'undefined') {
        input = 0;
    } else if (!Number(input)) {
        input = numeral.fn.unformat(input);
    }

    return new Numeral(Number(input));
};

// version number
numeral.version = VERSION;

// compare numeral object
numeral.isNumeral = function (obj) {
    return obj instanceof Numeral;
};

// This function will load locales and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
numeral.locale = function (key, values) {
    if (!key) {
        return currentLocale;
    }

    if (key && !values) {
        if(!locales[key]) {
            throw new Error('Unknown locale : ' + key);
        }
        currentLocale = key;
    }

    if (values || !locales[key]) {
        loadLocale(key, values);
    }

    return numeral;
};

// This function provides access to the loaded locale data.  If
// no arguments are passed in, it will simply return the current
// global locale object.
numeral.localeData = function (key) {
    if (!key) {
        return locales[currentLocale];
    }

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
});

numeral.zeroFormat = function (format) {
    zeroFormat = typeof(format) === 'string' ? format : null;
};

numeral.defaultFormat = function (format) {
    defaultFormat = typeof(format) === 'string' ? format : '0.0';
};

/************************************
    Helpers
************************************/

function loadLocale(key, values) {
    locales[key] = values;
}

/************************************
    Floating-point helpers
************************************/

// The floating-point helper functions and implementation
// borrows heavily from sinful.js: http://guipn.github.io/sinful.js/

/**
 * Array.prototype.reduce for browsers that don't support it
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#Compatibility
 */
if ('function' !== typeof Array.prototype.reduce) {
    Array.prototype.reduce = function (callback, opt_initialValue) {
        'use strict';

        if (null === this || 'undefined' === typeof this) {
            // At the moment all modern browsers, that support strict mode, have
            // native implementation of Array.prototype.reduce. For instance, IE8
            // does not support strict mode, so this check is actually useless.
            throw new TypeError('Array.prototype.reduce called on null or undefined');
        }

        if ('function' !== typeof callback) {
            throw new TypeError(callback + ' is not a function');
        }

        var index,
            value,
            length = this.length >>> 0,
            isValueSet = false;

        if (1 < arguments.length) {
            value = opt_initialValue;
            isValueSet = true;
        }

        for (index = 0; length > index; ++index) {
            if (this.hasOwnProperty(index)) {
                if (isValueSet) {
                    value = callback(value, this[index], index, this);
                } else {
                    value = this[index];
                    isValueSet = true;
                }
            }
        }

        if (!isValueSet) {
            throw new TypeError('Reduce of empty array with no initial value');
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
    return args.reduce(function (prev, next) {
        var mp = multiplier(prev),
            mn = multiplier(next);
    return mp > mn ? mp : mn;
    }, -Infinity);
}


/************************************
    Numeral Prototype
************************************/


numeral.fn = Numeral.prototype = {

    clone : function () {
        return numeral(this);
    },

    format : function (inputString, roundingFunction) {
        return formatNumeral(this,
              inputString ? inputString : defaultFormat,
              (roundingFunction !== undefined) ? roundingFunction : Math.round
          );
    },

    unformat : function (inputString) {
        if (Object.prototype.toString.call(inputString) === '[object Number]') {
            return inputString;
        }
        return unformatNumeral(this, inputString ? inputString : defaultFormat);
    },

    value : function () {
        return this._value;
    },

    valueOf : function () {
        return this._value;
    },

    set : function (value) {
        this._value = Number(value);
        return this;
    },

    add : function (value) {
        var corrFactor = correctionFactor.call(null, this._value, value);
        function cback(accum, curr, currI, O) {
            return accum + corrFactor * curr;
        }
        this._value = [this._value, value].reduce(cback, 0) / corrFactor;
        return this;
    },

    subtract : function (value) {
        var corrFactor = correctionFactor.call(null, this._value, value);
        function cback(accum, curr, currI, O) {
            return accum - corrFactor * curr;
        }
        this._value = [value].reduce(cback, this._value * corrFactor) / corrFactor;
        return this;
    },

    multiply : function (value) {
        function cback(accum, curr, currI, O) {
            var corrFactor = correctionFactor(accum, curr);
            return (accum * corrFactor) * (curr * corrFactor) /
                (corrFactor * corrFactor);
        }
        this._value = [this._value, value].reduce(cback, 1);
        return this;
    },

    divide : function (value) {
        function cback(accum, curr, currI, O) {
            var corrFactor = correctionFactor(accum, curr);
            return (accum * corrFactor) / (curr * corrFactor);
        }
        this._value = [this._value, value].reduce(cback);
        return this;
    },

    difference : function (value) {
        return Math.abs(numeral(this._value).subtract(value).value());
    }

};

module.exports = numeral;

/*! 
 * numeral.js language configuration
 * language : belgium-dutch (be-nl)
 * author : Dieter Luypaert : https://github.com/moeriki
 */
(function () {
    var language = {
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
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('be-nl', language);
    }
}());
/*! 
 * numeral.js language configuration
 * language : simplified chinese
 * author : badplum : https://github.com/badplum
 */
(function () {
    var language = {
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
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('chs', language);
    }
}());

/*!
 * numeral.js language configuration
 * language : czech (cs)
 * author : Anatoli Papirovski : https://github.com/apapirovski
 */
(function () {
    var language = {
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
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('cs', language);
    }
}());

/*! 
 * numeral.js language configuration
 * language : danish denmark (dk)
 * author : Michael Storgaard : https://github.com/mstorgaard
 */
(function () {
    var language = {
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
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('da-dk', language);
    }
}());
/*! 
 * numeral.js language configuration
 * language : German in Switzerland (de-ch)
 * author : Michael Piefel : https://github.com/piefel (based on work from Marco Krage : https://github.com/sinky)
 */ 
(function () {
    var language = {
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
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('de-ch', language);
    }
}());
/*! 
 * numeral.js language configuration
 * language : German (de) – generally useful in Germany, Austria, Luxembourg, Belgium
 * author : Marco Krage : https://github.com/sinky
 */
(function () {
    var language = {
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
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('de', language);
    }
}());
/*! 
 * numeral.js language configuration
 * language : english united kingdom (uk)
 * author : Dan Ristic : https://github.com/dristic
 */
(function () {
    var language = {
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
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('en-gb', language);
    }
}());
/*! 
 * numeral.js language configuration
 * language : spanish Spain
 * author : Hernan Garcia : https://github.com/hgarcia
 */
(function () {
    var language = {
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
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('es', language);
    }
}());

/*! 
 * numeral.js language configuration
 * language : spanish
 * author : Hernan Garcia : https://github.com/hgarcia
 */
(function () {
    var language = {
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
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('es', language);
    }
}());

/*! 
 * numeral.js language configuration
 * language : Estonian
 * author : Illimar Tambek : https://github.com/ragulka
 *
 * Note: in Estonian, abbreviations are always separated
 * from numbers with a space
 */
(function () {
    var language = {
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
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('et', language);
    }
}());

/*! 
 * numeral.js language configuration
 * language : Finnish
 * author : Sami Saada : https://github.com/samitheberber
 */
(function () {
    var language = {
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
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('fi', language);
    }
}());

/*!
 * numeral.js language configuration
 * language : french (Canada) (fr-CA)
 * author : Léo Renaud-Allaire : https://github.com/renaudleo
 */
(function () {
    var language = {
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
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('fr-CA', language);
    }
}());
/*! 
 * numeral.js language configuration
 * language : french (fr-ch)
 * author : Adam Draper : https://github.com/adamwdraper
 */
(function () {
    var language = {
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
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('fr-ch', language);
    }
}());

/*! 
 * numeral.js language configuration
 * language : french (fr)
 * author : Adam Draper : https://github.com/adamwdraper
 */
(function () {
    var language = {
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
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('fr', language);
    }
}());
/*!
 * numeral.js language configuration
 * language : Hungarian (hu)
 * author : Peter Bakondy : https://github.com/pbakondy
 */
(function () {
    var language = {
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
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('hu', language);
    }
}());
/*! 
 * numeral.js language configuration
 * language : italian Italy (it)
 * author : Giacomo Trombi : http://cinquepunti.it
 */
(function () {
    var language = {
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
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('it', language);
    }
}());
/*! 
 * numeral.js language configuration
 * language : japanese
 * author : teppeis : https://github.com/teppeis
 */
(function () {
    var language = {
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
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('ja', language);
    }
}());

/*! 
 * numeral.js language configuration
 * language : netherlands-dutch (nl-nl)
 * author : Dave Clayton : https://github.com/davedx
 */
(function () {
    var language = {
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
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('nl-nl', language);
    }
}());
/*! 
 * numeral.js language configuration
 * language : polish (pl)
 * author : Dominik Bulaj : https://github.com/dominikbulaj
 */
(function () {
    var language = {
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
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('pl', language);
    }
}());
/*! 
 * numeral.js language configuration
 * language : portuguese brazil (pt-br)
 * author : Ramiro Varandas Jr : https://github.com/ramirovjr
 */
(function () {
    var language = {
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
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('pt-br', language);
    }
}());
/*! 
 * numeral.js language configuration
 * language : portuguese (pt-pt)
 * author : Diogo Resende : https://github.com/dresende
 */
(function () {
    var language = {
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
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('pt-pt', language);
    }
}());

// numeral.js language configuration
// language : Russian for the Ukraine (ru-UA)
// author : Anatoli Papirovski : https://github.com/apapirovski
(function () {
    var language = {
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
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('ru-UA', language);
    }
}());

/*! 
 * numeral.js language configuration
 * language : russian (ru)
 * author : Anatoli Papirovski : https://github.com/apapirovski
 */
(function () {
    var language = {
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
            symbol: 'руб.'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('ru', language);
    }
}());

/*!
 * numeral.js language configuration
 * language : slovak (sk)
 * author : Ahmed Al Hafoudh : http://www.freevision.sk
 */
(function () {
    var language = {
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
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('sk', language);
    }
}());

/*! 
 * numeral.js language configuration
 * language : thai (th)
 * author : Sathit Jittanupat : https://github.com/jojosati
 */
(function () {
    var language = {
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
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('th', language);
    }
}());

/*! 
 * numeral.js language configuration
 * language : turkish (tr)
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
        language = {
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
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('tr', language);
    }
}());

// numeral.js language configuration
// language : Ukrainian for the Ukraine (uk-UA)
// author : Michael Piefel : https://github.com/piefel (with help from Tetyana Kuzmenko)
(function () {
    var language = {
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
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('uk-UA', language);
    }
}());
