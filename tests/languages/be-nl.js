module('Language: be-nl', {
    setup: function() {
        numeral.language('be-nl');
        numeral.zeroFormat(null);
    }
});

// Numbers -----------------------
test('Format Numbers', 22, function() {
    var tests = [
        [10000,'0,0.0000','10 000,0000'],
        [10000.23,'0,0','10 000'],
        [-10000,'0,0.0','-10 000,0'],
        [10000.1234,'0.000','10000,123'],
        [-10000,'(0,0.0000)','(10 000,0000)'],
        [-.23,'.00','-,23'],
        [-.23,'(.00)','(,23)'],
        [.23,'0.00000','0,23000'],
        [1230974,'0.0a','1,2 mln'],
        [1460,'0a','1k'],
        [-104000,'0a','-104k'],
        [0,'0o','0de'],
        [1,'0o','1ste'],
        [2,'0o','2de'],
        [8,'0o','8ste'],
        [19,'0o','19de'],
        [20,'0o','20ste'],
        [100,'0o','100ste'],
        [102,'0o','102de'],
        [108,'0o','108ste'],
        [109,'0o','109de'],
        [1,'0[.]0','1']
    ];

    for (var i = 0; i < tests.length; i++) {
        strictEqual(numeral(tests[i][0]).format(tests[i][1]), tests[i][2], tests[i][1]);
    }
});

// Currency -----------------------
test('Format Currency', 4, function() {
    var tests = [
        [1000.234,'$0,0.00','€ 1 000,23'],
        [-1000.234,'($0,0)','(€ 1 000)'],
        [-1000.234,'$0.00','-€ 1000,23'],
        [1230974,'($0.00a)','€ 1,23 mln']
    ];

    for (var i = 0; i < tests.length; i++) {
        strictEqual(numeral(tests[i][0]).format(tests[i][1]), tests[i][2], tests[i][1]);
    }
});

// Percentages -----------------------
test('Format Percentages', 4, function() {
    var tests = [
        [1,'0%','100%'],
        [.974878234,'0.000%','97,488%'],
        [-.43,'0%','-43%'],
        [.43,'(0.000%)','43,000%']
    ];

    for (var i = 0; i < tests.length; i++) {
        strictEqual(numeral(tests[i][0]).format(tests[i][1]), tests[i][2], tests[i][1]);
    }
});

// Unformat ------------------------
test('Unformat', 9, function() {
    var tests = [
        ['10 000,123',10000.123],
        ['(0,12345)',-.12345],
        ['(€ 1,23 mln)',-1230000],
        ['10k',10000],
        ['-10k',-10000],
        ['23e',23],
        ['€ 10 000,00',10000],
        ['-76%',-.76],
        ['2:23:57',8637]
    ];

    for (var i = 0; i < tests.length; i++) {
        strictEqual(numeral().unformat(tests[i][0]), tests[i][1], tests[i][0]);
    }
});
