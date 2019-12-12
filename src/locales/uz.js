// numeral.js locale configuration
// locale : uzbek-cyrillic (uz)
// author : Karimov Oqil : https://github.com/pykarimov/

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    numeral.register('locale', 'uz-cyr', {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'минг.',
            million: 'млн.',
            billion: 'млрд.',
            trillion: 'трлн.'
        },
        ordinal: function () {
            // not ideal, but since in Russian it can taken on
            // different forms (masculine, feminine, neuter)
            // this is all we can do
            return '.';
        },
        currency: {
            symbol: 'сўм'
        }
    });
}));
