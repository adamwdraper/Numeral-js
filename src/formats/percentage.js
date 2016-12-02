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

    numeral.register('format', 'percentage', {
        regexp: /(%)/,
        format: function(value, format, roundingFunction) {
            var space = numeral._.includes(format, ' %') ? ' ' : '',
                output;

            value = value * 100;

            // check for space before %
            format = format.replace(/\s?\%/, '');

            output = numeral._.formatNumber(value, format, roundingFunction);

            if (numeral._.includes(output, ')')) {
                output = output.split('');

                output.splice(-1, 0, space + '%');

                output = output.join('');
            } else {
                output = output + space + '%';
            }

            return output;
        }
    });
}());
