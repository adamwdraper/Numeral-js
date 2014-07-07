/*!
 * numeral.js language configuration
 * language : french (Canada) (fr-CA)
 * author : Léo Renaud-Allaire : https://github.com/renaudleo
 */
(function () {
    var language = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'M',
            billion: 'G',
            trillion: 'T'
        },
        ordinal : function (number) {
            return number === 1 ? 'er' : 'e';
        },
        currency: {
            symbol: '$'
        },
        suffixes: {
          'B':  'o',
          'KB': 'Ko',
          'MB': 'Mo',
          'GB': 'Go',
          'TB': 'To',
          'PB': 'Po',
          'EB': 'Eo',
          'ZB': 'Zo',
          'YB': 'Yo'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('fr-ca', language);
    }
}());
