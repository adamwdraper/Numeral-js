$(function() {
    $('#locale-select').on('change', function() {
        updateFormats();
    });

    addVersion();

    updateFormats();

    $('#nav').stickySpy();
});

function addVersion () {
    $('#version').text('v. ' + numeral.version);
}

function updateFormats () {
    // get locale
    numeral.locale($('#locale-select').val());

    formatNumbers();
    formatCurrency();
    formatBytes();
    formatPercentage();
    formatTime();
    formatExponential();
    create();
    manipulate();
}

function create () {
    var html = '',
        locale = numeral.localeData(numeral.locale()),
        $body = $('#create tbody'),
        formats = [
            974,
            0.12345,
            '\'10' + locale.delimiters.thousands + '000' + locale.delimiters.decimal + '12\'',
            '\'23' + locale.ordinal(23) + '\'',
            '\'$10' + locale.delimiters.thousands + '000' + locale.delimiters.decimal + '00\'',
            '\'100B\'',
            '\'3' + locale.delimiters.decimal + '467TB\'',
            '\'-76%\'',
            '\'2:23:57\''
        ];

    for (var i = 0; i < formats.length; i++) {
        html += '<tr><td>numeral(' + formats[i] + ')</td><td>' + numeral(formats[i]).value() + '</td></tr>';
    }

    $body.empty().html(html);
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
            100.1234,
            1000.1234,
            10,
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
            100
        ],
        formats = [
            '0,0.0000',
            '0,0',
            '+0,0',
            '0,0.0',
            '0.000',
            '00000',
            '000000,0',
            '000.00',
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


function formatExponential () {
    var html = '',
        $body = $('#format-exponential tbody'),
        nums = [
            1123456789,
            12398734.202,
            0.000123987
        ],
        formats = [
            '0,0e+0',
            '0.00e+0',
            '0.000e+0'
        ];

    for (var i = 0; i < nums.length; i++) {
        html += '<tr><td>' + nums[i] + '</td><td>\'' + formats[i] + '\'</td><td>' + numeral(nums[i]).format(formats[i]) + '</td></tr>';
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
