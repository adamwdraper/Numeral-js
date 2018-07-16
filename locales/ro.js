// numeral.js locale configuration
// locale : Romanian
// author : Elena Neacsu : https://github.com/endeav

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    numeral.register('locale', 'ro', {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'mil', // milion/milioane
            billion: 'mld', // miliard/miliarde
            trillion: 't',
        },
        ordinal: function (number) {
            // In Romanian the ordinal can have different forms based on gender
            // and the quantity
            // masculine:
            // E.g.: 1st = primul; 2nd = al doilea; 3rd = al treilea
            // feminine:
            // E.g.: 1st = prima; 2nd = a doua; 3rd = a treia
            // Therefore is difficult to predict the format
            return '';
        },
        currency: {
            symbol: 'RON'
        }
    });
}));
