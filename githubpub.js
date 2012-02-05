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
  try {
    var message = {
      repo: req.body.repository.url,
      ref: req.body.ref,
      before: req.body.before,
      after: req.body.after
    };

    console.log('sending message on channel', req.params.channel, message);
    pubnub.publish({
        channel: req.params.channel,
        message: message
      }, function(response) {
        res.send(200);
      });
  } catch (err) {
    console.error('Request failed', req.body, err.stack);
    res.send(500);
  }
});

var port = process.env.PORT || 5000;
console.log('Starting phoenix proxy server on port', port);
app.listen(port);
