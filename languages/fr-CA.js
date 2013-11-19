/*!
 * numeral.js language configuration
 * language : french (Canada) (fr-CA)
 * author : Léo Renaud-Allaire : https://github.com/renaudleo
 */
(function () {
    var language = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'M',
            billion: 'G',
            trillion: 'T'
        },
        ordinal : function (number) {
            return number === 1 ? 'er' : 'e';
        },
        currency: {
            format: {
                full: '#,##0.00 $',
                negative_full: '(#,##0.00 $)',
                abbr: '0.00 a$',
                negative_abbr: '(0.00 a$)',
                rounded: '#,### $',
                negative_rounded: '(#,### $)'
            },
            exceptions: {ADP: '\u20A7A', ANG: 'f.NA', AUD: '$AU', BEF: 'FB', BND: '$BN', BRL: 'R$', CAD: '$', CNY: 'CN\u00A5', CYP: '\u00A3CY', EEK: 'krE', ESP: '\u20A7', EUR: '\u20AC', FJD: '$FJ', FRF: 'F', GBP: '\u00A3UK', HKD: '$HK', IEP: '\u00A3IE', ILP: '\u00A3IL', ILS: '\u20AA', INR: '\u20B9', ITL: '\u20A4IT', JPY: '\u00A5JP', KRW: '\u20A9', LKR: 'RsSL', MTP: '\u00A3MT', MXN: '$MEX', NPR: 'RsNP', NZD: '$NZ', PKR: 'RsPK', RHD: '$RH', SBD: '$SB', SGD: '$SG', SVB: '\u20A1SV', THB: '\u0E3F', TWD: 'NT$', USD: '$US', VND: '\u20AB', XAF: 'FCFA', XCD: '$EC', XOF: 'F CFA', XPF: 'FCFP', ZWD: '$Z'},
            localCurrency: 'CAD',
            symbol: '$'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('fr-CA', language);
    }
}());
