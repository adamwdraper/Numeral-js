/*
 * numeral.js format configuration
 * format : currency
 * author : Adam Draper : https://github.com/adamwdraper
 */
(function () {
    var numeral;

    // get numeral from environment
    if (typeof window !== 'undefined' && this.numeral) {
        // Browser
        numeral = this.numeral;
    } else if (typeof module !== 'undefined' && module.exports) {
        // Node
        numeral = require('../numeral');
    }

    numeral.register('format', 'currency', {
        regexp: /(\$)/,
        format: function(value, format, roundingFunction) {
            var locale = numeral.locales[numeral.options.currentLocale],
                symbolIndex = format.indexOf('$'),
                openParenIndex = format.indexOf('('),
                minusSignIndex = format.indexOf('-'),
                space = numeral._.includes(format, ' $') || numeral._.includes(format, '$ ') ? ' ' : '',
                spliceIndex,
                output;

            // strip format of spaces and $
            format = format.replace(/\s?\$\s?/, '');

            // format the number
            output = numeral._.numberToFormat(value, format, roundingFunction);

            // position the symbol
            if (symbolIndex <= 1) {
                if (numeral._.includes(output, '(') || numeral._.includes(output, '-')) {
                    output = output.split('');

                    spliceIndex = symbolIndex < openParenIndex || symbolIndex < minusSignIndex ? 0 : 1;

                    output.splice(spliceIndex, 0, locale.currency.symbol + space);

                    output = output.join('');
                } else {
                    output = locale.currency.symbol + space + output;
                }
            } else {
                if (numeral._.includes(output, ')')) {
                    output = output.split('');

                    output.splice(-1, 0, space + locale.currency.symbol);

                    output = output.join('');
                } else {
                    output = output + space + locale.currency.symbol;
                }
            }

            return output;
        }
    });
}());
