/*
 * numeral.js format configuration
 * format : currency
 * author : Adam Draper : https://github.com/adamwdraper
 */

(function () {
    var numeral,
        format;

    // get numeral from environment
    if (typeof window !== 'undefined' && this.numeral) {
        // Browser
        numeral = this.numeral;
    } else if (typeof module !== 'undefined' && module.exports) {
        // Node
        numeral = require('../numeral');
    }

    format = {
        regexp: null,
        format: function(value, format, roundingFunction) {
            var locale = numeral.locales[numeral.options.currentLocale],
                negP = false,
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
            if (numeral._.includes(format, '(')) {
                negP = true;
                format = format.slice(1, -1);
            } else if (numeral._.includes(format, '+')) {
                signed = true;
                format = format.replace(/\+/g, '');
            }

            // see if abbreviation is wanted
            if (numeral._.includes(format, 'a')) {
                abbrForce = format.match(/a(k|m|b|t)?/);

                abbrForce = abbrForce ? abbrForce[1] : false;

                // check for space before abbreviation
                if (numeral._.includes(format, ' a')) {
                    abbr = ' ';
                }

                format = format.replace(new RegExp(abbr + 'a[kmbt]?'), '');

                if (abs >= trillion && !abbrForce || abbrForce === 't') {
                    // trillion
                    abbr += locale.abbreviations.trillion;
                    value = value / trillion;
                } else if (abs < trillion && abs >= billion && !abbrForce || abbrForce === 'b') {
                    // billion
                    abbr += locale.abbreviations.billion;
                    value = value / billion;
                } else if (abs < billion && abs >= million && !abbrForce || abbrForce === 'm') {
                    // million
                    abbr += locale.abbreviations.million;
                    value = value / million;
                } else if (abs < million && abs >= thousand && !abbrForce || abbrForce === 'k') {
                    // thousand
                    abbr += locale.abbreviations.thousand;
                    value = value / thousand;
                }
            }


            if (numeral._.includes(format, '[.]')) {
                optDec = true;
                format = format.replace('[.]', '.');
            }

            int = value.toString().split('.')[0];
            precision = format.split('.')[1];
            thousands = format.indexOf(',');

            if (precision) {
                if (numeral._.includes(precision, '[')) {
                    precision = precision.replace(']', '');
                    precision = precision.split('[');
                    decimal = numeral._.toFixed(value, (precision[0].length + precision[1].length), roundingFunction, precision[1].length);
                } else {
                    decimal = numeral._.toFixed(value, precision.length, roundingFunction);
                }

                int = decimal.split('.')[0];

                if (numeral._.includes(decimal, '.')) {
                    decimal = locale.delimiters.decimal + decimal.split('.')[1];
                } else {
                    decimal = '';
                }

                if (optDec && Number(decimal.slice(1)) === 0) {
                    decimal = '';
                }
            } else {
                int = numeral._.toFixed(value, null, roundingFunction);
            }

            // format number
            if (numeral._.includes(int, '-')) {
                int = int.slice(1);
                neg = true;
            }

            if (thousands > -1) {
                int = int.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + locale.delimiters.thousands);
            }

            if (format.indexOf('.') === 0) {
                int = '';
            }

            return (negP && neg ? '(' : '') + (!negP && neg ? '-' : '') + (!neg && signed ? '+' : '') + int + decimal + (abbr ? abbr : '') + (negP && neg ? ')' : '');
        }
    };

    numeral.register('format', 'number', format);
}());
