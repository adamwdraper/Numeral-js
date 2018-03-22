// numeral.js locale configuration
// locale : khmer
// author : Menghok : https://github.com/Menghok

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    numeral.register('locale', 'km', {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: 'ពាន់',
            million: 'លាន',
            billion: 'ពាន់លាន',
            trillion: 'លានលាន'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: '¥'
        }
    });
}));
