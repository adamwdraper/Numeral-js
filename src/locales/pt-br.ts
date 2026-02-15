// numeral.js locale configuration
// locale : portuguese brazil (pt-br)
// author : Ramiro Varandas Jr : https://github.com/ramirovjr

(function (global: any, factory: any) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral: any) {
    numeral.register('locale', 'pt-br', {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'mil',
            million: 'milhões',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number: number) {
            return 'º';
        },
        currency: {
            symbol: 'R$'
        }
    });
}));
