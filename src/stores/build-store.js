import _ from 'lodash';

import Store from './store';
import {BUILDS_RECEIVE} from '../constants';
import {sortByAttributeComparator} from '../utils';

export class BuildStore extends Store {
  constructor() {
    super();
    this._loading = false;
    this.key = 'builds';
  }

  getAll() {
    return _.toArray(this.data).sort(sortByAttributeComparator('-id'));
  }

  getBuild(owner, project, buildNumber) {
    return this.getItem(owner + project + buildNumber.toString());
  }

  isLoading() {
    return this._loading;
  }

  loadActionHandlers() {
    this.actions[BUILDS_RECEIVE] = action => {
      action.builds.forEach(build => {
        const key = build.project.owner + build.project.name + build.build_number.toString();
        build.key = key;
        this.setItem(key, build);
      });

      this._loading = false;
      this.emitChange();
    };
  }
}

const store = new BuildStore();
store.register();

export default store;
