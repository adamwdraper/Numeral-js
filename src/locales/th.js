/*
 * numeral.js locale configuration
 * locale : thai (th)
 * author : Sathit Jittanupat : https://github.com/jojosati
 */
(function () {
    var numeral = typeof window !== 'undefined' ? this.numeral : require('../numeral');

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
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: '฿'
        }
    });
}());
