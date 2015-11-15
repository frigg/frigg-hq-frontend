import React from 'react';
import moment from 'moment';

import Actions from '../actions';

import WorkerStatsStore from '../stores/worker-stats-store';

export default class WorkerPage extends React.Component {

  constructor() {
    super();
    this.state = WorkerStatsStore.getState();
    this.fetchTimeout = null;
  }

  fetch() {
    Actions.getWorkerStats();
  }

  componentDidMount() {
    this.setState(WorkerStatsStore.getState());
    this.fetch();
  }

  componentWillMount() {
    WorkerStatsStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    WorkerStatsStore.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.setState(WorkerStatsStore.getState());
  }

  render() {
    clearTimeout(this.fetchTimeout);
    this.fetchTimeout = setTimeout(this.fetch.bind(this), 10000);

    return (
      <div className="worker-stats-page">
        <h2 className="text-center">Worker stats</h2>

        <ul className="worker-list">
          {this.state.workers.map(worker => {
            return (
              <li>
                <h3>{worker.host}</h3>
                {moment(worker.lastSeen).fromNow()}
                <dl className="versions">
                  {(worker.versions || []).map((value, key) => {
                    return (
                      <span>
                        <dt>{key}</dt>
                        <dd>{value.current}</dd>
                      </span>
                    );
                  })}
                </dl>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
