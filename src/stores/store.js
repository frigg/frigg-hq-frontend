import Bluebird from 'bluebird';
import work from 'webworkify';
import {EventEmitter} from 'events';
import {OrderedMap, Map} from 'immutable';

const CHANGE_EVENT = 'change';

export default class Store extends EventEmitter {

  constructor() {
    super();
    this.worker = work(require('../workers/compressor'));
    this.data = OrderedMap();
    this.load().then(data => {
      this.data = data;
    });
  }

  setItem(key, value) {
    this.data = this.data.set(key, Map(value));
  }

  getItem(key) {
    return this.data.get(key);
  }

  save() {
    const that = this;
    return new Bluebird(resolve => {
      that.worker.addEventListener('message', event => {
        if (event.data.type === 'compressed') {
          resolve(event.data.data);
          localStorage.setItem(that.key, event.data.data);
        }
      });

      that.worker.postMessage({
        type: 'compress',
        data: that.data
      });
    });
  }

  load() {
    const that = this;
    return new Bluebird(resolve => {
      const data = localStorage.getItem(that.key);
      if (!data) return resolve(OrderedMap());

      that.worker.addEventListener('message', event => {
        if (event.data.type === 'decompressed') {
          resolve(event.data.data);
        }
      });

      that.worker.postMessage({
        type: 'decompress',
        data: data
      });
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
