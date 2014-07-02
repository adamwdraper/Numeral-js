/*! 
 * numeral.js language configuration
 * language : indonesian (id)
 * author : Rich Daley : http://github.com/pedantic-git
 */
(function () {
    var language = {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'rb',
            million: 'jt',
            billion: 'ml',
            trillion: 't'
        },
        ordinal : function (number) {
            return 'ke';
        },
        currency: {
            symbol: 'Rp'
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
