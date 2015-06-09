import React from 'react/addons';
import reactMixin from 'react-mixin';
import request from 'superagent';
import moment from 'moment';
import {Map} from 'immutable';

import BuildStore from '../stores/build-store';
import strings from '../strings';
import Action from '../actions';
import Loading from './loading';
import Task from './task';
import {BooleanIcon} from './icons';

export default class DeploymentDetails extends React.Component {

  constructor() {
    super();
    this.state = {build: Map(), loading: false};
  }

  get() {
    return BuildStore.getBuild(
      this.props.params.owner,
      this.props.params.name,
      this.props.params.buildNumber
    );
  }

  fetch() {
    Action.getBuild(
      this.props.params.owner + '/' +
      this.props.params.name + '/' +
      this.props.params.buildNumber
    );
    Action.addAlert({
      message: strings.LOADING,
      iconClasses: 'fa fa-spinner fa-pulse',
      key: 'loading-data'
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

    if (!this.state.loading) Action.removeAlert('loading-data');
    var build = this.state.build;
    var deployment = build.get('deployment');

    if (!deployment) return (<Loading />);

    var setupTasks = false;
    var tasks = false;
    var state = 'Pending';
    var link = 'http://' + deployment.port + '.pr.frigg.io';

    if (!deployment.is_pending) {
      state = build.get('result').succeeded ? 'Success' : 'Failure';
    }

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

reactMixin(DeploymentDetails.prototype, React.addons.PureRenderMixin);
