// numeral.js locale configuration
// locale : croatian (hr)
// abbreviations from: http://www.unicode.org/cldr/charts/28/verify/numbers/hr.html
// author : Marko Bonaći : https://github.com/mbonaci

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    numeral.register('locale', 'hr', {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'tis.',
            million: 'mil.',
            billion: 'mlr.',
            trillion: 'bil.'
        },
        ordinal: function () {
            return '.';
        },
        currency: {
            symbol: 'HRK'
        }
    });
}));
