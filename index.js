import express from 'express';
import http from 'http';
import {renderFile} from 'ejs';
import request from 'superagent';

var app = express();

var FRIGG_API = process.env.FRIGG_API || 'https://ci.frigg.io';

app.engine('html', renderFile);
app.set('view engine', 'html');
app.set('views', '' + __dirname);
app.use('/static', express.static(__dirname + '/public'));

var responses = {};

app.get('/api/*', (req, res, next) => {
  var url = req.originalUrl;
  if (responses.hasOwnProperty(url)) {
    return res.json(responses[url]);
  }
  request(FRIGG_API + url)
    .end((err, apiRes) => {
      if (err) return next(err);
      responses[url] = apiRes.body;
      res.json(apiRes.body);
    });
});

app.get('/beta/*', (req, res) => {
  res.render('index', {});
});

app.get('/', (req, res) => {
  res.redirect('/beta/');
});

var server = http.Server(app);
var port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('listening on *:' + port);
});
