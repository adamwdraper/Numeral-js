/*! 
 * numeral.js language configuration
 * language : thai (th)
 * author : Sathit Jittanupat : https://github.com/jojosati
 */
(function () {
    var language = {
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
        },
        suffixes: {
          'B':  'ไบต์',
          'KB': 'กิโลไบต์',
          'MB': 'เมกะไบต์',
          'GB': 'กิกะไบต์',
          'TB': 'เทราไบต์',
          'PB': 'เพตะไบต์',
          'EB': 'เอกซะไบต์',
          'ZB': 'เซตตะไบต์',
          'YB': 'ยอตตะไบต์'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('th', language);
    }
}());
