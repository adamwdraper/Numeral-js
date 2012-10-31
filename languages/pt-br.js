// numeral.js language configuration
// language : portuguese brazil (pt-br)
// author : Ramiro Varandas Jr : https://github.com/ramirovjr
(function () {
    var language = {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'mil',
            million: 'milhões'
        },
        ordinal: function (number) {
            return (~~ (number % 100 / 10) === 1) ? 'º' : 'º';
        },
        currency: {
            symbol: 'R$'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('pt-br', language);
    }
}());