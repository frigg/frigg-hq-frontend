/* eslint-disable new-cap */
import express from 'express';
import http from 'http';
import {renderFile} from 'ejs';
import request from 'superagent';

const app = express();

const FRIGG_API = process.env.FRIGG_API || 'https://ci.frigg.io';

app.engine('html', renderFile);
app.set('view engine', 'html');
app.set('views', '' + __dirname);
app.use('/static', express.static(__dirname + '/public'));

const responses = {};

app.get('/api/users/me/', (req, res, next) => {
  res.json({
    is_anonymous: !!process.env.IS_ANON,
    is_staff: !!process.env.IS_STAFF,
    username: 'dumbledore',
  });
});

app.get('/api/builds', (req, res, next) => {
  const url = req.originalUrl;
  if (responses.hasOwnProperty(url)) {
    return res.json(responses[url]);
  }

  request(FRIGG_API + url)
    .end((err, apiRes) => {
      if (err) return next(err);
      responses[url] = apiRes.body;
      responses[url].results = responses[url].results.splice(0, 10);
      res.json(responses[url]);
    });
});

app.get('/api/*', (req, res, next) => {
  const url = req.originalUrl;
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

app.get('/*', (req, res) => {
  res.render('index', {});
});

const server = http.Server(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('listening on *:' + port);
});
