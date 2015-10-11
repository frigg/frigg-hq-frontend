/* eslint-disable react/no-multi-comp */
import React from 'react';
import moment from 'moment';
import {Link} from 'react-router';

import BuildStore from '../stores/build-store';
import UserStore from '../stores/user-store';
import strings from '../strings';
import Actions from '../actions';
import Loading from '../components/loading';
import BuildTitle from '../components/builds/build-title';
import Task from '../components/task';

export default class BuildDetailsPage extends React.Component {

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
    const build = this.state.build;
    const user = UserStore.getCurrentUser();

    if (!build) return (<Loading />);
    if (build.get('color') === 'gray') {
      return (
      <div className="build-details">
        <BuildTitle project={build.get('project')} branch={build.get('branch')} buildNumber={build.get('build_number')} size={2}/>
        <h3 className='text-center'>{strings('BUILD_ERRORED')}</h3>
        <p className='text-center'>{build.get('result').get('tasks')}</p>
      </div>
      );
    }

    let setupTasks = false;
    let tasks = false;
    let state = 'Pending';

    if (build.get('result')) {
      if (!build.get('result').get('still_running')) {
        state = build.get('result').get('succeeded') ? 'Success' : 'Failure';
      }

      if (build.get('result').get('setup_tasks')) {
        setupTasks = build.get('result').get('setup_tasks').map(task => {
          return (<Task task={task} />);
        });
      }

      tasks = build.get('result').get('tasks').map(task => {
        return (<Task task={task} />);
      });
    }

    if (!build.get('result') || build.get('result').get('still_running')) {
      clearTimeout(this.fetchTimeout);
      this.fetchTimeout = setTimeout(this.fetch.bind(this), 2000);
    }

    return (
      <div className="build-details">
        <BuildTitle project={build.get('project')} branch={build.get('branch')} buildNumber={build.get('build_number')} size={2}/>
        <div className="details">
          <strong>Branch:</strong> {build.get('branch')} <br/>
          <PullRequestInfo pull_request_id={build.get('pull_request_id')} url={build.get('pull_request_url')} />
          <strong>Commit hash:</strong> <a href={build.get('commit_url')}>{build.get('sha')}</a> <br/>
          <strong>Author:</strong> {build.get('author')} <br/>
          <strong>Timestamp:</strong> {moment(build.get('start_time')).fromNow()}<br/>
          <strong>State:</strong> {state}<br/>
          {user.get('is_staff') && build.get('result') ? (<span><strong>Worker:</strong> {build.get('result').get('worker_host')}</span>) : false}
          <Coverage result={build.get('result')} />
          <DeploymentInfo build={build} deployment={build.get('deployment')} />
        </div>
        <div className="message">
          {build.get('message')}
        </div>
        <div className="tasks">
          {setupTasks.size ? (<h3>Setup tasks:</h3>) : false}
          {setupTasks}

          <h3>Tasks:</h3>
          {tasks}
        </div>
      </div>
    );
  }
}

BuildDetailsPage.propTypes = {
  params: React.PropTypes.object,
};

class Coverage extends React.Component {
  render() {
    if (!this.props.result || !this.props.result.coverage) return false;

    return (
      <div>
        <strong>Coverage:</strong> {this.props.result.coverage} <br/>
      </div>
    );
  }
}

Coverage.propTypes = {
  result: React.PropTypes.object,
};

class PullRequestInfo extends React.Component {
  render() {
    if (this.props.pull_request_id === 0) return false;
    return (
      <div>
        <strong>Pull Request:</strong> <a href={this.props.url}>#{this.props.id}</a>
      </div>
    );
  }
}

PullRequestInfo.propTypes = {
  url: React.PropTypes.string,
  pull_request_id: React.PropTypes.number,
};

class DeploymentInfo extends React.Component {
  url() {
    return 'http://' + this.props.deployment.get('port') + '.pr.frigg.io';
  }

  getLinkParams(build) {
    return {
      owner: build.get('project').get('owner'),
      name: build.get('project').get('name'),
      buildNumber: build.get('build_number'),
    };
  }

  render() {
    const build = this.props.build;
    if (!build.get('deployment')) return false;

    if (!this.props.deployment.get('succeeded')) {
      return (
        <div>
          <strong>Preview:</strong>
          {this.props.deployment.get('is_pending') ? 'Pending' : 'Could not deploy.'}
          (<Link to="deployment" params={this.getLinkParams(build)}>
            Deploy details
          </Link>)
        </div>
      );
    }
    return (
      <div>
        <strong>Preview:</strong>
        <a href={this.url()}>{this.url()}</a>
        (<Link to="deployment" params={this.getLinkParams(build)}>
          Deploy details
        </Link>)
      </div>
    );
  }
}

DeploymentInfo.propTypes = {
  build: React.PropTypes.object,
  deployment: React.PropTypes.object,
};
