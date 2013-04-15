/*! 
 * numeral.js language configuration
 * language : turkish (tr)
 * author : Ecmel Ercan : https://github.com/ecmel, Erhan Gundogan : https://github.com/erhangundogan, Burak Yiğit Kaya: https://github.com/BYK
 */
(function(){var n={1:"'inci",5:"'inci",8:"'inci",70:"'inci",80:"'inci",2:"'nci",7:"'nci",20:"'nci",50:"'nci",3:"'üncü",4:"'üncü",100:"'üncü",6:"'ncı",9:"'uncu",10:"'uncu",30:"'uncu",60:"'ıncı",90:"'ıncı"},e={delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"bin",million:"milyon",billion:"milyar",trillion:"trilyon"},ordinal:function(e){if(0===e)return"'ıncı";var i=e%10,t=e%100-i,o=e>=100?100:null;return n[i]||n[t]||n[o]},currency:{symbol:"₺"}};"undefined"!=typeof module&&module.exports&&(module.exports=e),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("tr",e)})();