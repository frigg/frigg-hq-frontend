import Promise from 'bluebird';
import request from 'superagent';

import Dispatcher from './dispatcher';
import BuildStore from './stores/build-store';
import UserStore from './stores/user-store';
import {BUILDS_RECEIVE, USER_RECEIVE, API_ERROR, ALERT_ADD, ALERT_REMOVE} from './constants';

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

    Dispatcher.handleViewAction({
      type: ALERT_ADD,
      message: error.message,
      iconClasses: 'fa fa-times'
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

  getUser: () => {
    UserStore._loading = true;
    return actions.get('/api/users/me/')
      .then(res => {
        Dispatcher.handleViewAction({
          type: USER_RECEIVE,
          user: res.body
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
