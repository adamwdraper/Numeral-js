// numeral.js language configuration
// language : german (de-de)
// author : Marco Krage : https://github.com/sinky
(function(){var a={delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"k",million:"m"},ordinal:function(a){return""},currency:{symbol:"€"}};if(typeof module!=="undefined"&&module.exports){module.exports=a}if(typeof window!=="undefined"&&this.numeral&&this.numeral.language){this.numeral.language("de-de",a)}})()