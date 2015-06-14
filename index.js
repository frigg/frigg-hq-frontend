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

app.get('/api/users/me/', (req, res, next) => {
  res.json({
    is_anonymous: !!process.env.IS_ANON,
    is_staff: !!process.env.IS_STAFF,
    username: 'dumbledore'
  })
});

app.get('/api/builds', (req, res, next) => {
  var url = req.originalUrl;
  if (responses.hasOwnProperty(url)) {
    return res.json(responses[url]);
  }

  request(FRIGG_API + url)
    .end((err, apiRes) => {
      if (err) return next(err);
      responses[url] = apiRes.body;
      //responses[url].results = responses[url].results.splice(0, 10);
      res.json(responses[url]);
    });
});

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

app.get('/app.manifest', (req, res) => {
  var fallback = 'FALLBACK:\n/beta /beta/offline.html\n/beta/ /beta/offline.html';
  var network = 'NETWORK:\n*';
  var cache = 'CACHE:\n/beta/offline.html\n/static/bundle.js\n/static/main.css\n' +
              '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css\n' +
              '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/fonts/fontawesome-webfont.ttf?v=4.3.0\n' +
              '//fonts.googleapis.com/css?family=Lato:700,400,300,100\n' +
              '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/fonts/fontawesome-webfont.woff2?v=4.3.0';

  res
    .header('Content-Type', 'text/cache-manifest')
    .send(
      'CACHE MANIFEST\n' +
      '# version ' + manifestID + '\n\n' +
      cache + '\n\n' +
      fallback + '\n\n' +
      network
    );
});

app.get('/', (req, res) => {
  res.redirect('/beta/');
});

var server = http.Server(app);
var port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('listening on *:' + port);
});
