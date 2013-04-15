/*! 
 * numeral.js language configuration
 * language : english united kingdom (uk)
 * author : Dan Ristic : https://github.com/dristic
 */
(function(){var n={delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(n){var e=n%10;return 1===~~(n%100/10)?"th":1===e?"st":2===e?"nd":3===e?"rd":"th"},currency:{symbol:"£"}};"undefined"!=typeof module&&module.exports&&(module.exports=n),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("en-gb",n)})();