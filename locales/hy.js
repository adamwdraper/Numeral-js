// numeral.js locale configuration
// locale : Armenian ('hy', 'arm', 'am')
// author : Arman Yeghiazaryan : https://github.com/otanim

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    numeral.register('locale', 'hy', {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'հազ.',
            million: 'միլ.',
            billion: 'մլրդ.',
            trillion: 'տրլն.'
        },
        ordinal: function (number) {
            return number === 1 ? '-ին' : '-րդ';
        },
        currency: {
            symbol: '֏'
        }
    });
}));
