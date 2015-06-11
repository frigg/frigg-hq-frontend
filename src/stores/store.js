import {EventEmitter} from 'events';
import {OrderedMap, Map} from 'immutable';
import {compress, decompress} from 'lz-string';

const CHANGE_EVENT = 'change';

export default class Store extends EventEmitter {

  constructor() {
    super();
    var data = localStorage.getItem(this.key);
    if (data) {
      this.data = OrderedMap(JSON.parse(decompress(data)));
    } else {
      this.data = OrderedMap();
    }
  }

  setItem(key, value) {
    this.data = this.data.set(key, Map(value));
    /*setTimeout(function() {
      localStorage.setItem(this.key, compress(JSON.stringify(this.data)));
    }.bind(this), 100);*/
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
