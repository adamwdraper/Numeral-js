// numeral.js locale configuration
// locale : greek (el)
// author : Vagelis Antoniadis : https://github.com/vanton1

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    numeral.register('locale', 'el', {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'χιλ',
            million: 'εκ',
            billion: 'δισ',
            trillion: 'τρισ'
        },
        ordinal : function (number) {
        // In Greek there 3 genders of nouns.
        // I just put here the masculin form for the ordinal
            return 'ος';
        },
        currency: {
            symbol: '€'
        }
    });
}));
