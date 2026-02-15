// numeral.js locale configuration
// locale : french (fr)
// author : Adam Draper : https://github.com/adamwdraper

(function (global: any, factory: any) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral: any) {
    numeral.register('locale', 'fr', {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number: number) {
            return number === 1 ? 'er' : 'e';
        },
        currency: {
            symbol: '€'
        }
    });
}));
