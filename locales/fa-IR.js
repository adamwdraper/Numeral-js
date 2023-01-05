// numeral.js locale configuration
// locale : farsi for iran (fa-ir)
// author : Hesam asnaashari : https://github.com/hessamasna/

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    numeral.register('locale', 'fa-IR', {
        delimiters: {
            thousands: ',',
            decimal: ','
        },
        abbreviations: {
            thousand: 'هزار',
            million: 'میلیون',
            billion: 'بیلیون',
            trillion: 'تریلیون'
        },
        ordinal: function () {
            return '.';
        },
        currency: {
            symbol: 'ریال'
        }
    });
}));
