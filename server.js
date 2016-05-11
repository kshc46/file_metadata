'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js'),
    getter = require('./app/controllers/reader.js');

var app = express();

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

routes(app);
getter(app);

var port = Number(process.env.PORT || 8080);
app.listen(port, function () {
    console.log('Listening on port' + port);
});
    
