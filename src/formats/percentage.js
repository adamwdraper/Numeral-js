// numeral.js format configuration
// format : percentage
// author : Adam Draper : https://github.com/adamwdraper

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    numeral.register('format', 'percentage', {
        regexps: {
            format: /(%)/,
            unformat: /(%)/
        },
        format: function(value, format, roundingFunction) {
            var space = numeral._.includes(format, ' %') ? ' ' : '',
                output;

            if (numeral.options.scalePercentBy100) {
                if (value === null) {
                    value = 0;
                }
                var newvalue = value * 100;
                var strvalue = value.toString(); 
                var strnewval = newvalue.toString();
                var isDot = false;

                for(var i = 0; i < strvalue.length; i++) {
                    if (strvalue[i] === '.') {
                        isDot = true;
                        break;
                    }
                }

                // check for js roundoff error
                if ((isDot && strvalue.length === strnewval.length) || (strnewval.length === strvalue.length + 2) || (strnewval.length === strvalue.length + 1)){
                    value = newvalue;
                } else { // there is a roundoff error
                    value = newvalue.toFixed(strvalue.length-i);
                }

            }

            // check for space before %
            format = format.replace(/\s?\%/, '');

            output = numeral._.numberToFormat(value, format, roundingFunction);

            if (numeral._.includes(output, ')')) {
                output = output.split('');

                output.splice(-1, 0, space + '%');

                output = output.join('');
            } else {
                output = output + space + '%';
            }

            return output;
        },
        unformat: function(string) {
            var number = numeral._.stringToNumber(string);
            if (numeral.options.scalePercentBy100) {
                return number * 0.01;
            }
            return number;
        }
    });
}));
