/*! 
 * numeral.js language configuration
 * language : japanese
 * author : teppeis : https://github.com/teppeis
 */
(function(){var n={delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"千",million:"百万",billion:"十億",trillion:"兆"},ordinal:function(){return"."},currency:{symbol:"¥"}};"undefined"!=typeof module&&module.exports&&(module.exports=n),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("ja",n)})();