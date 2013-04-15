/*! 
 * numeral.js language configuration
 * language : french (fr)
 * author : Adam Draper : https://github.com/adamwdraper
 */
(function(){var n={delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(n){return 1===n?"er":"e"},currency:{symbol:"€"}};"undefined"!=typeof module&&module.exports&&(module.exports=n),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("fr",n)})();