// numeral.js language configuration
// language : russian (ru)
// author : Anatoli Papirovski : https://github.com/apapirovski
(function(){var e={delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:" тыс.",million:" млн"},ordinal:function(){return"."},currency:{symbol:" руб."}};typeof module!="undefined"&&module.exports&&(module.exports=e);typeof window!="undefined"&&this.numeral&&this.numeral.language&&this.numeral.language("ru",e)})();