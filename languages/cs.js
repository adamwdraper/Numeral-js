/*!
 * numeral.js language configuration
 * language : czech (cs)
 * author : Jan Peša : https://github.com/smajl
 */
(function () {
    var language = {
        delimiters: {
            thousands: '\u00A0',
            decimal: ','
        },
        abbreviations: {
            thousand: 'tis.',
            million: 'mil.',
            billion: 'mld.',
            trillion: 'bil.'
        },
        ordinal: function () {
            return '.';
        },
        currency: {
            symbol: 'Kč'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('cs', language);
    }
}());
