// numeral.js locale configuration
// locale : Russian for the Ukraine (ru-ua)
// author : Anatoli Papirovski : https://github.com/apapirovski
(function () {
    var locale = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'тыс.',
            million: 'млн',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function () {
            // not ideal, but since in Russian it can taken on 
            // different forms (masculine, feminine, neuter)
            // this is all we can do
            return '.'; 
        },
        currency: {
            symbol: '\u20B4'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locale;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.locale) {
        this.numeral.locale('ru-ua', locale);
    }
}());
