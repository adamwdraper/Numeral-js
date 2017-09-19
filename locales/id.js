// numeral.js locale configuration
// locale : Indonesian (Bahasa Indonesia)
// author : w- : https://github.com/w-

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
            thousand: 'k',
            million: 'Jt',
            billion: 'M',
            trillion: 'T'
        },
        ordinal: function (number) {
            // http://mylanguages.org/indonesian_numbers.php
            // The oridnals work by adding a prefix "ke" to the number except for when the value is 1.
            // That is a special case value of "Pertama".
            // Because it isn't clear how to prefix values i've left this as '.' per other locales I've seen.
            return '.';
        },
        currency: {
            symbol: 'Rp.'
        }
    });
}));
