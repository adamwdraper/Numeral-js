// numeral.js locale configuration
// locale : swedish sweden (se)
// author : Mattias Halldin : https://github.com/mattiashalldin

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
            thousand: 'k',
            million: 'm',
            billion: 'md',
            trillion: 'bn'
        },
        ordinal: function (number) {
            var b = number % 10;
            return ~~(number % 100 / 10) === 1 ? ':a' : b === 1 ? ':a' : b === 2 ? ':a' : b === 3 ? ':e' : ':e';
        },
        currency: {
          symbol: 'SKR'
        }
    });
}));
