// numeral.js locale configuration
// locale : Russian for the Ukraine (ru-ua)
// author : Anatoli Papirovski : https://github.com/apapirovski
(function () {
    var numeral = typeof window !== 'undefined' ? this.numeral : require('../numeral');

    numeral.register('locale', 'ru-ua', {
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
    });
}());
