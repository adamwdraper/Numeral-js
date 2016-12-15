/*
 * numeral.js locale configuration
 * locale : italian Italy (it)
 * author : Giacomo Trombi : http://cinquepunti.it
 */
import numeral from '../numeral';

numeral.register('locale', 'it', {
    delimiters: {
        thousands: '.',
        decimal: ','
    },
    abbreviations: {
        thousand: 'mila',
        million: 'mil',
        billion: 'b',
        trillion: 't'
    },
    ordinal: function (number) {
        return 'º';
    },
    currency: {
        symbol: '€'
    }
});
