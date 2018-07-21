// numeral.js locale configuration
// locale : spanish Peru
// author : Kenneth Luján https://github.com/klujanrosas

(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
      define(['../numeral'], factory);
  } else if (typeof module === 'object' && module.exports) {
      factory(require('../numeral'));
  } else {
      factory(global.numeral);
  }
}(this, function (numeral) {
  numeral.register('locale', 'es-pe', {
      delimiters: {
          thousands: ',',
          decimal: '.'
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
          symbol: 'S/'
      }
  });
}));
