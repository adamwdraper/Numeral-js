// numeral.js language configuration
// language : czech (cs)
// author : Anatoli Papirovski : https://github.com/apapirovski
(function(){var e={delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:" tis.",million:" mil."},ordinal:function(){return"."},currency:{symbol:" Kč"}};typeof module!="undefined"&&module.exports&&(module.exports=e);typeof window!="undefined"&&this.numeral&&this.numeral.language&&this.numeral.language("cs",e)})();