/*! 
 * numeral.js language configuration
 * language : persian iran (fa-ir)
 * author : Ali Abdollahzade : https://github.com/aliabdzad
 */
(function () {
    var language = {
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
            return 'ام';
        },
        currency: {
            symbol: ' ﷼'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('fa-ir', language);
    }
}());
