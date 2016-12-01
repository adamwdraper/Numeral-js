/*
 * numeral.js format configuration
 * format : currency
 * author : Adam Draper : https://github.com/adamwdraper
 */




(function () {
    // var numeral;
    // var currency = {
    //     regexp: /(\$)/,
    //     format: function(value, format, roundingFunction) {
    //         var symbolIndex = format.indexOf('$'),
    //             openParenIndex = format.indexOf('('),
    //             minusSignIndex = format.indexOf('-'),
    //             space = _.includes(format, ' $') || _.includes(format, '$ ') ? ' ' : '',
    //             spliceIndex,
    //             output;
    //
    //         // strip format of spaces and $
    //         format = format.replace(/\s?\$\s?/, '');
    //
    //         // format the number
    //         output = formatNumber(value, format, roundingFunction);
    //
    //         // position the symbol
    //         if (symbolIndex <= 1) {
    //             if (_.includes(output, '(') || _.includes(output, '-')) {
    //                 output = output.split('');
    //
    //                 spliceIndex = symbolIndex < openParenIndex || symbolIndex < minusSignIndex ? 0 : 1;
    //
    //                 output.splice(spliceIndex, 0, locales[options.currentLocale].currency.symbol + space);
    //
    //                 output = output.join('');
    //             } else {
    //                 output = locales[options.currentLocale].currency.symbol + space + output;
    //             }
    //         } else {
    //             if (_.includes(output, ')')) {
    //                 output = output.split('');
    //
    //                 output.splice(-1, 0, space + locales[options.currentLocale].currency.symbol);
    //
    //                 output = output.join('');
    //             } else {
    //                 output = output + space + locales[options.currentLocale].currency.symbol;
    //             }
    //         }
    //
    //         return output;
    //     }
    // };
    //
    // // get numeral from environment
    // if (typeof window !== 'undefined' && this.numeral) {
    //     // Browser
    //     numeral = this.numeral;
    // } else if (typeof module !== 'undefined' && module.exports) {
    //     // Node
    //     numeral = require('../numeral');
    // }
    //
    // numeral.register('format', 'currency', currency);
}());
