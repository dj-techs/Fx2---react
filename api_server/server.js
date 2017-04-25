'use strict';

var express = require('express'),
    proxy = require('http-proxy-middleware'),
    argv = require('yargs')
		.usage("Usage: $0 --api='https://domain.tld/' --port=3000")
		.default('port', 3001)
		.default('api', 'https://f2x-stage.appspot.com/')//https://f2x-stage.appspot.com/'https://x-time-149617.appspot.com'
		.argv;

var apiProxy = proxy({target: argv.api, changeOrigin: true});
var app = express();

app.use('/api', apiProxy);
app.use('/oauth2', apiProxy);
app.use('/social', apiProxy);
app.use('/', express.static(__dirname));

app.listen(argv.port);
