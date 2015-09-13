import {Map} from 'immutable';

import Store from './store';
import {USER_RECEIVE} from '../constants';

export class UserStore extends Store {
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

  loadActionHandlers() {
    this.actions[USER_RECEIVE] = action => {
      this.setItem('user', action.user);
      this._loading = false;
      this.emitChange();
    };
  }
}

const store = new UserStore();
store.register();
export default store;
