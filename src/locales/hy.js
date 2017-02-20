// numeral.js locale configuration
// locale : Armenian ('hy-AM') ('arm')
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
    numeral.register('locale', 'hy-AM', {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: ' հազ․',
            million: ' միլլ․',
            billion: ' մլրդ․',
            trillion: ' տրլն․'
        },
        ordinal: function (number) {
            return number === 1 ? '-ին' : '-րդ';
        },
        currency: {
            symbol: ' դրամ'
        }
    });
}));
