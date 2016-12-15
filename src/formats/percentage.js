/*
 * numeral.js format configuration
 * format : percentage
 * author : Adam Draper : https://github.com/adamwdraper
 */

import numeral from '../numeral';

numeral.register('format', 'percentage', {
    regexps: {
        format: /(%)/,
        unformat: /(%)/
    },
    format(value, format, roundingFunction) {
        var space = numeral._.includes(format, ' %') ? ' ' : '',
            output;

        value = value * 100;

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
    unformat(string) {
        return numeral._.stringToNumber(string) * 0.01;
    }
});
