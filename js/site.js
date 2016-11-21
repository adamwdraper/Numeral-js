$(function() {
    $('#language-select').on('change', function() {
        updateFormats();
    });

    addVersion();

    updateFormats();
});

function addVersion () {
    $('#version').text(numeral.version);
}

function updateFormats () {
    // get language
    numeral.language($('#language-select').val());

    formatNumbers();
    formatCurrency();
    formatBytes();
    formatPercentage();
    formatTime();
    unformatAll();
    manipulate();
}

function formatNumbers () {
    // remove old rows
    var html = '',
        $body = $('#format-numbers tbody'),
        nums = [
            10000,
            10000.23,
            10000.23,
            -10000,
            10000.1234,
            10000.1234,
            -10000,
            -0.23,
            -0.23,
            0.23,
            0.23,
            1230974,
            1460,
            -104000,
            1,
            52,
            23,
            100
        ],
        formats = [
            '0,0.0000',
            '0,0',
            '+0,0',
            '0,0.0',
            '0.000',
            '0[.]00000',
            '(0,0.0000)',
            '.00',
            '(.00)',
            '0.00000',
            '0.0[0000]',
            '0.0a',
            '0 a',
            '0a',
            '0o',
            '0o',
            '0o',
            '0o'
        ];

    for (var i = 0; i < nums.length; i++) {
        html += '<tr><td>' + nums[i] + '</td><td>\'' + formats[i] + '\'</td><td>' + numeral(nums[i]).format(formats[i]) + '</td></tr>';
    }

    $body.empty().html(html);
}

function formatCurrency () {
    var html = '',
        $body = $('#format-currency tbody'),
        nums = [
            1000.234,
            1000.20,
            1001,
            -1000.234,
            -1000.234,
            1230974
        ],
        formats = [
            '$0,0.00',
            '0,0[.]00 $',
            '$ 0,0[.]00',
            '($0,0)',
            '$0.00',
            '($ 0.00 a)'
        ];

    for (var i = 0; i < nums.length; i++) {
        html += '<tr><td>' + nums[i] + '</td><td>\'' + formats[i] + '\'</td><td>' + numeral(nums[i]).format(formats[i]) + '</td></tr>';
    }

    $body.empty().html(html);
}

function formatBytes () {
    var html = '',
        $body = $('#format-bytes tbody'),
        nums = [
            100,
            1024,
            1024*2,
            1024*3,
            7884486213,
            3467479682787
        ],
        formats = [
            '0b',
            '0b',
            '0 ib',
            '0.0 b',
            '0.00b',
            '0.000 ib'
        ];

    for (var i = 0; i < nums.length; i++) {
        html += '<tr><td>' + nums[i] + '</td><td>\'' + formats[i] + '\'</td><td>' + numeral(nums[i]).format(formats[i]) + '</td></tr>';
    }

    $body.empty().html(html);
}

function formatPercentage () {
    var html = '',
        $body = $('#format-percentage tbody'),
        nums = [
            1,
            0.974878234,
            -0.43,
            0.43
        ],
        formats = [
            '0%',
            '0.000%',
            '0 %',
            '(0.000 %)'
        ];

    for (var i = 0; i < nums.length; i++) {
        html += '<tr><td>' + nums[i] + '</td><td>\'' + formats[i] + '\'</td><td>' + numeral(nums[i]).format(formats[i]) + '</td></tr>';
    }

    $body.empty().html(html);
}

function formatTime () {
    var html = '',
        $body = $('#format-time tbody'),
        nums = [
            25,
            238,
            63846
        ],
        formats = [
            '00:00:00',
            '00:00:00',
            '00:00:00'
        ];

    for (var i = 0; i < nums.length; i++) {
        html += '<tr><td>' + nums[i] + '</td><td>\'' + formats[i] + '\'</td><td>' + numeral(nums[i]).format(formats[i]) + '</td></tr>';
    }

    $body.empty().html(html);
}

function unformatAll () {
    var html = '',
        $body = $('#unformat-all tbody'),
        formats = [
            numeral(10000.123).format('0,0.000'),
            numeral(0.12345).format('0.00000'),
            numeral(1234000).format('0.00a'),
            numeral(23).format('0o'),
            numeral(10000).format('$0,0.00'),
            numeral(100).format('0b'),
            numeral(3467479682787).format('0.000b'),
            numeral(-0.76).format('0%'),
            '2:23:57'
        ];

    for (var i = 0; i < formats.length; i++) {
        html += '<tr><td>\'' + formats[i] + '\'</td><td>.unformat(\'' + formats[i] + '\')</td><td>' + numeral().unformat(formats[i]) + '</td></tr>';
    }

    $body.empty().html(html);
}

function manipulate () {
    var html = '',
        $body = $('#manipulate tbody'),
        num = numeral(1000);

    html += '<tr><td>' + num.value() + '</td><td>.add(100)</td><td>' + num.add(100).value() + '</td></tr>';
    html += '<tr><td>' + num.value() + '</td><td>.subtract(100)</td><td>' + num.subtract(100).value() + '</td></tr>';
    html += '<tr><td>' + num.value() + '</td><td>.multiply(100)</td><td>' + num.multiply(100).value() + '</td></tr>';
    html += '<tr><td>' + num.value() + '</td><td>.divide(100)</td><td>' + num.divide(100).value() + '</td></tr>';

    $body.empty().html(html);
}
