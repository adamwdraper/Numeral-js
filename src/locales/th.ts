// numeral.js locale configuration
// locale : thai (th)
// author : Sathit Jittanupat : https://github.com/jojosati

(function (global: any, factory: any) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral: any) {


    numeral.register('locale', 'th', {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: 'พัน',
            million: 'ล้าน',
            billion: 'พันล้าน',
            trillion: 'ล้านล้าน'
        },
        ordinal: function (number: number) {
            return '.';
        },
        currency: {
            symbol: '฿'
        }
    });
}));
