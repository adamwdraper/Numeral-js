/*! 
 * numeral.js language configuration
 * language : italian Italy (it)
 * author : Giacomo Trombi : http://cinquepunti.it
 */
(function(){var n={delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"mila",million:"mil",billion:"b",trillion:"t"},ordinal:function(){return"º"},currency:{symbol:"€"}};"undefined"!=typeof module&&module.exports&&(module.exports=n),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("it",n)})();