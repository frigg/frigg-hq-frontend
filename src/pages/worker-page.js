import _ from 'lodash';
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
    WorkerStatsStore.addChangeListener(this._onChange.bind(this));
    this.setState(WorkerStatsStore.getState());
    this.fetch();
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

        <h3>Last seen:</h3>
        <ul>
          {_.map(this.state.stats.get("lastSeen"), (value, key) => {
            return (
              <li>
                {typeof key === 'undefined' ? 'Unknown' : key}: {moment(value).fromNow()}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
