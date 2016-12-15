/*
 * numeral.js locale configuration
 * locale : portuguese (pt-pt)
 * author : Diogo Resende : https://github.com/dresende
 */
import numeral from '../numeral';

numeral.register('locale', 'pt-pt', {
    delimiters: {
        thousands: ' ',
        decimal: ','
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal : function (number) {
        return 'º';
    },
    currency: {
        symbol: '€'
    }
});
