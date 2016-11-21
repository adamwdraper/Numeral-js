// Node
if (typeof module !== 'undefined' && module.exports) {
    var numeral = require('../../numeral');
    var expect = require('chai').expect;
}

describe('Unformat', function() {
    beforeEach(function() {
        numeral.zeroFormat('N/A');

        numeral.nullFormat('N/A');
    });

    after(function() {
        numeral.reset();
    });

    describe('Numbers', function() {
        it('should unformat a number', function() {
            var tests = [
                ['10,000.123', 10000.123],
                ['(0.12345)', -0.12345],
                ['((--0.12345))', 0.12345],
                ['23rd', 23],
                ['31st', 31],
                ['1.23t', 1230000000000],
                ['N/A', 0],
                [null, 0],
                ['', 0],
                // Pass Through for Numbers
                [0, 0],
                [1, 1],
                [1.1, 1.1],
                [-0, 0],
                [-1, -1],
                [-1.1, -1.1]
            ];

            for (var i = 0; i < tests.length; i++) {
                expect(numeral().unformat(tests[i][0])).to.equal(tests[i][1]);
            }
        });
    });

    describe('Currency', function() {
        it('should unformat currency', function() {
            var tests = [
                ['($1.23m)', -1230000],
                ['$ 10,000.00', 10000]
            ];

            for (var i = 0; i < tests.length; i++) {
                expect(numeral().unformat(tests[i][0])).to.equal(tests[i][1]);
            }
        });
    });

    describe('Bytes', function() {
        it('should unformat bytes', function() {
            var tests = [
                ['100B', 100],
                ['3.154 TiB', 3467859674006],
                ['3.154 TB', 3467859674006]
            ];

            for (var i = 0; i < tests.length; i++) {
                expect(numeral().unformat(tests[i][0])).to.equal(tests[i][1]);
            }
        });
    });

    describe('Percentages', function() {
        it('should unformat percentages', function() {
            var tests = [
                ['-76%', -0.76]
            ];

            for (var i = 0; i < tests.length; i++) {
                expect(numeral().unformat(tests[i][0])).to.equal(tests[i][1]);
            }
        });
    });

    describe('Time', function() {
        it('should unformat time', function() {
            var tests = [
                ['2:23:57', 8637]
            ];

            for (var i = 0; i < tests.length; i++) {
                expect(numeral().unformat(tests[i][0])).to.equal(tests[i][1]);
            }
        });
    });
});
