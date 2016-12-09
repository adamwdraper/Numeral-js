/*
 * numeral.js locale configuration
 * locale : french (fr-ch)
 * author : Adam Draper : https://github.com/adamwdraper
 */
import * as numeral from '../numeral';

numeral.register('locale', 'fr-ch', {
    delimiters: {
        thousands: '\'',
        decimal: '.'
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal : function (number) {
        return number === 1 ? 'er' : 'e';
    },
    currency: {
        symbol: 'CHF'
    }
});
