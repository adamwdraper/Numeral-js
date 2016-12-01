/*
 * numeral.js locale configuration
 * locale : norwegian (bokmål)
 * author : Ove Andersen : https://github.com/azzlack
 */
(function () {
    var locale = {
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
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('nb-no', locale);
        this.numeral.locale('nn-no', locale);
        this.numeral.locale('no', locale);
        this.numeral.locale('nb', locale);
        this.numeral.locale('nn', locale);
    }
}());
