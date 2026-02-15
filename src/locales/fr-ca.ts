// numeral.js locale configuration
// locale : french (Canada) (fr-ca)
// author : Léo Renaud-Allaire : https://github.com/renaudleo

(function (global: any, factory: any) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral: any) {
    numeral.register('locale', 'fr-ca', {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'M',
            billion: 'G',
            trillion: 'T'
        },
        ordinal: function (number: number) {
            return number === 1 ? 'er' : 'e';
        },
        currency: {
            symbol: '$'
        }
    });
}));
