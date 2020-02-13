// numeral.js locale configuration
// locale : albanian Albania (sq)
// author : Oerd Cukalla : http://radiant.al

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    numeral.register('locale', 'sq', {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'mijë',
            million: 'Mln',
            billion: 'Mld',
            trillion: 'Tln'
        },
        ordinal: function (number) {
            if (number % 10 === 4 && number !== 14) {
                return '–t';
            }
            return '–ë';
        },
        currency: {
            symbol: 'ALL'
        }
    });
}));
