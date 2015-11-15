import _ from 'lodash';
import React from 'react';
import moment from 'moment';

import {StoreMixin} from '../mixins/page-mixins';
import BuildStore from '../stores/build-store';
import strings from '../strings';
import Actions from '../actions';
import Loading from '../components/loading';
import Task from '../components/task';
import {BooleanIcon} from '../components/boolean-icon';

export default React.createClass({
  displayName: "DeploymentDetailsPage",

  stores: [BuildStore],
  mixins: [StoreMixin],

  propTypes: {
    params: React.PropTypes.object,
  },

  getInitialState: function() {
    return {build: null, loading: false};
  },

  get: function() {
    const {owner, name, buildNumber} = this.props.params;
    return BuildStore.getBuild(owner, name, buildNumber);
  },

  fetch: function() {
    Actions.getBuild(this.props.params);
    Actions.addAlert({
      message: strings('LOADING'),
      iconClasses: 'fa fa-spinner fa-pulse',
      key: 'loading-data',
    });
  },

  componentDidMount: function() {
    this.setState({build: this.get(), loading: true});
    this.fetch();
  },

  onChange: function() {
    this.setState({build: this.get(), loading: BuildStore.isLoading()});
  },

  showSetupTasks: function() {
    const deployment = _.get(this.state, 'build.deployment');
    return deployment && !!deployment.result && !!deployment.result.setup_tasks;
  },

  render: function() {
    if (!this.state.loading) Actions.removeAlert('loading-data');
    const {build} = this.state;
    if (!build || !build.deployment) return (<Loading />);
    const deployment = build.deployment;

    const link = 'http://' + deployment.port + '.pr.frigg.io';

    if (!deployment.still_running) {
      clearTimeout(this.fetchTimeout);
      this.fetchTimeout = setTimeout(this.fetch, 2000);
    }

    return (
      <div className="deployment-details">
        <div className="details">
          <strong>Link:</strong> <a href={link}>{link}</a> <br/>
          <strong>Timestamp:</strong> {deployment.start_time ? moment(deployment.start_time).fromNow() : ''}<br/>
          <strong>Should be live:</strong> <BooleanIcon value={deployment.is_alive} />
        </div>
        <div className="message">
          {build.message}
        </div>
        <div className="tasks">
          {this.showSetupTasks() && <h3>Setup tasks:</h3>}
          {this.showSetupTasks() && deployment.result.setup_tasks.map(task => {
            return (<Task task={task} />);
          })}

          <h3>Tasks:</h3>
          {_.map(_.get(deployment, 'result.tasks'), task => {
            return (<Task key={task.task} task={task} />);
          })}
        </div>
      </div>
    );
  },
});
