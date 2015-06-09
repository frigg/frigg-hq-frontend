import React from 'react/addons';
import reactMixin from 'react-mixin';
import request from 'superagent';
import moment from 'moment';
import {Link} from 'react-router';

import BuildStore from '../stores/build-store';
import strings from '../strings';
import Action from '../actions';
import Loading from './loading';
import {BuildTitle} from './build-list';
import Task from './task';

export default class BuildDetails extends React.Component {

  constructor() {
    super();
    this.state = {build: null, loading: false};
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

    if (!build) return (<Loading />);

    var setupTasks = false;
    var tasks = false;
    var state = 'Pending';

    if (build.get('result')) {
      if (!build.get('result').still_running) {
        state = build.get('result').succeeded ? 'Success' : 'Failure';
      }

      if (build.get('result').setup_tasks) {
        setupTasks = build.get('result').setup_tasks.map(task => {
          task.key = task.task;
          return (<Task {...task} />);
        });
      }

      tasks = build.get('result').tasks.map(task => {
        task.key = task.task;
        return (<Task {...task} />);
      });
    }

    if (!build.get('result') || build.get('result').still_running) {
      clearTimeout(this.fetchTimeout);
      this.fetchTimeout = setTimeout(this.fetch.bind(this), 2000);
    }

    return (
      <div className="build-details">
        <BuildTitle project={build.get('project')} branch={build.get('branch')} buildNumber={build.get('build_number')} size={2}/>
        <div className="details">
          <strong>Branch:</strong> {build.get('branch')} <br/>
          <strong>Commit hash:</strong> {build.get('sha')} <br/>
          <strong>Author:</strong> {build.get('author')} <br/>
          <strong>Timestamp:</strong> {moment(build.get('start_time')).fromNow()}<br/>
          <strong>State:</strong> {state}
          <Coverage result={build.get('result')} />
          <DeploymentInfo build={build} {...build.get('deployment')} />
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

reactMixin(BuildDetails.prototype, React.addons.PureRenderMixin);

class Coverage extends React.Component {
  render() {
    if (!this.props.result || !this.props.result.coverage) return false;

    return (
      <div>
        <strong>Coverage:</strong> {this.props.result.coverage} <br/>
        <strong>Coverage difference from last master build:</strong> {this.props.result.coverage_diff}<br/>
      </div>
    );
  }
}

class DeploymentInfo extends React.Component {
  url() {
    return 'http://' + this.props.port + '.pr.frigg.io';
  }

  render() {
    var build = this.props.build;
    if (!this.props.succeeded) {
      return (
        <div>
          <strong>Preview:</strong>
          {this.props.is_pending ? 'Pending' : 'Could not deploy.'}
          (<Link to="deployment" params={{owner: build.get('project').owner, name: build.get('project').name, buildNumber: build.get('build_number')}}>
            Deploy details
          </Link>)
        </div>
      );
    }
    return (
      <div>
        <strong>Preview:</strong>
        <a href={this.url()}>{this.url()}</a>
        (<Link to="deployment" params={{owner: build.get('project').owner, name: build.get('project').name, buildNumber: build.get('build_number')}}>
          Deploy details
        </Link>)
      </div>
    );
  }
}
