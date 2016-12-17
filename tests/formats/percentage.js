
// Node
if (typeof module !== 'undefined' && module.exports) {
    var numeral = require('../../numeral');
    var expect = require('chai').expect;
}

describe('Percentage', function() {
    after(function() {
        numeral.reset();
    });

    it('should format to percentages', function() {
        var tests = [
                [0,'0%','0%'],
                [null,'0 %','0 %'],
                [1,'0%','100%'],
                [0.974878234,'0.000%','97.488%'],
                [-0.43,'0 %','-43 %'],
                [0.43,'(0.00[0]%)','43.00%']
            ],
            i;

        for (i = 0; i < tests.length; i++) {
            expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
        }
    });

    it('should unformat to percentages', function() {
        var tests = [
                ['0%', 0],
                ['100%', 1],
                ['97.488%', 0.97488],
                ['-43 %', -0.43],
                ['43.00%', 0.43]
            ],
            i;

        for (i = 0; i < tests.length; i++) {
            expect(numeral(tests[i][0]).value()).to.equal(tests[i][1]);
        }
    });
});
