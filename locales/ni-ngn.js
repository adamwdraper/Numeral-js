// numeral.js locale configuration
// locale : nigerian-naira (ni-ngn)
// author : David Ubanyi : https://github.com/davidubanyi

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    numeral.register('locale', 'ngn', {
        delimiters: {
            thousands: ',',
            decimal  : '.'
        },
        abbreviations: {
            thousand : 'k',
            million  : 'm',
            billion  : 'b',
            trillion : 't'
        },
        ordinal: function (number) {
            var b = number % 10;
            return (~~ (number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
        },
        currency: {
            symbol: '₦ '
        }
    });
}));
