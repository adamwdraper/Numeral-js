// numeral.js locale configuration
// locale : Vietnam (vi)
// author : Thang Kieu: https://github.com/kqthang1505

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    numeral.register('locale', 'vi', {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'nghìn',
            million: 'triệu',
            billion: 'tỷ',
            trillion: 'nghìn tỷ'
        },
        ordinal: function () {
            return '.';
        },
        currency: {
            symbol: 'đ'
        }
    });
}));
