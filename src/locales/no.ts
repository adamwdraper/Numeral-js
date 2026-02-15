// numeral.js locale configuration
// locale : norwegian (bokmål)
// author : Ove Andersen : https://github.com/azzlack

(function (global: any, factory: any) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral: any) {
    numeral.register('locale', 'no', {
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
            symbol: 'kr'
        }
    });
}));
