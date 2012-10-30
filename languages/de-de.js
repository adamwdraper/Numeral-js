// numeral.js language configuration
// language : german (de-de)
// author : Marco Krage : https://github.com/sinky
(function () {
    var language = {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'm'
        },
        ordinal : function (number) {
            return ''; // TODO
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
        this.numeral.language('de-de', language);
    }
}());