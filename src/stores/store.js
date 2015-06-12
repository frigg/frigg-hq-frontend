import Bluebird from 'bluebird';
import {EventEmitter} from 'events';
import {OrderedMap, Map} from 'immutable';
import {compress, decompress} from 'lz-string';

const CHANGE_EVENT = 'change';

export default class Store extends EventEmitter {

  constructor() {
    super();
  }

  setItem(key, value) {
    this.data = this.data.set(key, Map(value));
  }

  getItem(key) {
    return this.data.get(key);
  }

  save() {
    var that = this;
    return new Bluebird(resolve => {
      setTimeout(function() {
        resolve(localStorage.setItem(that.key, compress(JSON.stringify(that.data))));
      }, 100);
    });
  }

  load() {
    return new Bluebird(resolve => {
      var data = localStorage.getItem(this.key);
      if (data) {
        resolve(OrderedMap(JSON.parse(decompress(data))));
      } else {
        resolve(OrderedMap());
      }
    });
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
