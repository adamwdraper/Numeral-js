// numeral.js language configuration
// language : belgium-dutch (be-nl)
// author : Dieter Luypaert : https://github.com/moeriki
(function () {
    var language = {
        delimiters: {
            thousands: ' ',
            decimal  : ','
        },
        abbreviations: {
            thousand : 'k',
            million  : ' mln',
            billion  : ' mld',
            trillion : ' bln'
        },
        ordinal : function (number) {
            return (number === 1 || number >= 20) ? 'ste' : 'de';
        },
        currency: {
            symbol: '€ '
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('be-nl', language);
    }
}());