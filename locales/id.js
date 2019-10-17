// numeral.js locale configuration
// locale : Indonesia (id)
// author : fawwaz : https://github.com/fawwaz

(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
      define(['../numeral'], factory);
  } else if (typeof module === 'object' && module.exports) {
      factory(require('../numeral'));
  } else {
      factory(global.numeral);
  }
}(this, function (numeral) {
  numeral.register('locale', 'id', {
      delimiters: {
          thousands: '.',
          decimal: ','
      },
      abbreviations: {
          thousand: ' Ribu',
          million: ' Juta',
          billion: ' Milyar',
          trillion: ' Triliun'
      },
      ordinal: function (number) {
          // Indonesian people use prefix (ke-) instead of using suffix,
          // Because of that, i will let it to be empty.
          return '.';
      },
      currency: {
          symbol: 'Rp '
      }
  });
}));
