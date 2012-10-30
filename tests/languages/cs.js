module('Language: cs', {
    setup: function() {
        numeral.language('cs');
    }
});

// Numbers -----------------------
test('Format Numbers', 15, function() {
    var tests = [
        [10000,'0,0.0000','10 000,0000'],
        [10000.23,'0,0','10 000'],
        [-10000,'0,0.0','-10 000,0'],
        [10000.1234,'0.000','10000,123'],
        [-10000,'(0,0.0000)','(10 000,0000)'],
        [-.23,'.00','-,23'],
        [-.23,'(.00)','(,23)'],
        [.23,'0.00000','0,23000'],
        [1230974,'0.0a','1,2 mil.'],
        [1460,'0a','1 tis.'],
        [-104000,'0a','-104 tis.'],
        [1,'0o','1.'],
        [52,'0o','52.'],
        [23,'0o','23.'],
        [100,'0o','100.']
    ];

    for (var i = 0; i < tests.length; i++) {
        strictEqual(numeral(tests[i][0]).format(tests[i][1]), tests[i][2], tests[i][1]);
    }
});

// Currency -----------------------
test('Format Currency', 4, function() {
    var tests = [
        [1000.234,'0,0.00$','1 000,23 Kč'],
        [-1000.234,'(0,0$)','(1 000 Kč)'],
        [-1000.234,'0.00$','-1000,23 Kč'],
        [1230974,'(0.00a$)','1,23 mil. Kč']
    ];

    for (var i = 0; i < tests.length; i++) {
        strictEqual(numeral(tests[i][0]).format(tests[i][1]), tests[i][2], tests[i][1]);
    }
})

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
test('Unformat', 10, function() {
    var tests = [
        ['10 000,123',10000.123],
        ['(0,12345)',-.12345],
        ['(1,23 mil. Kč)',-1230000],
        ['1,23 mil. Kč',1230000],
        ['10 tis.',10000],
        ['-10 tis.',-10000],
        ['23.',23],
        ['10 000,00 Kč',10000],
        ['-76%',-.76],
        ['2:23:57',8637]
    ];

    for (var i = 0; i < tests.length; i++) {
        strictEqual(numeral().unformat(tests[i][0]), tests[i][1], tests[i][0]);
    }
});
