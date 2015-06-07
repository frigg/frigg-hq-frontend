import React from 'react/addons';
import reactMixin from 'react-mixin';
import request from 'superagent';
import moment from 'moment';
import {Link} from 'react-router';

import BuildStore from '../stores/build-store';
import Action from '../actions';
import Loading from './loading';


export default class BuildList extends React.Component {

  constructor() {
    super();
    this.state = {builds: [], loading: false};
  }

  fetch() {
    if (this.props.params.owner && this.props.params.name) {
      Action.getBuilds('/' + this.props.params.owner + '/' + this.props.params.name);
    } else if (this.props.params.owner) {
      Action.getBuilds('/' + this.props.params.owner);
    } else {
      Action.getBuilds();
    }
    Action.addAlert({
      message: 'We are currently loading new data from the server',
      iconClasses: 'fa fa-spinner fa-pulse',
      key: 'loading-data'
    });
  }

  componentDidMount() {
    BuildStore.addChangeListener(this._onChange.bind(this));
    this.setState({builds: BuildStore.getAll(), loading: true});
    this.fetch();
  }

  componentWillUnmount() {
    BuildStore.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.setState({builds: BuildStore.getAll(), loading: BuildStore.isLoading()});
  }

  render() {
    if (!this.state.builds.size) return (<Loading />);
    var owner = this.props.params.owner;
    var project = this.props.params.name;

    var builds = this.state.builds.map(build => {
      if (owner && build.get('project').owner !== owner) {
        return false;
      }

      if (project && build.get('project').name !== project) {
        return false;
      }

      return (
        <BuildListItem build={build} />
      );
    });

    if (this.state.loading) {
      Action.addAlert({
        message: 'We are currently loading new data from the server',
        iconClasses: 'fa fa-spinner fa-pulse',
        key: 'loading-data'
      });
    } else {
      Action.removeAlert('loading-data');
    }

    clearTimeout(this.fetchTimeout);
    this.fetchTimeout = setTimeout(this.fetch.bind(this), 120000);

    return (
      <div>
        <div className="build-list">
          {builds}
        </div>
      </div>
    );
  }
}

reactMixin(BuildList.prototype, React.addons.PureRenderMixin);

export class BuildListItem extends React.Component {
  render() {
    var build = this.props.build;
    var color = 'orange';

    if (build.get('result') && !build.get('result').still_running) {
      color = build.get('result').succeeded ? 'green' : 'red';
    }

    var classes = 'build ' + color;
    var time = moment(build.get('start_time')).fromNow();
    var port = build.get('deployment') ? build.get('deployment').port : undefined;

    return (
      <Link className={classes} to="build" params={{owner: build.get('project').owner, name: build.get('project').name, buildNumber: build.get('build_number')}}>
        <BuildTitle project={build.get('project')} branch={build.get('branch')} buildNumber={build.get('build_number')} />
        <span className="meta">
          <div className="message">{build.get('short_message')}</div>
          <TimeLink value={time} />
          <HashLink value={build.get('sha')} />
          <AuthorLink value={build.get('author')} />
          <PullRequestLink value={build.get('pull_request_id')} />
          <PRDeploymentLink value={port} />
        </span>
      </Link>
    );
  }
}

reactMixin(BuildListItem.prototype, React.addons.PureRenderMixin);

export class BuildTitle extends React.Component {
  render() {
    if (this.props.size === 2) {
      return (
        <h2>
          {this.props.project.owner} /
          {this.props.project.name} /
          {this.props.branch}
          #{this.props.buildNumber}
        </h2>
      );
    }

    return (
      <h3>
        {this.props.project.owner} /
        {this.props.project.name} /
        {this.props.branch}
        #{this.props.buildNumber}
      </h3>
    );
  }
}

class MetaLink extends React.Component {
  value() {
    return this.props.value;
  }

  render() {
    if (!this.value()) return false;
    var iconClasses = 'fa ' + this.iconClass();

    return (
      <span className="author">
        <i className={iconClasses}></i>
        {this.value()}
      </span>
    );
  }
}

class TimeLink extends MetaLink {
  iconClass() {
    return 'fa-clock-o';
  }
}

class HashLink extends MetaLink {
  value() {
    return this.props.value.substr(0, 7);
  }

  iconClass() {
    return 'fa-slack';
  }
}

class AuthorLink extends MetaLink {
  iconClass() {
    return 'fa-user';
  }
}

class PullRequestLink extends MetaLink {
  iconClass() {
    return 'fa-code-fork fa-rotate-180';
  }
}

class PRDeploymentLink extends MetaLink {
  iconClass() {
    return 'fa-eye';
  }
}
