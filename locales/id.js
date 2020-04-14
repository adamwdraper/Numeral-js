// numeral.js locale configuration
// locale : indonesia (id)
// author : Reza Ilham : https://github.com/erzailham

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    numeral.register('locale', 'id', {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'Rb', // Ribu
            million: 'Jt', // Juta
            billion: 'M', // Miliar
            trillion: 'T' // Triliun
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: 'Rp' // Rupiah
        }
    });
}));
