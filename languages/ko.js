/*!
 * numeral.js language configuration
 * language : korean
 * author : longfin : https://github.com/longfin
 */
(function () {
    var language = {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: '천',
            million: '백만',
            billion: '십억',
            trillion: '경'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: '₩'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('ko', language);
    }
}());
