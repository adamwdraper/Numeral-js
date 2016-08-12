var numeral = require('../../numeral');

exports.format = {
    default: function (test) {
        test.expect(1);

        numeral.defaultFormat('0,0');

        test.strictEqual(numeral(10000).format(), '10,000', '0.0');

        test.done();
    },
    value: function (test) {
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
            i;

        test.expect(test.length);
        
        for (i = 0; i < tests.length; i++) {
            format = n.format(test[i]);
            test.strictEqual(n.value(), value, 'value unchanged after format' + test[i]);
        }

        test.done();
    },
    numbers: function (test) {
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
                [-5444333222111, '0,0 aT', '-5 t']
            ],
            i;

        test.expect(tests.length);

        for (i = 0; i < tests.length; i++) {
            test.strictEqual(numeral(tests[i][0]).format(tests[i][1]), tests[i][2], tests[i][1]);
        }

        test.done();
    },

    currency: function (test) {
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

        test.expect(tests.length);

        for (i = 0; i < tests.length; i++) {
            test.strictEqual(numeral(tests[i][0]).format(tests[i][1]), tests[i][2], tests[i][1]);
        }

        test.done();
    },

    bytes: function (test) {
        var tests = [
                [100,'0b','100B'],
                [1024*2,'0 b','2 KB'],
                [1024*1024*5,'0b','5MB'],
                [1024*1024*1024*7.343,'0.[0] b','7.3 GB'],
                [1024*1024*1024*1024*3.1536544,'0.000b','3.154TB'],
                [1024*1024*1024*1024*1024*2.953454534534,'0b','3PB']
            ],
            i;

        test.expect(tests.length);

        for (i = 0; i < tests.length; i++) {
            test.strictEqual(numeral(tests[i][0]).format(tests[i][1]), tests[i][2], tests[i][1]);
        }

        test.done();
    },

    siprefix: function (test) {
        var tests = [
                [0.1,'0s','100m'],
                [0.0001,'0s','100µ'],
                [0.0000001,'0s','100n'],
                [0.0000000001,'0s','100p'],
                [0.000000000001,'0s','1p'],
                [1,'0s','1'],
                [1000,'0s','1k'],
                [1000000,'0s','1M'],
                [1000000000,'0s','1G'],
                [1000000000000,'0s','1T'],
                [1000000000000000,'0s','1P'],
                [1000000000000000000,'0s','1000P'],
                [1000,'0[.]0 s','1 k'],
                [1200,'0[.]0 s','1.2 k'],
                [1200,'0 s','1 k'],
                [1200,'0.000 s','1.200 k'],
                [3454631,'0.0s','3.5M'],
                [0.004321,'0.0sm','4.3m'],
                [0.004321,'0.0 sm','4.3 m'],
                [0.0001,'0 su','100 µ'],
				[1532424114, '0,0.00 sM', '1,532.42 M'],
				[1532424114, '0.00[00] sG', '1.5324 G'],
				[1532424114, '0.000 sT', '0.002 T'],
            ],
            i;

        test.expect(tests.length);

        for (i = 0; i < tests.length; i++) {
            test.strictEqual(numeral(tests[i][0]).format(tests[i][1]), tests[i][2], tests[i][1]);
        }

        test.done();
    },

    percentages: function (test) {
        var tests = [
                [1,'0%','100%'],
                [0.974878234,'0.000%','97.488%'],
                [-0.43,'0 %','-43 %'],
                [0.43,'(0.00[0]%)','43.00%']
            ],
            i;

        test.expect(tests.length);

        for (i = 0; i < tests.length; i++) {
            test.strictEqual(numeral(tests[i][0]).format(tests[i][1]), tests[i][2], tests[i][1]);
        }

        test.done();
    },

    times: function (test) {
        var tests = [
                [25,'00:00:00','0:00:25'],
                [238,'00:00:00','0:03:58'],
                [63846,'00:00:00','17:44:06']
            ],
            i;

        test.expect(tests.length);

        for (i = 0; i < tests.length; i++) {
            test.strictEqual(numeral(tests[i][0]).format(tests[i][1]), tests[i][2], tests[i][1]);
        }

        test.done();
    },
    
    rounding: function (test) {
      var tests = [
            // value, format string, expected w/ floor, expected w/ ceil
            [2280002, '0.00a', '2.28m', '2.29m'],
            [10000.23,'0,0','10,000', '10,001'],
            [1000.234,'$0,0.00','$1,000.23', '$1,000.24'],
            [0.974878234,'0.000%','97.487%','97.488%'],
            [-0.433,'0 %','-44 %', '-43 %']
        ],
        i;
      
      test.expect(tests.length * 2);
      
      for (i = 0; i < tests.length; i++) {
          // floor
          test.strictEqual(numeral(tests[i][0]).format(tests[i][1], Math.floor), tests[i][2], tests[i][1] + ", floor");
          
          // ceil
          test.strictEqual(numeral(tests[i][0]).format(tests[i][1], Math.ceil), tests[i][3], tests[i][1] + ", ceil"); 
         
      }
      
      test.done();
      
    },
};
