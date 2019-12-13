// numeral.js locale configuration
// locale : Swedish
// author : Simon Bohlin : https://github.com/sesam

(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
      define(['../numeral'], factory);
  } else if (typeof module === 'object' && module.exports) {
      factory(require('../numeral'));
  } else {
      factory(global.numeral);
  }
}(this, function (numeral) {
  numeral.register('locale', 'se', {
      delimiters: {
          thousands: ' ',
          decimal: ','
      },
      abbreviations: {
          thousand: 't',
          million: 'm',
          billion: 'b',
          trillion: 't'
      },
      ordinal: function (number) {
          return '.';
      },
      currency: {
          symbol: 'kr'
      }
  });
}));
