import Bluebird from 'bluebird';
import request from 'superagent';

import Dispatcher from './dispatcher';
import BuildStore from './stores/build-store';
import UserStore from './stores/user-store';
import {BUILDS_RECEIVE, USER_RECEIVE, API_ERROR, ALERT_ADD, ALERT_REMOVE} from './constants';

Bluebird.promisifyAll(request);

const actions = {
  get: url => {
    return request.get(url).endAsync();
  },

  catch: error => {
    Dispatcher.handleViewAction({
      type: API_ERROR,
      error: error
    });

    actions.removeAlert('loading-data');
    actions.addAlert({
      key: 'api-error',
      message: 'Could not fetch data from our servers.',
      iconClasses: 'fa fa-times',
      alertType: 'error',
      ttl: 4000
    });
  },

  getBuilds: slug => {
    BuildStore._loading = true;
    let url = '/api/builds/';
    if (slug) url = url + slug;
    return actions.get(url)
      .then(res => {
        Dispatcher.handleViewAction({
          type: BUILDS_RECEIVE,
          builds: res.body.results ? res.body.results : res.body
        });
      })
      .catch(actions.catch);
  },

  getBuild: slug => {
    BuildStore._loading = true;
    return actions.get('/api/builds/' + slug + '/')
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

    if (alert.ttl) {
      actions.removeAlert(alert.key);
    }
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
