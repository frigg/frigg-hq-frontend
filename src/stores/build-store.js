import Dispatcher from '../dispatcher';
import Store from './store';
import {BUILDS_RECEIVE} from '../constants';
import {sortByAttributeComparator} from '../utils';

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

const store = new BuildStore();
store.dispatcherToken = Dispatcher.register(payload => {
  const actions = {};
  actions[BUILDS_RECEIVE] = action => {
    action.builds.forEach(build => {
      const key = build.project.owner + build.project.name + build.build_number.toString();
      build.key = key;
      store.setItem(key, build);
    });

    store._loading = false;
    store.emitChange();
  };

  if (actions.hasOwnProperty(payload.type)) {
    actions[payload.type](payload);
  }
});

export default store;
