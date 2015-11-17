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
    if (stats.lastSeen) {
      workers = Object.keys(stats.lastSeen);
    }
    return {workers: workers.map(worker => {
      return {
        host: worker,
        lastSeen: stats.lastSeen.worker,
        versions: stats.versions.worker,
      };
    })};
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
