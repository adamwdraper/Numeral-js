// numeral.js language configuration
// language : spanish
// author : Hernan Garcia : https://github.com/hgarcia
(function(){var e={delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"k",million:"mm"},ordinal:function(e){var t=e%10;return t===1||t===3?"er":t===2?"do":t===7||t===0?"mo":t===8?"vo":t===9?"no":"to"},currency:{symbol:"€"}};typeof module!="undefined"&&module.exports&&(module.exports=e);typeof window!="undefined"&&this.numeral&&this.numeral.language&&this.numeral.language("es",e)})();
