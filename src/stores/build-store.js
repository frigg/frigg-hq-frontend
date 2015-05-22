import Dispatcher from '../dispatcher';
import Store from './store';
import {BUILDS_RECEIVE} from '../constants';
import {sortByAttributeComparator, Storage} from '../utils';

var storage = new Storage('builds');

class BuildStore extends Store {
  constructor() {
    super();
    this._loading = false;
  }

  getAll() {
    var builds = storage.getItem('builds') || {};
    var items = Object.keys(builds)
      .map(key => {
        return builds[key];
      });
    items.sort(sortByAttributeComparator('-id'));
    return items;
  }

  getBuildById(buildId) {
    return storage.getItem('builds')[buildId];
  }

  getBuild(owner, project, buildNumber) {
    return storage.getItem('builds')[owner + project + buildNumber.toString()];
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
      builds[key] = build;
      builds[key].key = build.id;
    });

    storage.setItem('builds', builds);
    store._loading = false;
    store.emitChange();
  };

  if (actions.hasOwnProperty(payload.action.type)) {
    actions[payload.action.type](payload);
  }
});

export default store;
