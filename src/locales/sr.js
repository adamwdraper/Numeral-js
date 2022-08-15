// numeral.js locale configuration
// locale : Serbian
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
    numeral.register('locale', 'sr', {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: { // I found these here http://www.unicode.org/cldr/charts/28/verify/numbers/sr.html
            thousand: 'хиљ',
            million: 'мил',
            billion: 'млрд',
            trillion: 'бил'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: 'DIN'
        }
    });
}));
