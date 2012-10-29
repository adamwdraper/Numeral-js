
// numeral.js
// version : 1.2.3
// author : Adam Draper
// license : MIT
// http://adamwdraper.github.com/Numeral-js/

(function () {

    /************************************
        Constants
    ************************************/

    var numeral,
        VERSION = '1.2.3',
        round = Math.round, i,
        // internal storage for language config files
        languages = {},
        currentLanguage = 'en',
        // check for nodeJS
        hasModule = (typeof module !== 'undefined' && module.exports);


    /************************************
        Constructors
    ************************************/


    // Numeral prototype object
    function Numeral(number) {
        this._n = number;
    }

    /**
     * Implementation of toFixed() that treats floats more like decimals
     *
     * Fixes binary rounding issues (eg. (0.615).toFixed(2) === "0.61") that present
     * problems for accounting- and finance-related software.
     */
    function toFixed (value, precision) {
        var power = Math.pow(10, precision);

        // Multiply up by precision, round accurately, then divide and use native toFixed():
        return (Math.round(value * power) / power).toFixed(precision);
    }

    /************************************
        Formatting
    ************************************/

    // determine what type of formatting we need to do
    function formatNumeral (n, format) {
        var output;
        
        // figure out what kind of format we are dealing with
        if (format.indexOf('$') > -1) { // currency!!!!!
            output = formatCurrency(n, format);
        } else if (format.indexOf('b') > -1) { // filesize
            output = formatBytes(n, format);
        } else if (format.indexOf('%') > -1) { // percentage
            output = formatPercentage(n, format);
        } else if (format.indexOf(':') > -1) { // time
            output = formatTime(n, format);
        } else { // plain ol' number
            output = formatNumber(n, format);
        }

        // return string
        return output;
    }

    // revert to number
    function unformatNumeral (n, string) {
        if (string.indexOf(':') > -1) {
            n._n = unformatTime(string);
        } else {
            if (languages[currentLanguage].delimiters.decimal !== '.') {
                string = string.replace(/\./g,'').replace(languages[currentLanguage].delimiters.decimal, '.');
            }
            var thousandRegExp = new RegExp(languages[currentLanguage].abbreviations.thousand + '(?:\\)|\\' + languages[currentLanguage].currency.symbol + '?)$'),
                millionRegExp = new RegExp(languages[currentLanguage].abbreviations.million + '(?:\\)|\\' + languages[currentLanguage].currency.symbol + '?)$');
            n._n = ((string.match(thousandRegExp)) ? 1000 : 1) * ((string.match(millionRegExp)) ? 1000000 : 1) * ((string.indexOf('%') > -1) ? 0.01 : 1) * Number(((string.indexOf('(') > -1) ? '-' : '') + string.replace(/[^0-9\.'-]+/g, ''));
        }
        return n._n;
    }

    function formatCurrency (n, format) {
        format = format.replace('$', '');
        var output = formatNumeral(n, format);
        if (output.indexOf('(') > -1 || output.indexOf('-') > -1) {
            output = output.split('');
            output.splice(1, 0, languages[currentLanguage].currency.symbol);
            output = output.join('');
        } else {
            output = languages[currentLanguage].currency.symbol + output;
        }
        return output;
    }

    function formatBytes (n, format) {
        n = n._n;
        
        if (n < 1024) return "" + n + " bytes";

        var prefixes = ['kilo', 'mega', 'giga', 'tera', 'peta', 'exa', 'zetta', 'yotta'];
        for (var power=0; power<=prefixes.length; power++) {
          min = Math.pow(1024, power);
          max = Math.pow(1024, power+1);
          if (n > min && n < max) {
            return "" + n/min + " " + prefixes[power-1] + "bytes";
          }
        }
    }

    function formatPercentage (n, format) {
        format = format.replace('%', '');
        n._n = n._n * 100;
        var output = formatNumeral(n, format);
        if (output.indexOf(')') > -1 ) {
            output = output.split('');
            output.splice(-1, 0, '%');
            output = output.join('');
        } else {
            output = output + '%';
        }
        return output;
    }

    function formatTime (n, format) {
        var hours = Math.floor(n._n/60/60),
            minutes = Math.floor((n._n - (hours * 60 * 60))/60),
            seconds = Math.round(n._n - (hours * 60 * 60) - (minutes * 60));
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
        } else if (timeArray.lenght === 2) {
            // minutes
            seconds = seconds + (Number(timeArray[0]) * 60);
            // seconds
            seconds = seconds + Number(timeArray[1]);
        }
        return Number(seconds);
    }

    function formatNumber (n, format) {
        var negP = false,
            abbr = false,
            ord = false;

        // see if we should use parentheses for negative number
        if (format.indexOf('(') > -1) {
            negP = true;
            format = format.slice(1, -1);
        }

        // see if abbreviation is wanted
        if (format.indexOf('a') > -1) {
            format = format.replace('a', '');

            if (n._n > 1000000) {
                abbr = languages[currentLanguage].abbreviations.million;
                n._n = n._n / 1000000;
            } else {
                abbr = languages[currentLanguage].abbreviations.thousand;
                n._n = n._n / 1000;
            }
        }

        // see if ordinal is wanted
        if (format.indexOf('o') > -1) {
            format = format.replace('o', '');

            ord = languages[currentLanguage].ordinal(n._n);
        }

        var w = n._n.toString().split('.')[0],
            precision = format.split('.')[1],
            thousands = format.indexOf(','),
            d = '',
            neg = false;

        // format number
        if (n._n < 0) {
            w = w.slice(1);
            neg = true;
        }

        if (thousands > -1) {
            w = w.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + languages[currentLanguage].delimiters.thousands);
        }

        if (format.indexOf('.') === 0) {
            w = '';
        }

        if (precision) {
            // do to fixed
            d = languages[currentLanguage].delimiters.decimal + toFixed(n._n, precision.length).split('.')[1];
        }

        if (abbr) {

        }

        return ((negP && neg) ? '(' : '') + ((!negP && neg) ? '-' : '') + w + d + ((ord) ? ord : '') + ((abbr) ? abbr : '') + ((negP && neg) ? ')' : '');
    }

    /************************************
        Top Level Functions
    ************************************/

    numeral = function (input) {
        if (numeral.isNumeral(input)) {
            input = input.value();
        } else if (!Number(input)) {
            input = 0;
        }

        return new Numeral(Number(input));
    };

    // compare numeral object
    numeral.isNumeral = function (obj) {
        return obj instanceof Numeral;
    };

    // version number
    numeral.version = VERSION;

    // compare numeral object
    numeral.isNumeral = function (obj) {
        return obj instanceof Numeral;
    };

    // This function will load languages and then set the global language.  If
    // no arguments are passed in, it will simply return the current global
    // language key.
    numeral.language = function (key, values) {
        if (!key) {
            return currentLanguage;
        }

        if (key && !values) {
            currentLanguage = key;
        }

        if (values || !languages[key]) {
            loadLanguage(key, values);
        }

        return languages;
    };

    numeral.language('en', {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: 'k',
            million: 'm'
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

    /************************************
        Helpers
    ************************************/
    
    function loadLanguage(key, values) {
        languages[key] = values;
    }


    /************************************
        Numeral Prototype
    ************************************/


    numeral.fn = Numeral.prototype = {

        clone : function () {
            return numeral(this);
        },

        format : function (inputString) {
            return formatNumeral(this, inputString ? inputString : numeral.defaultFormat);
        },

        unformat : function (inputString) {
            return unformatNumeral(this, inputString ? inputString : numeral.defaultFormat);
        },

        value : function () {
            return this._n;
        },

        set : function (value) {
            this._n = Number(value);
            return this;
        },

        add : function (value) {
            this._n = this._n + Number(value);
            return this;
        },

        subtract : function (value) {
            this._n = this._n - Number(value);
            return this;
        },

        multiply : function (value) {
            this._n = this._n * Number(value);
            return this;
        },

        divide : function (value) {
            this._n = this._n / Number(value);
            return this;
        },

        difference : function (value) {
            var difference = this._n - Number(value);

            if (difference < 0) {
                difference = -difference;
            }

            return difference;
        }

    };

    /************************************
        Exposing Numeral
    ************************************/

    // Commenting out common js and global variable
    // // CommonJS module is defined
    if (hasModule) {
        module.exports = numeral;
    }
    /*global ender:false */
    if (typeof ender === 'undefined') {
        // here, `this` means `window` in the browser, or `global` on the server
        // add `numeral` as a global object via a string identifier,
        // for Closure Compiler "advanced" mode
        this['numeral'] = numeral;
    }
    
    /*global define:false */
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return numeral;
        });
    }
}).call(this);
