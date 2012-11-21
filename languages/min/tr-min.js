// numeral.js language configuration
// language : turkish (tr)
// author : Ecmel Ercan : https://github.com/ecmel
//          Erhan Gundogan : https://github.com/erhangundogan,
//          Burak Yiğit Kaya: https://github.com/BYK
(function(){var e={1:"'inci",5:"'inci",8:"'inci",70:"'inci",80:"'inci",2:"'nci",7:"'nci",20:"'nci",50:"'nci",3:"'üncü",4:"'üncü",100:"'üncü",6:"'ncı",9:"'uncu",10:"'uncu",30:"'uncu",60:"'ıncı",90:"'ıncı"},t={delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"b",million:"m"},ordinal:function(t){if(t===0)return"'ıncı";var n=t%10,r=t%100-n,i=t>=100?100:null;return e[n]||e[r]||e[i]},currency:{symbol:"₺"}};typeof module!="undefined"&&module.exports&&(module.exports=t),typeof window!="undefined"&&this.numeral&&this.numeral.language&&this.numeral.language("tr",t)})();