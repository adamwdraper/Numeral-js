// numeral.js locale configuration
// locale : farsi Iran (fa)
// author : Hamid Malek Mohammadi : https://github.com/hmmftg

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    numeral.register('locale', 'fa-ir', {
        delimiters: {
            thousands: '.',
            decimal: '.'
        },
        abbreviations: {
            thousand: 'هزار',
            million: 'میلیون',
            billion: 'میلیارد',
            trillion: 'تریلیارد'
        },
        ordinal: function (number) {
            return ''
        },
        currency: {
            symbol: '﷼'
        }
    });
}));
