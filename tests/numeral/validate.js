// Node
if (typeof module !== 'undefined' && module.exports) {
    var numeral = require('../../numeral');
    var expect = require('chai').expect;
}

describe('Validate', function() {
    var language = 'en';

    after(function() {
        numeral.reset();
    });

    describe('Numbers', function() {
        it('should validate numbers', function() {
            var tests = [
                ['1000', true],
                ['1,000', true],
                ['10,0,0', true],
                ['10.123', true],
                ['1,000.123', true],
                ['1000,123.123', true],
                ['1000 ', true],
                [' 1000 ', true],
                [' 1000', true],
                [' 1000,100.123', true],
                ['1.0,00', false],
                ['1.0.00', false],
                ['1 000', false],
                ['1.000,123', false],
                ['1000.', false],
                ['1000,', false],
                ['10..00', false],
                ['10,,00', false],
                ['10, 00', false]
            ];

            for (var i = 0; i < tests.length; i++) {
                expect(numeral.validate(tests[i][0], language)).to.equal(tests[i][1]);
            }
        });
    });
    describe('Currency', function() {
        it('should validate currency', function() {
            var tests = [
                ['$1000', true],
                ['$1,000', true],
                ['$10,0,0', true],
                ['$10.123', true],
                ['$1,000.123', true],
                ['$1000 ', true],
                [' $1000 ', true],
                [' $1000', true],
                [' $1000,100.123', true],
                ['$100.123k', true],
                ['$100.123m', true],
                ['$100.123b', true],
                ['$100.123t', true],
                ['100,456.123k', true],
                [' 100,456.123t ', true],
                ['$1,00.123k', true],
                ['%100', false],
                [' %1.0.00', false],
                [' ^1 000 ', false],
                ['^1.000 ', false],
                ['$ 1000.', false],
                ['%1000', false],
                ['100,456.123z', false],
                ['$100$', false],
                ['$100,213.456l', false],
                ['aa100,213.456l', false],
                ['$100,213.456kk', false]
            ];

            for (var i = 0; i < tests.length; i++) {
                expect(numeral.validate(tests[i][0], language)).to.equal(tests[i][1]);
            }
        });
    });
});
