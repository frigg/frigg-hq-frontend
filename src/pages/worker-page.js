import _ from 'lodash';
import React from 'react';
import moment from 'moment';

import Actions from '../actions';
import {StoreMixin} from '../mixins/page-mixins';
import WorkerStatsStore from '../stores/worker-stats-store';
import Worker from '../components/workers/worker';

export default React.createClass({
  displayName: 'WorkerPage',

  stores: [WorkerStatsStore],
  mixins: [StoreMixin],

  fetch: () => Actions.getWorkerStats(),

  getInitialState: function () {
    return {};
  },

  componentDidMount: function() {
    this.setState(WorkerStatsStore.getState());
    this.fetch();
  },

  onChange: function() {
    this.setState(WorkerStatsStore.getState());
  },

  render: function() {
    clearTimeout(this.fetchTimeout);
    this.fetchTimeout = setTimeout(this.fetch, 10000);

    return (
      <div className='worker-stats-page'>
        <h2 className='text-center'>Worker stats</h2>

        <ul className='worker-list'>
          {_.map(this.state.workers, worker => {
            return <Worker key={worker.host} {...worker} />;
          })}
        </ul>
      </div>
    );
  },
});
