/*! 
 * numeral.js language configuration
 * language : netherlands-dutch (nl-nl)
 * author : Dave Clayton : https://github.com/davedx
 */
(function () {
    var language = {
        delimiters: {
            thousands: '.',
            decimal  : ','
        },
        abbreviations: {
            thousand : 'k',
            million  : 'mln',
            billion  : 'mrd',
            trillion : 'bln'
        },
        ordinal : function (number) {
            var remainder = number % 100;
            return (number !== 0 && remainder <= 1 || remainder === 8 || remainder >= 20) ? 'ste' : 'de';
        },
        currency: {
            format: {
                full: '$ #,##0.00',
                negative_full: '$ #,##0.00-',
                abbr: '$ 0.00a',
                negative_abbr: '$ 0.00-a',
                rounded: '$ #,###',
                negative_rounded: '$ #,###-'
            },
            exceptions: {AUD: 'AU $', BRL: 'R$', CAD: 'C$', CNY: 'CN\u00A5', EUR: '\u20AC', FJD: 'FJ$', GBP: '\u00A3', HKD: 'HK$', ILS: '\u20AA', INR: '\u20B9', JPY: 'JP\u00A5', KRW: '\u20A9', MXN: 'MX$', NZD: 'NZ$', SBD: 'SI$', THB: '\u0E3F', TWD: 'NT$', USD: 'US$', VND: '\u20AB', XAF: 'FCFA', XCD: 'EC$', XOF: 'CFA', XPF: 'CFPF'},
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
        this.numeral.language('nl-nl', language);
    }
}());
