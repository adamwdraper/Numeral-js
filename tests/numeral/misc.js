// Node
if (typeof module !== 'undefined' && module.exports) {
    var numeral = require('../../src/numeral');
    var expect = require('chai').expect;
}

describe('Misc', function() {
    after(function() {
        numeral.reset();
    });

    describe('Locale Data', function() {
        it('should use custom locale data', function() {
            var cOld = '$',
                cNew = '!',
                formatTestVal = function() {
                    return numeral('100').format('$0,0');
                },
                oldCurrencyVal = cOld + '100',
                newCurrencyVal = cNew + '100';

            expect(numeral.localeData().currency.symbol).to.equal(cOld);
            expect(numeral.localeData('en').currency.symbol).to.equal(cOld);

            numeral.localeData().currency.symbol = cNew;
            expect(numeral.localeData().currency.symbol).to.equal(cNew);
            expect(formatTestVal()).to.equal(newCurrencyVal);

            numeral.localeData().currency.symbol = cOld;
            expect(numeral.localeData().currency.symbol).to.equal('$');
            expect(formatTestVal()).to.equal(oldCurrencyVal);

            numeral.localeData('en').currency.symbol = cNew;
            expect(numeral.localeData().currency.symbol).to.equal(cNew);
            expect(formatTestVal()).to.equal(newCurrencyVal);

            numeral.localeData('en').currency.symbol = cOld;
            expect(numeral.localeData().currency.symbol).to.equal(cOld);
            expect(formatTestVal()).to.equal(oldCurrencyVal);
        });

        it('should key properly on custom locale data', function () {
            var customformat = {
                    format: '0,0.00 $',
                    currency: {
                        symbol: '^'
                    }
                };

            numeral.locale('en-XX', customformat);

            expect(numeral.localeData('en-XX').format).to.equal('0,0.00 $');
            expect(numeral.localeData('en-XX').currency.symbol).to.equal('^');

            expect(numeral.localeData('en-xx').format).to.equal('0,0.00 $');
            expect(numeral.localeData('en-xx').currency.symbol).to.equal('^');
        });
    });
});
