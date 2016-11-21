/*! 
 * numeral.js language configuration
 * language : Indonesian (ID)
 * author : Niyoko Yuliawan (niyoko@niyoko.net)
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
            billion: 'my',
            trillion: 'tr'
        },
        ordinal: function (number) {
			// In Indonesian, ordinal is written as 'ke-' at the front of the number
            return { prefix : 'ke-', suffix : '' };
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
        this.numeral.language('id-ID', language);
    }
}());