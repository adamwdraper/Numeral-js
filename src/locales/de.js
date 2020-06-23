// numeral.js locale configuration
// locale : German (de) – generally useful in Germany, Austria, Luxembourg, Belgium
// author : Marco Krage : https://github.com/sinky

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    numeral.register('locale', 'de', {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'Tsd.',
            million: 'Mio.',
            billion: 'Mrd.',
            trillion: 'Bio.'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: '€'
        }
    });
}));
