/*
 * numeral.js locale configuration
 * locale : German (de) – generally useful in Germany, Austria, Luxembourg, Belgium
 * author : Marco Krage : https://github.com/sinky
 */
(function () {
    var numeral = typeof window !== 'undefined' ? this.numeral : require('../numeral');

    numeral.register('locale', 'de', {
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
            symbol: '€'
        }
    });
}());
