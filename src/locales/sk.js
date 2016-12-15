/*
 * numeral.js locale configuration
 * locale : slovak (sk)
 * author : Ahmed Al Hafoudh : http://www.freevision.sk
 */
import numeral from '../numeral';

numeral.register('locale', 'sk', {
    delimiters: {
        thousands: ' ',
        decimal: ','
    },
    abbreviations: {
        thousand: 'tis.',
        million: 'mil.',
        billion: 'b',
        trillion: 't'
    },
    ordinal: function () {
        return '.';
    },
    currency: {
        symbol: '€'
    }
});
