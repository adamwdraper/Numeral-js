/*
 * numeral.js locale configuration
 * locale : french (Canada) (fr-ca)
 * author : Léo Renaud-Allaire : https://github.com/renaudleo
 */
(function () {
    var numeral = typeof window !== 'undefined' ? this.numeral : require('../numeral');

    numeral.register('locale', 'fr-ca', {
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
        }
    });
}());
