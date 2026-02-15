// numeral.js locale configuration
// locale : vietnam (vi)
// author : Harry Nguyen : https://github.com/thaihoa311

(function (global: any, factory: any) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral: any) {

    numeral.register('locale', 'vi', {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: ' nghìn',
            million: ' triệu',
            billion: ' tỷ',
            trillion: ' nghìn tỷ'
        },
        ordinal: function () {
            return '.';
        },
        currency: {
            symbol: '₫'
        }
    });
}));
