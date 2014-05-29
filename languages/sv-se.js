/*!
 * numeral.js language configuration
 * language : swedish Sweden (sv-se)
 * author : Victor Pegado : https://github.com/vpegado
 */
(function () {
    var language = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'mn',
            billion: 'md',
            trillion: 'bn'
        },
        ordinal: function (number) {
            var a = Math.abs(number) % 10,
                b = Math.abs(number) % 100;
            if ((a === 1 || a === 2) && (b !== 11 && b !== 12)) {
                return ':a';
            }
            return ':e';
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
        this.numeral.language('sv-se', language);
    }
}());
