import Promise from 'bluebird';
import request from 'superagent';
import camelcase from 'camelcase';
import snakecase from 'snake-case';
import _ from 'lodash';

import Actions from './actions';

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
    Actions.addLoadingAlert();
    console.log(url)
    return request
      .get(url)
      .endAsync()
      .then(extractContent)
      .then(response => {
        Actions.removeAlert('loading-data')
        return response;
      })
      .catch(Actions.catch);
  },
};

export function transformWorkerStats(payload) {
  let workers = [];
  if (payload.stats.lastSeen) {
    workers = Object.keys(payload.stats.lastSeen);
  }

  return {workers: workers.map(worker => {
    return {
      host: worker,
      lastSeen: payload.stats.lastSeen[worker],
      versions: payload.stats.versions[worker],
    };
  })};
}

export function extractContent(response) {
  return response.body;
}

export default http;

export function createSlug({owner: owner, name: name, buildNumber: buildNumber}) {
  if (!owner) return '';
  if (!name) return `${owner}/`;
  if (!buildNumber) return `${owner}/${name}/`;
  return `${owner}/${name}/${buildNumber}/`;
}

export function getUser() {
  return http.get('/api/users/me');
}

export function getBuilds(params) {
  return http.get(`/api/builds/${createSlug(params)}`);
}

export function getBuild(params) {
  return http.get(`/api/builds/${createSlug(params)}`);
}

export function getWorkerStats() {
  return http.get('/api/stats')
    .then(transformWorkerStats);
}
