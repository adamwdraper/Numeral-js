/*
 * numeral.js format configuration
 * format : exponential
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

    numeral.register('format', 'exponential', {
        regexps: {
            format: /(e\+|e-)/
        },
        format: function(value, format, roundingFunction) {
            var output,
                exponential = typeof value === 'number' && !numeral._.isNaN(value) ? value.toExponential() : '0e+0',
                parts = exponential.split('e');

            format = format.replace(/e[\+|\-]{1}0/, '');

            output = numeral._.numberToFormat(Number(parts[0]), format, roundingFunction);

            return output + 'e' + parts[1];
        }
    });
}());
