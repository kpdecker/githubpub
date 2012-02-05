var express = require('express'),
    pubnub = require('pubnub');

pubnub = pubnub.init({
  publish_key: process.env.PUBNUB_PUBLISH_KEY || 'demo',
  subscribe_key: process.env.PUBNUB_SUBSCRIBE_KEY || 'demo',
  secret_key: process.env.PUBNUB_SECRET_KEY || '',
  ssl: false
});

var app = express.createServer();
app.configure(function() {
  app.use(express.logger());
  app.use(express.bodyParser());
  app.use(app.router);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.post('/githubpub/:channel', function(req, res, next) {
  console.log('sending message on channel', req.params.channel, req.body);
  pubnub.publish({
      channel: req.params.channel,
      message: req.body
    }, function(response) {
      res.send(200);
    });
});

var port = process.env.PORT || 5000;
console.log('Starting phoenix proxy server on port', port);
app.listen(port);
