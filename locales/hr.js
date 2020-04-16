// numeral.js locale configuration
// locale : hrvatski (hr)
// author : Kresimir Bernardic

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
            billion: 'bil.',
            trillion: 'tril.'
        },
        ordinal: function () {
            return '.';
        },
        currency: {
            symbol: 'kn'
        }
    });
}));