var numeral = require('../../numeral'),
    language = require('../../languages/id');

numeral.language('id', language);

exports['language:id'] = {
    setUp: function (callback) {
        numeral.language('id');
        callback();
    },

    tearDown: function (callback) {
        numeral.language('en');
        callback();
    },

    format: function (test) {
        test.expect(16);

        var tests = [
            [10000,'0,0.0000','10.000,0000'],
            [10000.23,'0,0','10.000'],
            [-10000,'0,0.0','-10.000,0'],
            [10000.1234,'0.000','10000,123'],
            [-10000,'(0,0.0000)','(10.000,0000)'],
            [-0.23,'.00','-,23'],
            [-0.23,'(.00)','(,23)'],
            [0.23,'0.00000','0,23000'],
            [1230974,'0.0a','1,2 miliar'],
            [1460,'0a','seribu'],
            [-104000,'0a','-104 ribu'],
            [1,'0o','1º'],
            [52,'0o','52º'],
            [23,'0o','23º'],
            [100,'0o','100º'],
            [1,'0[.]0','1']
        ];

        for (var i = 0; i < tests.length; i++) {
            test.strictEqual(numeral(tests[i][0]).format(tests[i][1]), tests[i][2], tests[i][1]);
        }

        test.done();
    },

    currency: function (test) {
        test.expect(4);

        var tests = [
            [1000.234,'Rp 0,0.00','Rp 1.000,23'],
            [-1000.234,'(Rp 0,0)','(Rp 1.000)'],
            [-1000.234,'Rp0.00','-Rp 1000,23'],
            [1230974,'(Rp 0.00a)','Rp 1,23 miliar']
        ];

        for (var i = 0; i < tests.length; i++) {
            test.strictEqual(numeral(tests[i][0]).format(tests[i][1]), tests[i][2], tests[i][1]);
        }

        test.done();
    },

    percentages: function (test) {
        test.expect(4);

        var tests = [
            [1,'0%','100%'],
            [0.974878234,'0.000%','97,488%'],
            [-0.43,'0%','-43%'],
            [0.43,'(0.000%)','43,000%']
        ];

        for (var i = 0; i < tests.length; i++) {
            test.strictEqual(numeral(tests[i][0]).format(tests[i][1]), tests[i][2], tests[i][1]);
        }

        test.done();
    },

    unformat: function (test) {
        test.expect(9);

        var tests = [
            ['10.000,123',10000.123],
            ['(0,12345)',-0.12345],
            ['(€1,23 miliar)',-1230000],
            ['10 ribu',10000],
            ['-10 ribu',-10000],
            ['23º',23],
            ['Rp 10.000,00',10000],
            ['-76%',-0.76],
            ['2:23:57',8637]
        ];

        for (var i = 0; i < tests.length; i++) {
            test.strictEqual(numeral().unformat(tests[i][0]), tests[i][1], tests[i][0]);
        }

        test.done();
    }
};
