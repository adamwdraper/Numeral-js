// numeral.js locale configuration
// locale : romania (ro)
// author : Ondřej Čech

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    numeral.register('locale', 'ro', {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'K',
            million: 'mil.',
            billion: 'mld.',
            trillion: 'tril.'
        },
        ordinal: function (number) {
            return number === 1 ? '' : '-lea';
        },
        currency: {
            symbol: 'Lei'
        }
    });
}));
