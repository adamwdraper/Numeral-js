// numeral.js locale configuration
// locale : georgian (ka)
// author : Alexander Jinoridze : https://github.com/AlexanderJinoridze

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    numeral.register('locale', 'ka', {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: ' ათასი',
            million: ' მილიონი',
            billion: ' მილიარდი',
            trillion: ' ტრილიონი'
        },
        ordinal : function (number) {
            return (number===1) ? '-ელი' : (number<20 || (number<=100 && number%20===0)) ? 'მე-' : '-ე';
        },
        currency: {
            symbol: '₾'
        }
    });
}));