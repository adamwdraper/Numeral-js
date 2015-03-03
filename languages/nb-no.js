/*! 
 * numeral.js language configuration
 * language : norwegian bokmål norway (no)
 * author : Ib Johansen : https://github.com/ibjohansen
 * source : http://www.sprakradet.no/Sprakhjelp/Skriveregler_og_grammatikk/Tall/
 */
(function () {
    var language = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'mill.',   //  6 zeroes
            billion: 'mrd.',    //  9 zeroes
            trillion: 'brd.'   //  12 zeroes
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: 'NOK'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('nb-no', language);
    }
}());