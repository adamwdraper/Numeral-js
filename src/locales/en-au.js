/* 
 * numeral.js locale configuration
 * locale : English Australia
 * author : Don Vince : https://github.com/donvince/
 */
(function () {
    var locale = {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number) {
            var b = number % 10;
            return (~~ (number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
        },
        currency: {
            symbol: '$'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('en-au', locale);
    }
}());
