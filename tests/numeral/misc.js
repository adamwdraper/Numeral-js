// Node
if (typeof module !== 'undefined' && module.exports) {
    var numeral = require('../../numeral');
    var expect = require('chai').expect;
}

describe('Misc', function() {
    after(function() {
        numeral.reset();
    });

    describe('Add', function() {
        it('should return a value', function() {
            var tests = [
                [1000, 1000],
                [0.5, 0.5],
                [null, null],
                ['1,000', 1000],
                ['not a number', 0]
            ],
            num;

            for (var i = 0; i < tests.length; i++) {
                num = numeral(tests[i][0]);

                expect(num.value()).to.equal(tests[i][1]);
            }
        });
    });

    describe('Set', function() {
        it('should set a value', function() {
            var tests = [
                [1000,1000],
                [-0.25,-0.25]
            ],
            num;

            for (var i = 0; i < tests.length; i++) {
                num = numeral().set(tests[i][0]);

                expect(num.value()).to.equal(tests[i][1]);
            }
        });
    });

    describe('Custom Zero', function() {
        it('should change zero value', function() {
            var tests = [
                [0,'N/A','N/A'],
                [0,'','']
            ];

            for (var i = 0; i < tests.length; i++) {
                numeral.zeroFormat(tests[i][1]);

                expect(numeral(tests[i][0]).format('0')).to.equal(tests[i][2]);
            }
        });
    });

    describe('Custom Null', function() {
        it('should change null value', function() {
            var tests = [
                [null,'N/A','N/A'],
                [null,'','']
            ];

            for (var i = 0; i < tests.length; i++) {
                numeral.nullFormat(tests[i][1]);

                expect(numeral(tests[i][0]).format('0')).to.equal(tests[i][2]);
            }
        });
    });

    describe('Clone', function() {
        it('should clone', function() {
            var a = numeral(1000),
            b = numeral(a),
            c = a.clone(),
            aVal = a.value(),
            aSet = a.set(2000).value(),
            bVal = b.value(),
            cVal = c.add(10).value();

            expect(aVal).to.equal(1000);
            expect(aSet).to.equal(2000);
            expect(bVal).to.equal(1000);
            expect(cVal).to.equal(1010);
        });
    });

    describe('isNumeral', function() {
        it('should return boolean', function() {
            var tests = [
                [numeral(),true],
                [1,false]
            ];

            for (var i = 0; i < tests.length; i++) {
                expect(numeral.isNumeral(tests[i][0])).to.equal(tests[i][1]);
            }
        });
    });

    describe('Language Data', function() {
        it('should use custom language data', function() {
            var cOld = '$',
                cNew = '!',
                formatTestVal = function() {
                    return numeral('100').format('$0,0');
                },
                oldCurrencyVal = cOld + '100',
                newCurrencyVal = cNew + '100';

            expect(numeral.languageData().currency.symbol).to.equal(cOld);
            expect(numeral.languageData('en').currency.symbol).to.equal(cOld);

            numeral.languageData().currency.symbol = cNew;
            expect(numeral.languageData().currency.symbol).to.equal(cNew);
            expect(formatTestVal()).to.equal(newCurrencyVal);

            numeral.languageData().currency.symbol = cOld;
            expect(numeral.languageData().currency.symbol).to.equal('$');
            expect(formatTestVal()).to.equal(oldCurrencyVal);

            numeral.languageData('en').currency.symbol = cNew;
            expect(numeral.languageData().currency.symbol).to.equal(cNew);
            expect(formatTestVal()).to.equal(newCurrencyVal);

            numeral.languageData('en').currency.symbol = cOld;
            expect(numeral.languageData().currency.symbol).to.equal(cOld);
            expect(formatTestVal()).to.equal(oldCurrencyVal);
        });
    });
});
