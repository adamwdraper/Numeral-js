/*! 
 * numeral.js language configuration
 * language : russian (ru)
 * author : Anatoli Papirovski : https://github.com/apapirovski
 */
(function () {
    var language = {
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
            format: {
                full: '#,##0.00 $',
                negative_full: '-#,##0.00 $',
                abbr: '0.00a $',
                negative_abbr: '-0.00a $',
                rounded: '#,### $',
                negative_rounded: '-#,### $'
            },
            exceptions: {AUD: 'A$', BRL: 'R$', CAD: 'CA$', CNY: 'CN\u00A5', EUR: '\u20AC', GBP: '\u00A3', HKD: 'HK$', ILS: '\u20AA', INR: '\u20B9', JPY: '\u00A5', KRW: '\u20A9', MXN: 'MX$', NZD: 'NZ$', RUB: '\u0440\u0443\u0431.', RUR: '\u0440.', SDG: '\u0441\u0443\u0434\u0430\u043D\u0441\u043A\u043E\u0433\u043E \u0424\u0443\u043D\u0442\u0430*', SSP: '\u044E\u0436\u043D\u043E\u0441\u0443\u0434\u0430\u043D\u0441\u043A\u043E\u0433\u043E \u0444\u0443\u043D\u0442\u0430', THB: '\u0E3F', TND: '\u0442\u0443\u043D\u0438\u0441\u0441\u043A\u043E\u0433\u043E \u0434\u0438\u043D\u0430\u0440\u0430*', TWD: 'NT$', UAH: '\u20B4', USD: '$', VND: '\u20AB', XAF: 'FCFA', XCD: 'EC$', XOF: 'CFA', XPF: 'CFPF', XXX: 'XXXX'},
            localCurrency: 'RUB',
            symbol: '\u0440\u0443\u0431.'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('ru', language);
    }
}());
