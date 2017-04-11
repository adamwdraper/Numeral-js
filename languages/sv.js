// numeral.js language configuration
// language : Swedish (sv)
// author : Alexander Sandtr
(function () {
    var language = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 't',
            million: 'mn',
            billion: 'md',
            trillion: 'bn'
        },
        ordinal: function (number) {
          var b = number % 10;
          var n10to19 = ((number % 100 / 10) === 1);
          var suffix;
          if (b == 1 || b == 2 && !n10to19) {
            suffix = 'a';
          } else {
            suffix = 'e';
          }
          return ':' + suffix;
        },
        currency: {
            symbol: 'kr'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('sv', language);
    }
}());
