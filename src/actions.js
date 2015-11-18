import Dispatcher from './dispatcher';
import * as ApiService from './api-service';
import BuildStore from './stores/build-store';
import UserStore from './stores/user-store';
import {BUILDS_RECEIVE, USER_RECEIVE, WORKER_STATS_RECEIVE, API_ERROR, ALERT_ADD, ALERT_REMOVE} from './constants';
import strings from './strings';


const actions = {
  catch: error => {
    console.log(error, error.stack); // eslint-disable-line
    Dispatcher.dispatch({
      type: API_ERROR,
      error: error,
    });

    actions.removeAlert('loading-data');
    actions.addAlert({
      key: 'api-error',
      message: 'Could not fetch data from our servers.',
      iconClasses: 'fa fa-times',
      alertType: 'error',
      ttl: 4000,
    });
  },

  getBuilds: (params) => {
    BuildStore._loading = true;
    return ApiService.getBuilds(params)
      .then(response => {
        Dispatcher.dispatch({
          type: BUILDS_RECEIVE,
          builds: response.results ? response.results : response,
        });
      });
  },

  getBuild: slug => {
    BuildStore._loading = true;
    return ApiService.getBuild(slug)
      .then(response => {
        Dispatcher.dispatch({
          type: BUILDS_RECEIVE,
          builds: [response],
        });
      });
  },

  getUser: () => {
    UserStore._loading = true;
    return ApiService.getUser()
      .then(response => {
        Dispatcher.dispatch({
          type: USER_RECEIVE,
          user: response,
        });
      });
  },

  getWorkerStats: () => {
    UserStore._loading = true;
    return ApiService.getWorkerStats()
      .then(response => {
        Dispatcher.dispatch({
          type: WORKER_STATS_RECEIVE,
          stats: response,
        });
      });
  },

  addAlert: alert => {
    setTimeout(() => {
      Dispatcher.dispatch({
        type: ALERT_ADD,
        alert: alert,
      });
    }, 10);

    if (alert.ttl) {
      actions.removeAlert(alert.key);
    }
  },

  addLoadingAlert: () => {
    actions.addAlert({
      message: strings('LOADING'),
      iconClasses: 'fa fa-spinner fa-pulse',
      key: 'loading-data',
    });
  },

  removeAlert: key => {
    setTimeout(() => {
      Dispatcher.dispatch({
        type: ALERT_REMOVE,
        key: key,
      });
    }, 100);
  },
};

export default actions;
