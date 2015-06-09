import {EventEmitter} from 'events';
import {OrderedMap, Map} from 'immutable';

const CHANGE_EVENT = 'change';

export default class Store extends EventEmitter {

  constructor() {
    super();
    this.data = OrderedMap();
  }

  setItem(key, value) {
    this.data = this.data.set(key, Map(value));
  }

  getItem(key) {
    return this.data.get(key);
  }

  getState() {
    return this.data;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}
