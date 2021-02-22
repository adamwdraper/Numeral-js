// numeral.js locale configuration
// locale : spanish Spain
// author : Hernan Garcia : https://github.com/hgarcia

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    numeral.register('locale', 'es-es', {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'K',
            million: 'M',
            billion: 'MM',
            trillion: 'B'
        },
        ordinal: function (number) {
            return '.º';
        },
        currency: {
            symbol: '€'
        }
    });
}));
