import Promise from 'bluebird';
import request from 'superagent';

import Dispatcher from './dispatcher';
import BuildStore from './stores/build-store';
import {BUILDS_RECEIVE, PROJECTS_RECEIVE, API_ERROR, ALERT_ADD, ALERT_REMOVE} from './constants';

Promise.promisifyAll(request);

var actions = {
  get: url => {
    return request.get(url).endAsync();
  },

  catch: error => {
    Dispatcher.handleViewAction({
      type: API_ERROR,
      error: error
    });
  },

  getBuilds: () => {
    BuildStore._loading = true;
    return actions.get('/api/builds')
      .then(res => {
        Dispatcher.handleViewAction({
          type: BUILDS_RECEIVE,
          builds: res.body.results
        });
      })
      .catch(actions.catch);
  },

  getBuild: slug => {
    BuildStore._loading = true;
    return actions.get('/api/builds/' + slug)
      .then(res => {
        Dispatcher.handleViewAction({
          type: BUILDS_RECEIVE,
          builds: [res.body]
        });
      })
      .catch(actions.catch);
  },

  addAlert: alert => {
    setTimeout(() => {
      Dispatcher.handleViewAction({
        type: ALERT_ADD,
        alert: alert
      });
    }, 10);
  },

  removeAlert: key => {
    setTimeout(() => {
      Dispatcher.handleViewAction({
        type: ALERT_REMOVE,
        key: key
      });
    }, 100);
  }
};

export default actions;
