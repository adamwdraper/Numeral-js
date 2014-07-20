/*!
 * numeral.js language configuration
 * language : japanese
 * author : teppeis : https://github.com/teppeis
 */
(function () {
    var language = {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: [
            { limits: [Math.pow(10, 3), Math.pow(10, 4)], string: '千'}, // thousands
            { limits: [Math.pow(10, 4), Math.pow(10, 6)], string: '万'}, // ten thousands
            { limits: [Math.pow(10, 6), Math.pow(10, 8)], string: '百万'}, // million
            { limits: [Math.pow(10, 8), Math.pow(10, 9)], string: '億'}, // hundred million
            { limits: [Math.pow(10, 12), Number.POSITIVE_INFINITY], string: '兆'} // trillion
        ],
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: '¥'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('ja', language);
    }
}());
