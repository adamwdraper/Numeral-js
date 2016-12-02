
// Node
if (typeof module !== 'undefined' && module.exports) {
    var numeral = require('../../src/core');
    var expect = require('chai').expect;
}

describe('Format', function() {
    after(function() {
        numeral.reset();
    });

    describe('Times', function() {
        it('should format to times', function() {
            var tests = [
                    [0,'00:00:00','0:00:00'],
                    [null,'00:00:00','0:00:00'],
                    [25,'00:00:00','0:00:25'],
                    [238,'00:00:00','0:03:58'],
                    [63846,'00:00:00','17:44:06']
                ],
                i;

            for (i = 0; i < tests.length; i++) {
                expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
            }

        });
    });

    describe('Rounding', function() {
        it('should format with rounding', function() {
            var tests = [
                    // value, format string, expected w/ floor, expected w/ ceil
                    [2280002, '0.00a', '2.28m', '2.29m'],
                    [10000.23,'0,0','10,000', '10,001'],
                    [1000.234,'$0,0.00','$1,000.23', '$1,000.24'],
                    [0.974878234,'0.000%','97.487%','97.488%'],
                    [-0.433,'0 %','-44 %', '-43 %']
                ],
                i;

            for (i = 0; i < tests.length; i++) {
                // floor
                expect(numeral(tests[i][0]).format(tests[i][1], Math.floor)).to.equal(tests[i][2]);

                // ceil
                expect(numeral(tests[i][0]).format(tests[i][1], Math.ceil)).to.equal(tests[i][3]);
            }
        });
    });
});
