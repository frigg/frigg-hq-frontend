import {Map} from 'immutable';

import Dispatcher from '../dispatcher';
import Store from './store';
import {USER_RECEIVE} from '../constants';
import {sortByAttributeComparator, Storage} from '../utils';

var storage = new Storage(1000 * 60);

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

var store = new UserStore();
store.dispatcherToken = Dispatcher.register(payload => {
  var actions = {};
  actions[USER_RECEIVE] = payload => {
    store.setItem('user', payload.action.user);
    store._loading = false;
    store.emitChange();
  };

  if (actions.hasOwnProperty(payload.action.type)) {
    actions[payload.action.type](payload);
  }
});

export default store;
