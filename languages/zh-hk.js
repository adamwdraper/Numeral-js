/*! 
 * numeral.js language configuration
 * language : chinese Hong Kong (hk)
 * author : Rich Daley : https://github.com/pedantic-git
 */
(function () {
    var language = {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: '千',
            million: '百萬',
            billion: '十億',
            trillion: '兆'
        },
        ordinal: function (number) {
          // Should go before number but numeral.js doesn't currently
          // support this
          return '第';
        },
        currency: {
            symbol: '$'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('zh-hk', language);
    }
}());
