/*
 * numeral.js locale configuration
 * locale : simplified chinese (chs)
 * author : badplum : https://github.com/badplum
 */
(function () {
    var numeral = typeof window !== 'undefined' ? this.numeral : require('../numeral');

    numeral.register('locale', 'chs', {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: '千',
            million: '百万',
            billion: '十亿',
            trillion: '兆'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: '¥'
        }
    });
}());
