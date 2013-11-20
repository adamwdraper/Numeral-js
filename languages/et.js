/*! 
 * numeral.js language configuration
 * language : Estonian
 * author : Illimar Tambek : https://github.com/ragulka
 */
(function () {
    var language = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'tuh',
            million: 'mln',
            billion: 'mld',
            trillion: 'T'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: '€'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('et', language);
    }
}());
