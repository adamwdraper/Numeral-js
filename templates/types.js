/*! @preserve
 * numeral.js
 * <%= type %> : 3.0.0
 * license : MIT
 * http://adamwdraper.github.com/Numeral-js/
 */

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('./numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    <%= content %>
}));
