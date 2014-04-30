/*! 
 * numeral.js language configuration
 * language : vietnamese (vi)
 * author : Adam Draper : https://github.com/adamwdraper
 */
(function () {
    var language = {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal : function (number) {
          // Should really go before the number
          return ' thứ';
        },
        currency: {
          // Should really go after the number
          symbol: '₫ '
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('vi', language);
    }
}());
