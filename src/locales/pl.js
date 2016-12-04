/*
 * numeral.js locale configuration
 * locale : polish (pl)
 * author : Dominik Bulaj : https://github.com/dominikbulaj
 */
(function () {
    var numeral = typeof window !== 'undefined' ? this.numeral : require('../numeral');

    numeral.register('locale', 'pl', {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'tys.',
            million: 'mln',
            billion: 'mld',
            trillion: 'bln'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: 'PLN'
        }
    });
}());
