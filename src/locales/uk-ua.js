// numeral.js locale configuration
// locale : Ukrainian for the Ukraine (uk-ua)
// author : Michael Piefel : https://github.com/piefel (with help from Tetyana Kuzmenko)
(function () {
    var numeral = typeof window !== 'undefined' ? this.numeral : require('../numeral');

    numeral.register('locale', 'uk-ua', {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'тис.',
            million: 'млн',
            billion: 'млрд',
            trillion: 'блн'
        },
        ordinal: function () {
            // not ideal, but since in Ukrainian it can taken on
            // different forms (masculine, feminine, neuter)
            // this is all we can do
            return '';
        },
        currency: {
            symbol: '\u20B4'
        }
    });
}());
