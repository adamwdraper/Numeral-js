// numeral.js locale configuration
// locale : Romanian
// author : David Sanda : https://github.com/dazix

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
            thousands: '.',
            decimal: ','
        },
        abbreviations: { // I found these here http://www.unicode.org/cldr/charts/28/verify/numbers/ro.html
            thousand: 'K',
            million: 'mil',
            billion: 'mld',
            trillion: 'tril'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: 'L'
        }
    });
}));
