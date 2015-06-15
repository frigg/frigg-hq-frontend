import Dispatcher from '../dispatcher';
import Store from './store';
import {BUILDS_RECEIVE} from '../constants';
import {sortByAttributeComparator, Storage} from '../utils';

var storage = new Storage();

class BuildStore extends Store {
  constructor() {
    super();
    this._loading = false;
    this.key = 'builds';
  }

  getAll() {
    return this.data.sort(sortByAttributeComparator('-id'));
  }

  getBuild(owner, project, buildNumber) {
    return this.getItem(owner + project + buildNumber.toString());
  }

  isLoading() {
    return this._loading;
  }
}

var store = new BuildStore();
store.dispatcherToken = Dispatcher.register(payload => {
  var actions = {};
  actions[BUILDS_RECEIVE] = payload => {
    var builds = storage.getItem('builds') || {};
    payload.action.builds.forEach(build => {
      var key = build.project.owner + build.project.name + build.build_number.toString();
      build.key = key;
      store.setItem(key, build);
    });

    store._loading = false;
    store.emitChange();
  };

  if (actions.hasOwnProperty(payload.action.type)) {
    actions[payload.action.type](payload);
  }
});

export default store;
