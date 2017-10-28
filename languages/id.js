/*! 
 * numeral.js language configuration
 * language : Bahasa Indonesia (id)
 * author : Yudhi Satrio : http://lab.linkaran.com
 */
(function () {
    var language = {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'ribu',
            million: 'juta',
            billion: 'miliar',
            trillion: 'triliun'
        },
        ordinal: function (number) {
            return number === 1 ? 'se' : 'se';
        },
        currency: {
            symbol: 'Rp.'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('id', language);
    }
}());
