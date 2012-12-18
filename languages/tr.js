// numeral.js language configuration
// language : turkish (tr)
// author : Ecmel Ercan : https://github.com/ecmel
//          Erhan Gundogan : https://github.com/erhangundogan,
//          Burak Yiğit Kaya: https://github.com/BYK

(function () {
    var suffixes = {
        1: "'inci",
        5: "'inci",
        8: "'inci",
        70: "'inci",
        80: "'inci",

        2: "'nci",
        7: "'nci",
        20: "'nci",
        50: "'nci",

        3: "'üncü",
        4: "'üncü",
        100: "'üncü",

        6: "'ncı",

        9: "'uncu",
        10: "'uncu",
        30: "'uncu",

        60: "'ıncı",
        90: "'ıncı"
    };
    var language = {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'b',
            million: 'm',
            billion: 'bi',
            trillion: 't'
        },
        ordinal: function (number) {
          if (number === 0) {  // special case for zero
              return "'ıncı";
          }

          var a = number % 10;
          var b = number % 100 - a;
          var c = number >= 100 ? 100 : null;

          return suffixes[a] || suffixes[b] || suffixes[c];        
        },
        currency: {
            symbol: '\u20BA'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('tr', language);
    }
}());
