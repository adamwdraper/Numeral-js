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
    $('#language-select').on('change', updateFormats());

    updateFormats();

});

function updateFormats () {
    // get language
    numeral.language($('#language-select').val());

    formatNumbers();
    formatMoney();
}

function formatNumbers () {
    // remove old rows
    $('#format-numbers tr').remove();

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
        $('#format-numbers').append('<tr><td>' + nums[i] + '</td><td>\'' + formats[i] + '\'</td><td>' + numeral(nums[i]).format(formats[i]) + '</td></tr>');
    }
}

function formatMoney () {
    // remove old rows
    $('#format-money tr').remove();

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
        $('#format-money').append('<tr><td>' + nums[i] + '</td><td>\'' + formats[i] + '\'</td><td>' + numeral(nums[i]).format(formats[i]) + '</td></tr>')
    }
}

function formatPercentage () {
    // remove old rows
    $('#format-percentage tr').remove();

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
        document.write('<tr><td>' + nums[i] + '</td><td>\'' + formats[i] + '\'</td><td>' + numeral(nums[i]).format(formats[i]) + '</td></tr>')
    }
}

function unformatAll () {
    // remove old rows
    $('#unformat-all tr').remove();
    
}