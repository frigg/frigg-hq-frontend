import Immutable from "immutable";
import Store from './store';
import {WORKER_STATS_RECEIVE} from '../constants';

export class WorkerStatsStore extends Store {
  constructor() {
    super();
    this._loading = false;
    this.key = 'stats';
  }

  isLoading() {
    return this._loading;
  }

  getState() {
    let workers = [];
    const stats = this.getItem(this.key);
    if (stats.has('lastSeen')) {
      workers = Object.keys(stats.get('lastSeen').toJS());
    }
    return {workers: Immutable.fromJS(workers.map(worker => {
      return {
        host: worker,
        lastSeen: stats.get('lastSeen').get(worker),
        versions: stats.get('versions').get(worker),
      };
    }))};
  }

  loadActionHandlers() {
    this.actions[WORKER_STATS_RECEIVE] = action => {
      this.setItem('stats', action.stats);
      this._loading = false;
      this.emitChange();
    };
  }
}

const store = new WorkerStatsStore();
store.register();
export default store;
