// numeral.js locale configuration
// locale : Farsi (Persian)
// author : Sepehr Safari : https://github.com/sepehrs1378/

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    numeral.register('locale', 'fa', {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: 'hezaar',
            million: 'million',
            billion: 'milyard',
            trillion: 'trillion'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: '\uFDFC'
        }
    });
}));
