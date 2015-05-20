import Promise from 'bluebird';
import request from 'superagent';

import Dispatcher from './dispatcher';
import {BUILDS_RECEIVE, PROJECTS_RECEIVE, API_ERROR} from './constants';

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
    return actions.get('/api/builds/' + slug)
      .then(res => {
        Dispatcher.handleViewAction({
          type: BUILDS_RECEIVE,
          build: [res.body]
        });
      })
      .catch(actions.catch);
  },

  getProjects: () => {
      return actions.get('/api/projects')
      .then(res => {
        Dispatcher.handleViewAction({
          type: PROJECTS_RECEIVE,
          projects: res.body
        });
      })
      .catch(actions.catch);
  }
};

export default actions;
