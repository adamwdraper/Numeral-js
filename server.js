var express = require('express'),
    app = express(),
    fs = require('fs');

app.use(express.logger());
app.use(express.compress());
app.use(express.static(__dirname));

// Routes ---------------------------------------

app.use(function (req, res) {
    res.status(404);
    res.render('404', {
        environment: process.env.NODE_ENV,
        type: 'page'
    });
});

// Listen ---------------------------------------
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log('Listening on port ' + port);
});