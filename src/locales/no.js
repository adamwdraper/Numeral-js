/*
 * numeral.js locale configuration
 * locale : norwegian (bokmål)
 * author : Ove Andersen : https://github.com/azzlack
 */
import numeral from '../numeral';

numeral.register('locale', 'no', {
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
    ordinal: function (number) {
        return '.';
    },
    currency: {
        symbol: 'kr'
    }
});
