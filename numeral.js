
// numeral.js
// version : 1.0.0
// author : Adam Draper
// license : MIT
// https://github.com/adamwdraper/Numeral-js

(function () {

    /************************************
        Constants
    ************************************/

    var numeral,
        VERSION = '1.0.0',
        round = Math.round, i,

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

    // format date using native date object
    function formatNumeral (n, format) {
        var output;
        
        // figure out what kind of format we are dealing with
        if (format.indexOf('$') > -1) { // money!!!!!
            output = formatMoney(n, format);
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

    function formatMoney (n, format) {
        format = format.replace('$', '');
        var output = formatNumeral(n, format);
        if (output.indexOf('(') > -1 || output.indexOf('-') > -1) {
            output = output.split('');
            output.splice(1, 0, '$');
            output = output.join('');
        } else {
            output = '$' + output;
        }
        return output;
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

    function formatNumber (n, format) {
        var w = n._n.toString().split('.')[0],
            negP = false;

        if (format.indexOf('(') > -1) {
            negP = true;
            format = format.slice(1, -1);
        }

        var precision = format.split('.')[1],
            thousands = format.indexOf(','),
            d = '',
            neg = false;

        // format number
        if (n._n < 0) {
            w = w.slice(1);
            neg = true;
        }

        if (thousands > -1) {
            w = w.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        }

        if (format.indexOf('.') === 0) {
            w = '';
        }

        if (precision) {
            // do to fixed
            d = '.' + toFixed(n._n, precision.length).split('.')[1];
        }

        return ((negP) ? '(' : '') + ((!negP && neg) ? '-' : '') + w + d + ((negP) ? ')' : '');
    }

    /************************************
        Top Level Functions
    ************************************/

    numeral = function (input) {
        if (!Number(input)) {
            return null;
        }
        return new Numeral(Number(input));
    };

    // version number
    numeral.version = VERSION;

    // compare numeral object
    numeral.isNumeral = function (obj) {
        return obj instanceof Numeral;
    };


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
            return this._n - Number(value);
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