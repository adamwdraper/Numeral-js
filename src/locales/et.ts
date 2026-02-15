// numeral.js locale configuration
// locale : Estonian
// author : Illimar Tambek : https://github.com/ragulka
// Note: in Estonian, abbreviations are always separated from numbers with a space

(function (global: any, factory: any) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral: any) {
    numeral.register('locale', 'et', {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: ' tuh',
            million: ' mln',
            billion: ' mld',
            trillion: ' trl'
        },
        ordinal: function (number: number) {
            return '.';
        },
        currency: {
            symbol: '€'
        }
    });
}));
