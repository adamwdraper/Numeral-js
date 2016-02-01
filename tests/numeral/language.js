var numeral = require('../../numeral');
var frenchLanguage = require('../../languages/fr');

exports.language = {
    setUp: function (callback) {
        // load French language into the numeral js language store, ooh la la
        numeral.language('fr', frenchLanguage);
        callback();
    },
    default: function (test) {
        var tests = [
                [1000.234,'$0,0.00','$1,000.23'],
                [1001,'$ 0,0.[00]','$ 1,001'],
                [-1000.238,'$(0,0.00)','$(1,000.24)'],
                [-1000.234,'$-0,0','$-1,000'],
                [1000.238,'$(0,0.00)','$1,000.24'],
                [1000.234,'$-0,0)','$1,000'],
                [1000.234,'$ -0,0','$ 1,000']
            ];

        test.expect(tests.length);

        for (var i = 0; i < tests.length; i++) {
            test.strictEqual(numeral(tests[i][0]).format(tests[i][1]), tests[i][2], tests[i][1]);
        }

        test.done();
    },
    language: function (test) {
        // tests taken from french language test cases
        var frenchTests = [
              [10000,'0,0.0000','10 000,0000'],
              [10000.23,'0,0','10 000'],
              [-10000,'0,0.0','-10 000,0'],
              [10000.1234,'0.000','10000,123'],
              [-10000,'(0,0.0000)','(10 000,0000)'],
              [-0.23,'.00','-,23'],
              [-0.23,'(.00)','(,23)'],
              [0.23,'0.00000','0,23000'],
              [1230974,'0.0a','1,2m'],
              [1460,'0a','1k'],
              [-104000,'0a','-104k'],
              [1,'0o','1er'],
              [52,'0o','52e'],
              [23,'0o','23e'],
              [100,'0o','100e'],
              [1,'0[.]0','1']
            ],
            baseTests = [
              [1000.234,'$0,0.00','$1,000.23']
            ],
            lang = 'fr';

        test.expect(frenchTests.length + baseTests.length);

        // run tests using the `language` function exposed on the numeral object
        for (var i = 0; i < frenchTests.length; i++) {
            test.strictEqual(numeral(frenchTests[i][0]).language(lang).format(frenchTests[i][1]), frenchTests[i][2], frenchTests[i][1]);
        }

        // re-test formatting without calling the `language` method to ensure it is not being set globally
        for (var i = 0; i < baseTests.length; i++) {
            test.strictEqual(numeral(baseTests[i][0]).format(baseTests[i][1]), baseTests[i][2], baseTests[i][1]);
        }

        test.done();
    },
    expectedErrors : function (test) {
        // should throw error if consumer attempts to use a language which hasn't been loaded
        test.throws(function () {
            numeral(500).language('en-pl').format('$0,0.00');
        });

        // should throw error if the consumer attempts to call the `language` without providing a key
        test.throws(function () {
            numeral(500).language().format('$0,0.00');
        });

        test.done();
    }
};
