/*! 
 * numeral.js language configuration
 * language : spanish Spain
 * author : Hernan Garcia : https://github.com/hgarcia
 */
(function () {
    var language = {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'mm',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number) {
            var b = number % 10;
            return (b === 1 || b === 3) ? 'er' :
                   (b === 2) ? 'do' :
                   (b === 7 || b === 0) ? 'mo' :
                   (b === 8) ? 'vo' :
                   (b === 9) ? 'no' : 'to';
        },
        currency: {
            format: {
                full: '#,##0.00 $',
                negative_full: '-#,##0.00 $',
                abbr: '0.00a $',
                negative_abbr: '-0.00a $',
                rounded: '#,### $',
                negative_rounded: '-#,### $'
            },
            exceptions: {AFN: 'Af', ANG: 'NAf.', AOA: 'Kz', ARS: 'AR$', AUD: 'AU$', AWG: 'Afl.', AZN: 'man.', BRL: 'R$', CAD: 'CA$', CNY: 'CN\u00A5', ESP: '\u20A7', EUR: '\u20AC', GBP: '\u00A3', HKD: 'HK$', ILS: '\u20AA', INR: '\u20B9', JPY: 'JP\u00A5', KRW: '\u20A9', MXN: 'MX$', NZD: 'NZ$', THB: '\u0E3F', TWD: 'NT$', USD: 'US$', VND: '\u20AB', XAF: 'FCFA', XCD: 'EC$', XOF: 'CFA', XPF: 'CFPF'},
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
        this.numeral.language('es', language);
    }
}());
