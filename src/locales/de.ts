// numeral.js locale configuration
// locale : German (de) – generally useful in Germany, Austria, Luxembourg, Belgium
// author : Marco Krage : https://github.com/sinky

(function (global: any, factory: any) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral: any) {
    numeral.register('locale', 'de', {
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
            return '.';
        },
        currency: {
            symbol: '€'
        }
    });
}));
