import Dispatcher from '../dispatcher';
import Store from './store';
import {ALERT_ADD, ALERT_REMOVE} from '../constants';
import {sortByAttributeComparator, Storage} from '../utils';

var alerts = {};

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

var store = new AlertStore();
store.dispatcherToken = Dispatcher.register(payload => {
  var actions = {};
  actions[ALERT_ADD] = payload => {
    var alert = payload.action.alert;
    alerts[alert.key] = alert;
    store.emitChange();
  };

  actions[ALERT_REMOVE] = payload => {
    delete alerts[payload.action.key];
    store.emitChange();
  };

  if (actions.hasOwnProperty(payload.action.type)) {
    actions[payload.action.type](payload);
  }
});

export default store;
