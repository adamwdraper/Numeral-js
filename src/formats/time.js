/*
 * numeral.js format configuration
 * format : time
 * author : Adam Draper : https://github.com/adamwdraper
 */
(function () {
    var numeral;

    // get numeral from environment
    if (typeof window !== 'undefined' && this.numeral) {
        // Browser
        numeral = this.numeral;
    } else if (typeof module !== 'undefined' && module.exports) {
        // Node
        numeral = require('../numeral');
    }

    numeral.register('format', 'time', {
        regexps: {
            format: /(:)/
        },
        format: function(value, format, roundingFunction) {
            var hours = Math.floor(value / 60 / 60),
                minutes = Math.floor((value - (hours * 60 * 60)) / 60),
                seconds = Math.round(value - (hours * 60 * 60) - (minutes * 60));

            return hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
        }
    });
}());
