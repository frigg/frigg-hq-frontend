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
    return this.getItem(this.key);
  }

  loadActionHandlers() {
    this.actions[WORKER_STATS_RECEIVE] = action => {
      this.setItem(this.key, action.stats);
      this._loading = false;
      this.emitChange();
    };
  }
}

const store = new WorkerStatsStore();
store.register();
export default store;
