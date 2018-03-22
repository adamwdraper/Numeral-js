// numeral.js locale configuration
// locale : korean
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
    numeral.register('locale', 'ko', {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: '천',
            million: '백만',
            billion: '조',
            trillion: '억'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: '₩'
        }
    });
}));
