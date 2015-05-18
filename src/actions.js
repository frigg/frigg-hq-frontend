import Promise from 'bluebird';
import request from 'superagent';

import Dispatcher from './dispatcher';
import {BUILDS_RECEIVE, PROJECTS_RECEIVE, API_ERROR} from './constants';

Promise.promisifyAll(request);

export default {
  getBuilds: () => {
    return request
      .get('/api/builds')
      .endAsync()
      .then(res => {
        Dispatcher.handleViewAction({
          type: BUILDS_RECEIVE,
          builds: res.body.results
        });
      })
      .catch(error => {
        Dispatcher.handleViewAction({
          type: API_ERROR,
          error: error
        });
        throw error;
      });
  },

  getProjects: () => {
    return request
      .get('/api/projects')
      .endAsync()
      .then(res => {
        Dispatcher.handleViewAction({
          type: PROJECTS_RECEIVE,
          projects: res.body
        });
      })
      .catch(error => {
        Dispatcher.handleViewAction({
          type: API_ERROR,
          error: error
        });
        throw error;
      });
  }
};
