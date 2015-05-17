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

app.get('/api/*', (req, res, next) => {
  request(FRIGG_API + req.originalUrl)
    .end((err, apiRes) => {
      if (err) return next(err);
      res.json(apiRes.body);
    });
});

app.get('*', (req, res) => {
  res.render('index', {});
});

var server = http.Server(app);
var port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('listening on *:' + port);
});
