import {Map} from 'immutable';

import Dispatcher from '../dispatcher';
import Store from './store';
import {USER_RECEIVE} from '../constants';

class UserStore extends Store {
  constructor() {
    super();
    this._loading = false;
    this.key = 'user';
  }

  getCurrentUser() {
    return this.getItem('user') || Map({is_anonymous: true});
  }

  isLoading() {
    return this._loading;
  }
}

const store = new UserStore();
store.dispatcherToken = Dispatcher.register(payload => {
  const actions = {};
  actions[USER_RECEIVE] = action => {
    store.setItem('user', action.user);
    store._loading = false;
    store.emitChange();
  };

  if (actions.hasOwnProperty(payload.type)) {
    actions[payload.type](payload);
  }
});

export default store;
