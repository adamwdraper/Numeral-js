// numeral.js locale configuration
// locale : khmer (km-kh)
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
    numeral.register('locale', 'km-kh', {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: 'ពាន់',
            million: 'លាន',
            billion: 'ប៊ីលាន',
            trillion: 'ទ្រីលាន'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: '¥'
        }
    });
}));
