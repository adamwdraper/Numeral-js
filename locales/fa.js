// numeral.js locale configuration
// locale : Persian (fa)
// author : Javad Adib : https://github.com/MrJavadAdib

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    numeral.register('locale', 'fa', {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: 'هزار',
            million: 'میلیون',
            billion: 'میلیارد',
            trillion: 'تریلیون'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: 'تومان'
        }
    });
}));
