// numeral.js locale configuration
// locale : Latvian (lv)
// author : Lauris Bukšis-Haberkorns : https://github.com/Lafriks

(function (global: any, factory: any) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral: any) {
    numeral.register('locale', 'lv', {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: ' tūkst.',
            million: ' milj.',
            billion: ' mljrd.',
            trillion: ' trilj.'
        },
        ordinal: function (number: number) {
            return '.';
        },
        currency: {
            symbol: '€'
        }
    });
}));
