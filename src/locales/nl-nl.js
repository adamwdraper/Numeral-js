/*
 * numeral.js locale configuration
 * locale : netherlands-dutch (nl-nl)
 * author : Dave Clayton : https://github.com/davedx
 */
import numeral from '../numeral';

numeral.register('locale', 'nl-nl', {
    delimiters: {
        thousands: '.',
        decimal  : ','
    },
    abbreviations: {
        thousand : 'k',
        million  : 'mln',
        billion  : 'mrd',
        trillion : 'bln'
    },
    ordinal : function (number) {
        var remainder = number % 100;
        return (number !== 0 && remainder <= 1 || remainder === 8 || remainder >= 20) ? 'ste' : 'de';
    },
    currency: {
        symbol: '€ '
    }
});
