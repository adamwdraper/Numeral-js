// numeral.js language configuration
// language : french (fr)
// author : Adam Draper : https://github.com/adamwdraper
(function(){var e={delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"k",million:"m"},ordinal:function(e){return e===1?"er":"e"},currency:{symbol:"\u20ac"}};typeof module!="undefined"&&module.exports&&(module.exports=e),typeof window!="undefined"&&this.numeral&&this.numeral.language&&this.numeral.language("fr",e)})();