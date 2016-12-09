/*
 * numeral.js locale configuration
 * locale : German in Switzerland (de-ch)
 * author : Michael Piefel : https://github.com/piefel (based on work from Marco Krage : https://github.com/sinky)
 */
import * as numeral from '../numeral';

numeral.register('locale', 'de-ch', {
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
        symbol: 'CHF'
    }
});
