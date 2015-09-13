import React from 'react';
import moment from 'moment';
import {Map} from 'immutable';

import BuildStore from '../stores/build-store';
import strings from '../strings';
import Actions from '../actions';
import Loading from '../components/loading';
import Task from '../components/task';
import {BooleanIcon} from '../components/boolean-icon';

export default class DeploymentDetailsPage extends React.Component {

  constructor() {
    super();
    this.state = {build: Map(), loading: true};
  }

  get() {
    return BuildStore.getBuild(
      this.props.params.owner,
      this.props.params.name,
      this.props.params.buildNumber
    );
  }

  fetch() {
    Actions.getBuild(
      this.props.params.owner + '/' +
      this.props.params.name + '/' +
      this.props.params.buildNumber
    );
    Actions.addAlert({
      message: strings('LOADING'),
      iconClasses: 'fa fa-spinner fa-pulse',
      key: 'loading-data',
    });
  }

  componentDidMount() {
    BuildStore.addChangeListener(this._onChange.bind(this));
    this.setState({build: this.get(), loading: true});
    this.fetch();
  }

  componentWillUnmount() {
    BuildStore.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.setState({build: this.get(), loading: BuildStore.isLoading()});
  }

  render() {
    if (!this.state.loading) Actions.removeAlert('loading-data');
    if (!build) return (<Loading />);
    const build = this.state.build;
    const deployment = build.get('deployment');

    if (!deployment) return (<Loading />);

    let setupTasks = false;
    let tasks = false;
    const link = 'http://' + deployment.port + '.pr.frigg.io';

    if (deployment.setup_tasks) {
      setupTasks = deployment.setup_tasks.map(task => {
        task.key = task.task;
        return (<Task {...task} />);
      });
    }

    if (deployment.tasks) {
      tasks = deployment.tasks.map(task => {
        task.key = task.task;
        return (<Task {...task} />);
      });
    }

    if (!deployment.still_running) {
      clearTimeout(this.fetchTimeout);
      this.fetchTimeout = setTimeout(this.fetch.bind(this), 2000);
    }

    return (
      <div className="build-details">
        <div className="details">
          <strong>Link:</strong> <a href={link}>{link}</a> <br/>
          <strong>Timestamp:</strong> {deployment.start_time ? moment(deployment.start_time).fromNow() : ''}<br/>
          <strong>Should be live:</strong> <BooleanIcon value={deployment.is_alive} />
        </div>
        <div className="message">
          {build.get('message')}
        </div>
        <div className="tasks">{setupTasks}</div>
        <div className="tasks">{tasks}</div>
      </div>
    );
  }
}

DeploymentDetailsPage.propTypes = {
  params: React.PropTypes.object,
};
