import Store from './store';
import {ALERT_ADD, ALERT_REMOVE} from '../constants';


class AlertStore extends Store {

  getAll() {
    const alerts = this.data;
    return Object.keys(alerts).map(key => { return alerts[key]; });
  }

  loadActionHandlers() {
    this.actions[ALERT_ADD] = action => {
      const alert = action.alert;
      this.setItem(alert.key, alert);
      this.emitChange();
    };

    this.actions[ALERT_REMOVE] = action => {
      this.removeItem(action.key);
      this.emitChange();
    };
  }
}

const store = new AlertStore();
store.register();
export default store;
