/*
 * numeral.js locale configuration
 * locale : Finnish
 * author : Sami Saada : https://github.com/samitheberber
 */
import * as numeral from '../numeral';

numeral.register('locale', 'fi', {
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
    ordinal: function (number) {
        return '.';
    },
    currency: {
        symbol: '€'
    }
});
