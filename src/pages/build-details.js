/* eslint-disable react/no-multi-comp */
import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import {Link} from 'react-router';

import {StoreMixin} from '../mixins/page-mixins';
import BuildStore from '../stores/build-store';
import UserStore from '../stores/user-store';
import strings from '../strings';
import Actions from '../actions';
import Loading from '../components/loading';
import BuildTitle from '../components/builds/build-title';
import Task from '../components/task';

export default React.createClass({
  displayName: 'BuildDetailsPage',

  stores: [BuildStore],
  mixins: [StoreMixin],

  propTypes: {
    params: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired,
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
  },

  componentDidMount: function() {
    this.setState({build: this.get(), loading: true});
    this.fetch();
  },

  onChange: function() {
    this.setState({build: this.get(), loading: BuildStore.isLoading()});
  },

  showSetupTasks: function() {
    const {build} = this.state;
    return build && !!build.result && !!build.result.setup_tasks;
  },

  render: function() {
    if (!this.state.loading) Actions.removeAlert('loading-data');
    const build = this.state.build;
    const user = UserStore.getCurrentUser();

    if (!build) return (<Loading />);
    if (build.color === 'gray') {
      return (
      <div className='build-details'>
        <BuildTitle project={build.project} branch={build.branch} buildNumber={build.build_number} size={2}/>
        <h3 className='text-center'>{strings('BUILD_ERRORED')}</h3>
        <p className='text-center'>{build.result.tasks}</p>
      </div>
      );
    }

    let state = 'Pending';

    if (!!build.result) {
      if (!build.result.still_running) {
        state = build.result.succeeded ? 'Success' : 'Failure';
      }
    }

    if (!build.result || build.result.still_running) {
      clearTimeout(this.fetchTimeout);
      this.fetchTimeout = setTimeout(this.fetch, 2000);
    }

    return (
      <div className='build-details'>
        <BuildTitle project={build.project} branch={build.branch} buildNumber={build.build_number} size={2}/>
        <div className='details'>
          <strong>Branch:</strong> {build.branch} <br/>
          <PullRequestInfo pull_request_id={build.pull_request_id} url={build.pull_request_url} />
          <strong>Commit hash:</strong> <a href={build.commit_url}>{build.sha}</a> <br/>
          <strong>Author:</strong> {build.author} <br/>
          <strong>Timestamp:</strong> {moment(build.start_time).fromNow()}<br/>
          <strong>State:</strong> {state}<br/>
          {user.is_staff && build.result ? (<span><strong>Worker:</strong> {build.result.worker_host}</span>) : false}
          <Coverage result={build.result} />
          <DeploymentInfo build={build} deployment={build.deployment} location={this.props.location} />
        </div>

        <div className='message'>
          {build.message}
        </div>

        <div className='tasks'>
          {this.showSetupTasks() && <h3>Setup tasks:</h3>}
          {this.showSetupTasks() && build.result.setup_tasks.map(task => {
            return (<Task task={task} />);
          })}

          <h3>Tasks:</h3>
          {_.map(_.get(build, 'result.tasks'), task => {
            return (<Task key={task.task} task={task} />);
          })}
        </div>
      </div>
    );
  },
});

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
        <strong>Pull Request:</strong> <a href={this.props.url}>#{this.props.pull_request_id}</a>
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
    return 'http://' + this.props.deployment.port + '.pr.frigg.io';
  }

  getPreviewLabel() {
    if (this.props.deployment.succeeded) {
      return <a href={this.url()}>{this.url()}</a>
    }

    if (this.props.deployment.is_pending) {
      return 'Pending';
    }

    return 'Could not deploy.'
  }

  render() {
    const build = this.props.build;
    if (!build.deployment) return false;

    return (
      <div>
        <strong>Preview:</strong>
        {this.getPreviewLabel()}
        (<Link to={`${this.props.location.pathname}preview/`}>
          Deploy details
        </Link>)
      </div>
    );
  }
}

DeploymentInfo.propTypes = {
  build: React.PropTypes.object,
  deployment: React.PropTypes.object,
  location: React.PropTypes.object,
};
