// numeral.js locale configuration
// language : swedish Sweden (sv-se)
// author : Matthias Haamann : https://github.com/mhaamann

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    numeral.register('locale', 'sv-se', {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 't',
            million: 'mn',
            billion: 'md',
            trillion: 'bn'
        },
        ordinal: function (number) {
            var str = number.toString();
            var endsWith = str[str.length - 1];
            return (endsWith === '1' || endsWith === '2') ? ':a' : ':e';
        },
        currency: {
            symbol: 'SEK'
        }
    });
}));
