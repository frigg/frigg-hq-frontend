/* eslint-env node */
/* eslint-disable no-var */
var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");

var PORT = parseInt(process.env.PORT, 10) || 3000;
var WEBPACK_PROXY_TO = process.env.WEBPACK_PROXY_TO || "http://localhost:8000";

var server = new WebpackDevServer(webpack(require('./webpack.config')), {
  noInfo: true,
  publicPath: "/static/js/",
  proxy: {
    "*": WEBPACK_PROXY_TO,
  },
});

server.listen(PORT);

/* eslint-disable */
console.log("Running dev server on http://localhost:" + PORT);
/* eslint-enable */
