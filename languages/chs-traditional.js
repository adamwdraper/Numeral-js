/*! 
 * numeral.js language configuration
 * language : traditional chinese
 * author : cades : https://github.com/cades
 */
(function () {
    var language = {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: '千',
            million: '百萬',
            billion: '十億',
            trillion: '兆'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: 'NT$'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('chs-traditional', language);
    }
}());
