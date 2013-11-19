/*! 
 * numeral.js language configuration
 * language : italian Italy (it)
 * author : Giacomo Trombi : http://cinquepunti.it
 */
(function () {
    var language = {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'mila',
            million: 'mil',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number) {
            return 'º';
        },
        currency: {
            format: {
                full: '$ #,##0.00',
                negative_full: '-$ #,##0.00',
                abbr: '$ 0.00a',
                negative_abbr: '-$ 0.00a',
                rounded: '$ #,###',
                negative_rounded: '-$ #,###'
            },
            exceptions: {AUD: 'A$', BGN: 'Lv', BRL: 'R$', CAD: 'CA$', CNY: 'CN\u00A5', EUR: '\u20AC', GBP: '\u00A3', HKD: 'HK$', ILS: '\u20AA', INR: '\u20B9', ISK: 'Kr', JPY: 'JP\u00A5', KRW: '\u20A9', MXN: 'MX$', NZD: 'NZ$', PGK: 'K', RON: 'L', THB: '\u0E3F', TMT: 'm', TWD: 'NT$', USD: 'US$', VND: '\u20AB', XAF: 'FCFA', XCD: 'EC$', XOF: 'CFA', XPF: 'CFPF'},
            localCurrency: 'EUR',
            symbol: '\u20AC'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('it', language);
    }
}());
