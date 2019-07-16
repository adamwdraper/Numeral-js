// numeral.js locale configuration
// locale : spanish Paraguay
// author : Dario Garcia : https://github.com/dario61081

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    numeral.register('locale', 'es-py', {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number) {
            var b = number % 10;
            return (b === 1 || b === 3) ? 'ero' :
                (b === 2) ? 'do' :
                (b === 4 || b ===5 || b===6) ? 'to' :
                (b === 7 || b === 0) ? 'mo' :
                (b === 8) ? 'vo' :
                (b === 9) ? 'no' : 'to';
        },
        currency: {
            symbol: 'Gs'
        }
    });
}));
