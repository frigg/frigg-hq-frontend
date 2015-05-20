import Dispatcher from '../dispatcher';
import Store from './store';
import {BUILDS_RECEIVE} from '../constants';
import {sortByAttributeComparator} from '../utils';

var builds = {};

class BuildStore extends Store {
  getAll() {
    var items = Object.keys(builds)
      .map(key => {
        return builds[key];
      });
    items.sort(sortByAttributeComparator('-id'));
    return items;
  }

  getBuildById(buildId) {
    return builds[buildId];
  }

  getBuild(owner, project, buildNumber) {
    return builds[owner + project + buildNumber.toString()];
  }
}

var store = new BuildStore();
store.dispatcherToken = Dispatcher.register(payload => {
  var actions = {};
  actions[BUILDS_RECEIVE] = payload => {
    payload.action.builds.forEach(build => {
      var key = build.project.owner + build.project.name + build.build_number.toString();
      builds[key] = build;
      builds[key].key = build.id;
    });

    store.emitChange();
  };

  if (actions.hasOwnProperty(payload.action.type)) {
    actions[payload.action.type](payload);
  }
});

export default store;
