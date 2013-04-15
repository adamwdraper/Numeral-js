/*! 
 * numeral.js language configuration
 * language : portuguese (pt-pt)
 * author : Diogo Resende : https://github.com/dresende
 */
(function(){var n={delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(){return"º"},currency:{symbol:"€"}};"undefined"!=typeof module&&module.exports&&(module.exports=n),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("pt-pt",n)})();