// numeral.js locale configuration
// locale : greek
// author : John Samonakis : https://github.com/jsamon

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
            thousand: 'χιλ.',
            million: 'εκ.',
            billion: 'δις',
            trillion: 'τρις'
        },
        ordinal: function (number) {
            return 'ος';
        },
        currency: {
            symbol: '€'
        }
    });
}));
