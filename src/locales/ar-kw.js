// numeral.js locale configuration
// locale : arabic kuwait (kw)
// author : Nusret Parlak : https://github.com/nusretparlak

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    numeral.register('locale', 'ar-kw', {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: 'ألف',
            million: 'مليون',
            billion: 'مليار',
            trillion: 'تريليون'
        },
        ordinal: function (number) {
            return ' ';
        },
        currency: {
            symbol: 'KD'
        }
    });
}));
