/*!
 * numeral.js language configuration
 * language : swedish sweden (se)
 * author : Michael Lopez : https://github.com/michaellopez
 */
(function () {
    var language = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 't',
            million: 'mn',
            billion: 'md',
            trillion: 'bn'
        },
        ordinal: function (number) {
            var str = number.toString();
            var endsWith = str[str.length - 1];
            return (endsWith === '1' || endsWith === '2') ? ':a' : ':e';
        },
        currency: {
            symbol: 'SEK'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('sv-se', language);
    }
}());
