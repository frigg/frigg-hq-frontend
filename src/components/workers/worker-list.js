import _ from 'lodash';
import React from 'react';

import Actions from '../../actions';
import Worker from './worker';

export default React.createClass({
  displayName: 'WorkerList',

  propTypes: {
    workers: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  },

  fetch: () => Actions.getWorkerStats(),

  componentDidMount: function() {
    this.fetch();
  },

  render: function() {
    clearTimeout(this.fetchTimeout);
    this.fetchTimeout = setTimeout(this.fetch, 10000);
    return (
      <div className='worker-stats-page'>
        <h2 className='text-center'>Worker stats</h2>

        <ul className='worker-list'>
          {_.map(this.props.workers, worker =>
            <Worker key={worker.host} {...worker} />
          )}
        </ul>
      </div>
    );
  },
});
