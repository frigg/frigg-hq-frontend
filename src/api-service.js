import Promise from 'bluebird';
import request from 'superagent';
import camelcase from 'camelcase';
import snakecase from 'snake-case';
import _ from 'lodash';

Promise.promisifyAll(request);

export function transformForFrontend(payload) {
  _.forOwn(payload, (value, key) => {
    if (camelcase(key) !== key) {
      delete payload[key];
      payload[camelcase(key)] = value;
    }
  });
  return payload;
}

export function transformForBackend(payload) {
  _.forOwn(payload, (value, key) => {
    if (snakecase(key) !== key) {
      delete payload[key];
      payload[snakecase(key)] = value;
    }
  });
  return payload;
}

const http = {
  get: url => {
    if (!/\/$/.test(url)) {
      url += '/';
    }

    return request
      .get(url)
      .endAsync()
      .then(transformForFrontend);
  },
};

export default http;

export function getUser() {
  return http.get('/api/users/me');
}

export function getBuilds(slug) {
  const url = '/api/builds/';
  return http.get(slug ? url + slug : url);
}
export function getBuild(slug) {
  return http.get('/api/builds/' + slug);
}
