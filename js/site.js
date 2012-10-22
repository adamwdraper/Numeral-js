// Avoid `console` errors in browsers that lack a console.
(function() {
    var noop = function noop() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = window.console || {};

    while (length--) {
        // Only stub undefined methods.
        console[methods[length]] = console[methods[length]] || noop;
    }
}());

$(function() {
    $('#language-select').on('change', function() {
        updateFormats();
    });

    updateFormats();
});

function updateFormats () {
    // get language
    numeral.language($('#language-select').val());

    formatNumbers();
    formatMoney();
    formatPercentage();
    unformatAll();
}

function formatNumbers () {
    // remove old rows
    $('#format-numbers tbody').empty();

    var nums = [
        10000,
        10000.23,
        -10000,
        10000.1234,
        -10000,
        -.23,
        -.23,
        .23,
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
        '0,0.0',
        '0.000',
        '(0,0.0000)',
        '.00',
        '(.00)',
        '0.00000',
        '0.0a',
        '0a',
        '0a',
        '0o',
        '0o',
        '0o',
        '0o'
    ];

    for (var i = 0; i < nums.length; i++) {
        $('#format-numbers tbody').append('<tr><td>' + nums[i] + '</td><td>\'' + formats[i] + '\'</td><td>' + numeral(nums[i]).format(formats[i]) + '</td></tr>');
    }
}

function formatMoney () {
    // remove old rows
    $('#format-money tbody').empty();

    var nums = [
        1000.234,
        -1000.234,
        -1000.234,
        1230974
    ],
    formats = [
        '$0,0.00',
        '($0,0)',
        '$0.00',
        '($0.00a)'
    ];

    for (i = 0; i < nums.length; i++) {
        $('#format-money tbody').append('<tr><td>' + nums[i] + '</td><td>\'' + formats[i] + '\'</td><td>' + numeral(nums[i]).format(formats[i]) + '</td></tr>')
    }
}

function formatPercentage () {
    // remove old rows
    $('#format-percentage tbody').empty();

    var nums = [
        1,
        .974878234,
        -.43,
        .43
    ],
    formats = [
        '0%',
        '0.000%',
        '0%',
        '(0.000%)'
    ];

    for (var i = 0; i < nums.length; i++) {
        $('#format-percentage tbody').append('<tr><td>' + nums[i] + '</td><td>\'' + formats[i] + '\'</td><td>' + numeral(nums[i]).format(formats[i]) + '</td></tr>')
    }
}

function unformatAll () {
    // remove old rows
    $('#unformat-all tbody').empty();

    var formats = [
        numeral(10000.123).format('0,0.000'),
        numeral(.12345).format('0.00000'),
        numeral(1234000).format('0.00a'),
        numeral(23).format('0o'),
        numeral(10000).format('$0,0.00'),
        numeral(-.76).format('0%'),
        '2:23:57'
    ];

    for (var i = 0; i < formats.length; i++) {
        $('#unformat-all tbody').append('<tr><td>\'' + formats[i] + '\'</td><td>.unformat(\'' + formats[i] + '\')</td><td>' + numeral().unformat(formats[i]) + '</td></tr>');
    }
}