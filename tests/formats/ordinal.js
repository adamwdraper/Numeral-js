
// Node
if (typeof module !== 'undefined' && module.exports) {
    var numeral = require('../../src/numeral');
    var format = require('../../src/formats/ordinal');
    var expect = require('chai').expect;
}

describe('Ordinal', function() {
    after(function() {
        numeral.reset();
    });

    it('should format to an ordinal', function() {
        var tests = [
                [1,'0o','1st'],
                [52,'0 o','52 nd'],
                [23,'0o','23rd'],
                [100,'0o','100th'],
                [1234,'0,0o','1,234th']
            ],
            i,
            n,
            output;

        for (i = 0; i < tests.length; i++) {
            n = numeral(tests[i][0]);
            output = n.format(tests[i][1]);

            expect(output).to.equal(tests[i][2]);

            expect(typeof output).to.equal('string');
        }
    });
});
