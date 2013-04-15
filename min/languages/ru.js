/*! 
 * numeral.js language configuration
 * language : russian (ru)
 * author : Anatoli Papirovski : https://github.com/apapirovski
 */
(function(){var n={delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"тыс.",million:"млн",billion:"b",trillion:"t"},ordinal:function(){return"."},currency:{symbol:"руб."}};"undefined"!=typeof module&&module.exports&&(module.exports=n),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("ru",n)})();