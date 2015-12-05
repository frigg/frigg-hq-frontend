import connectToStores from '../helpers/connect-to-stores';
import WorkerList from '../components/workers/worker-list';
import WorkerStatsStore from '../stores/worker-stats-store';

export default connectToStores(WorkerList, [WorkerStatsStore], () =>
  WorkerStatsStore.getState()
);
