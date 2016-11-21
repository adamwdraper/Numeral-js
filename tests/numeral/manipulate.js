// Node
if (typeof module !== 'undefined' && module.exports) {
    var numeral = require('../../numeral');
    var expect = require('chai').expect;
}

describe('Manipulate', function() {
    after(function() {
        numeral.reset();
    });

    describe('Add', function() {
        it('should add', function() {
            var tests = [
                    [1000,10,1010],
                    [0.5,3,3.5],
                    [-100,200,100],
                    [0.1,0.2,0.3]
                ],
                num;

            for (var i = 0; i < tests.length; i++) {
                num = numeral(tests[i][0]);

                num.add(tests[i][1]);

                expect(num.value()).to.equal(tests[i][2]);
            }
        });
    });

    describe('Subtract', function() {
        it('should subtract', function() {
            var tests = [
                    [1000,10,990],
                    [0.5,3,-2.5],
                    [-100,200,-300],
                    [0.3,0.1,0.2]
                ],
                num;

            for (var i = 0; i < tests.length; i++) {
                num = numeral(tests[i][0]);

                num.subtract(tests[i][1]);

                expect(num.value()).to.equal(tests[i][2]);
            }
        });
    });


    describe('Add', function() {
        it('should add', function() {
        });
    });


    describe('Multiply', function() {
        it('should multiply', function() {
            var tests = [
                    [1000,10,10000],
                    [0.5,3,1.5],
                    [-100,200,-20000],
                    [0.1,0.2,0.02]
                ],
                num;

            for (var i = 0; i < tests.length; i++) {
                num = numeral(tests[i][0]);

                num.multiply(tests[i][1]);

                expect(num.value()).to.equal(tests[i][2]);
            }
        });
    });

    describe('Divide', function() {
        it('should divide', function() {
            var tests = [
                    [1000,10,100],
                    [0.5,3,0.16666666666666666],
                    [-100,200,-0.5],
                    [5.3,0.1,53]
                ],
                num;

            for (var i = 0; i < tests.length; i++) {
                num = numeral(tests[i][0]);

                num.divide(tests[i][1]);

                expect(num.value()).to.equal(tests[i][2]);
            }
        });
    });

    describe('Difference', function() {
        it('should find a difference', function() {
            var tests = [
                [1000,10,990],
                [0.5,3,2.5],
                [-100,200,300],
                [0.3,0.2,0.1]
            ],
            num;

            for (var i = 0; i < tests.length; i++) {
                num = numeral(tests[i][0]);

                expect(num.difference(tests[i][1])).to.equal(tests[i][2]);
            }
        });
    });
});
