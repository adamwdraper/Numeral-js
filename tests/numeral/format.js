
// Node
if (typeof module !== 'undefined' && module.exports) {
    var numeral = require('../../numeral');
    var expect = require('chai').expect;
}

describe('Format', function() {
    after(function() {
        numeral.reset();
    });

    describe('Default', function() {
        it('should set a default format', function() {
            numeral.defaultFormat('0,0');

            expect(numeral(10000).format()).to.equal('10,000');
        });
    });

    describe('Value', function() {
        it('should return a value', function() {
            var tests = [
                    '0,0.00',
                    '$0,0.00',
                    '0b',
                    '0,0%',
                    '00:00:00'
                ],
                value = 12345.6,
                n = numeral(value),
                format,
                test;

            for (i = 0; i < tests.length; i++) {
                format = n.format(tests[i]);

                expect(n.value()).to.equal(value);
            }
        });
    });

    describe('Numbers', function() {
        it('should format to a number', function() {
            var tests = [
                    [10000,'0,0.0000','10,000.0000'],
                    [10000.23,'0,0','10,000'],
                    [-10000,'0,0.0','-10,000.0'],
                    [10000.1234,'0.000','10000.123'],
                    [10000,'0[.]00','10000'],
                    [10000.1,'0[.]00','10000.10'],
                    [10000.123,'0[.]00','10000.12'],
                    [10000.456,'0[.]00','10000.46'],
                    [10000.001,'0[.]00','10000'],
                    [10000.45,'0[.]00[0]','10000.45'],
                    [10000.456,'0[.]00[0]','10000.456'],
                    [-10000,'(0,0.0000)','(10,000.0000)'],
                    [-12300,'+0,0.0000','-12,300.0000'],
                    [1230,'+0,0','+1,230'],
                    [100.78, '0', '101'],
                    [100.28, '0', '100'],
                    [1.932,'0.0','1.9'],
                    [1.9687,'0','2'],
                    [1.9687,'0.0','2.0'],
                    [-0.23,'.00','-.23'],
                    [-0.23,'(.00)','(.23)'],
                    [0.23,'0.00000','0.23000'],
                    [0.67,'0.0[0000]','0.67'],
                    [3162.63,'0.0[00000000000000]','3162.63'],
                    [1.99,'0.[0]','2'],
                    [1.0501,'0.00[0]','1.05'],
                    [2000000000,'0.0a','2.0b'],
                    [1230974,'0.0a','1.2m'],
                    [1460,'0a','1k'],
                    [-104000,'0 a','-104 k'],
                    [1,'0o','1st'],
                    [52,'0 o','52 nd'],
                    [23,'0o','23rd'],
                    [100,'0o','100th'],

                    // specified abbreviations
                    [-5444333222111, '0,0 aK', '-5,444,333,222 k'],
                    [-5444333222111, '0,0 aM', '-5,444,333 m'],
                    [-5444333222111, '0,0 aB', '-5,444 b'],
                    [-5444333222111, '0,0 aT', '-5 t'],
                    [123456, '0.0[0] aK', '123.46 k']
                ],
                i;

            for (i = 0; i < tests.length; i++) {
                expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
            }
        });
    });

    describe('Currency', function() {
        it('should format to currency', function() {
            var tests = [
                    [1000.234,'$0,0.00','$1,000.23'],
                    [1001,'$ 0,0.[00]','$ 1,001'],
                    [1000.234,'0,0.00 $','1,000.23 $'],
                    [-1000.234,'($0,0)','($1,000)'],
                    [-1000.234,'(0,0$)','(1,000$)'],
                    [-1000.234,'$0.00','-$1000.23'],
                    [1230974,'($0.00 a)','$1.23 m'],

                    // test symbol position before negative sign / open parens
                    [-1000.234,'$ (0,0)','$ (1,000)'],
                    [-1000.234,'$(0,0)','$(1,000)'],
                    [-1000.234,'$ (0,0.00)','$ (1,000.23)'],
                    [-1000.234,'$(0,0.00)','$(1,000.23)'],
                    [-1000.238,'$(0,0.00)','$(1,000.24)'],
                    [-1000.234,'$-0,0','$-1,000'],
                    [-1000.234,'$ -0,0','$ -1,000'],

                    [1000.234,'$ (0,0)','$ 1,000'],
                    [1000.234,'$(0,0)','$1,000'],
                    [1000.234,'$ (0,0.00)','$ 1,000.23'],
                    [1000.234,'$(0,0.00)','$1,000.23'],
                    [1000.238,'$(0,0.00)','$1,000.24'],
                    [1000.234,'$-0,0)','$1,000'],
                    [1000.234,'$ -0,0','$ 1,000']
                ],
                i;

            for (i = 0; i < tests.length; i++) {
                expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
            }
        });
    });

    describe('Bytes', function() {
        it('should format to bytes', function() {
            var tests = [
                    [100,'0b','100B'],
                    [1024*2,'0 ib','2 KiB'],
                    [1024*1024*5,'0ib','5MiB'],
                    [1024*1024*1024*7.343,'0.[0] ib','7.3 GiB'],
                    [1024*1024*1024*1024*3.1536544,'0.000ib','3.154TiB'],
                    [1024*1024*1024*1024*1024*2.953454534534,'0ib','3PiB'],
                    [1024*2,'0 b','2 KB'],
                    [1024*1024*5,'0b','5MB'],
                    [1024*1024*1024*7.343,'0.[0] b','7.3 GB'],
                    [1024*1024*1024*1024*3.1536544,'0.000b','3.154TB'],
                    [1024*1024*1024*1024*1024*2.953454534534,'0b','3PB']
                ],
                i;

            for (i = 0; i < tests.length; i++) {
                expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
            }
        });
    });

    describe('Percentages', function() {
        it('should format to percentages', function() {
            var tests = [
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
    });

    describe('Times', function() {
        it('should format to times', function() {
            var tests = [
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
