import Dispatcher from '../dispatcher';
import Store from './store';
import {ALERT_ADD, ALERT_REMOVE} from '../constants';

const alerts = {};

class AlertStore extends Store {
  constructor() {
    super();
  }

  getAll() {
    return Object.keys(alerts).map(key => { return alerts[key]; });
  }

  getById(id) {
    return alerts[id];
  }

}

const store = new AlertStore();
store.dispatcherToken = Dispatcher.register(payload => {
  const actions = {};
  actions[ALERT_ADD] = action => {
    const alert = action.alert;
    alerts[alert.key] = alert;
    store.emitChange();
  };

  actions[ALERT_REMOVE] = action => {
    delete alerts[action.key];
    store.emitChange();
  };

  if (actions.hasOwnProperty(payload.type)) {
    actions[payload.type](payload);
  }
});

export default store;
