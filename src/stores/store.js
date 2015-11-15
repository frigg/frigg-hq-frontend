import EventEmitter from 'eventemitter3';

import Dispatcher from '../dispatcher';

const CHANGE_EVENT = 'change';

export default class Store extends EventEmitter {
  constructor() {
    super();

    this.data = {};
    this.actions = {};
    this.loadActionHandlers();
  }

  setItem(key, value) {
    this.data[key] = value;
  }

  getItem(key) {
    return this.data[key] || {};
  }

  removeItem(key) {
    delete this.data[key];
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

  register() {
    this.dispatcherId = Dispatcher.register(payload => {
      if (this.actions.hasOwnProperty(payload.type)) {
        this.actions[payload.type](payload);
      }
    });
  }

  unregister() {
    Dispatcher.unregister(this.dispatcherId);
  }

  loadActionHandlers() { }
}
