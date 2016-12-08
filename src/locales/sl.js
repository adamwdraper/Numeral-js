/*
 * numeral.js locale configuration
 * locale : slovenian (sl)
 * author : Boštjan Pišler : https://github.com/BostjanPisler
 */
(function () {
    var numeral = typeof window !== 'undefined' && window.numeral ? window.numeral : require('../numeral');

    numeral.register('locale', 'sl', {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'mio',
            billion: 'mrd',
            trillion: 'trilijon'
        },
        ordinal: function () {
            return '.';
        },
        currency: {
            symbol: '€'
        }
    });
}());