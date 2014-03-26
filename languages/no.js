/*! 
 * numeral.js language configuration
 * language : norwegian (bokmål)
 * author : Ove Andersen : https://github.com/azzlack
 */
(function () {
    var language = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: 'kr'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('nb-no', language);
        this.numeral.language('nn-no', language);
        this.numeral.language('no', language);
        this.numeral.language('nb', language);
        this.numeral.language('nn', language);
    }
}());