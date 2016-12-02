
// Node
if (typeof module !== 'undefined' && module.exports) {
    var numeral = require('../../src/core');
    var expect = require('chai').expect;
}

describe('Format', function() {
    after(function() {
        numeral.reset();
    });

    // describe('Default', function() {
    //     it('should set a default format', function() {
    //         numeral.defaultFormat('0,0');
    //
    //         expect(numeral(10000).format()).to.equal('10,000');
    //     });
    // });
    //
    describe('Numbers', function() {
        it('should format to a number', function() {
            var tests = [
                    [0, null, '0'],
                    [0, '0.00', '0.00'],
                    [null, null, '0'],
                    [NaN, '0.0', '0.0'],
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
                    // abbreviations
                    [2000000000,'0.0a','2.0b'],
                    [1230974,'0.0a','1.2m'],
                    [1460,'0a','1k'],
                    [-104000,'0 a','-104 k'],
                    // forced abbreviations
                    [-5444333222111, '0,0 ak', '-5,444,333,222 k'],
                    [5444333222111, '0,0 am', '5,444,333 m'],
                    [-5444333222111, '0,0 ab', '-5,444 b'],
                    [-5444333222111, '0,0 at', '-5 t'],
                    [123456, '0.0[0] ak', '123.46 k'],
                    [150,'0.0 ak','0.2 k']
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
    describe('Ordinals', function() {
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

    describe('Currency', function() {
        it('should format to currency', function() {
            var tests = [
                    [0,'$0.00','$0.00'],
                    [null,'$0.00','$0.00'],
                    [0.99,'$0,0.00','$0.99'],
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
            var decimal = 1000;
            var binary = 1024;
            var tests = [
                    [0,'0b','0B'],
                    [null,'0 b','0 B'],
                    [100,'0b','100B'],
                    [binary * 2,'0 ib','2 KiB'],
                    [Math.pow(binary, 2) * 5,'0ib','5MiB'],
                    [Math.pow(binary, 3) * 7.343,'0.[0] ib','7.3 GiB'],
                    [Math.pow(binary, 4) * 3.1536544,'0.000ib','3.154TiB'],
                    [Math.pow(binary, 5) * 2.953454534534,'0ib','3PiB'],
                    [decimal * 2,'0 b','2 KB'],
                    [Math.pow(decimal, 2) * 5,'0b','5MB'],
                    [Math.pow(decimal, 3) * 7.343,'0.[0] b','7.3 GB'],
                    [Math.pow(decimal, 4) * 3.1536544,'0.000b','3.154TB'],
                    [Math.pow(decimal, 5) * 2.953454534534,'0b','3PB']
                ],
                i;

            for (i = 0; i < tests.length; i++) {
                expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
            }
        });
    });

    describe('Percentages', function() {
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

    describe('Exponential', function() {
        it('should format to exponential notation', function() {
            var tests = [
                    [0,'0e+0','0e+0'],
                    [null,'0e+0','0e+0'],
                    [1,'0e+0','1e+0'],
                    [77.1234,'0.0e+0','7.7e+1'],
                    [0.000000771234,'0.0e-0','7.7e-7'],
                    [-0.000000771234,'0.00e-0','-7.71e-7'],
                    [77.1234,'0.000e+0','7.712e+1'],
                    [-1000830298,'0.0[000]e+0','-1.0008e+9']
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
