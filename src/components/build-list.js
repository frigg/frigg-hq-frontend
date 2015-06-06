import React from 'react';
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
      Action.getBuilds()
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
    if (!this.state.builds.length) return (<Loading />);
    var owner = this.props.params.owner;
    var project = this.props.params.name;

    var builds = this.state.builds.map(build => {
      if (owner && build.project.owner !== owner) {
        return false;
      }

      if (project && build.project.name !== project) {
        return false;
      }

      return (
        <BuildListItem {...build} />
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

export class BuildListItem extends React.Component {
  render() {
    var color = 'orange';
    var author;
    var pullRequest;

    if (this.props.result && !this.props.result.still_running) {
      color = this.props.result.succeeded ? 'green' : 'red';
    }

    var classes = 'build ' + color;
    var time = moment(this.props.start_time).fromNow();

    return (
      <Link className={classes} to="build" params={{owner: this.props.project.owner, name: this.props.project.name, buildNumber: this.props.build_number}}>
        <BuildTitle {...this.props}/>
        <span className="meta">
          <div className="message">{this.props.short_message}</div>
          <TimeLink time={time} />
          <HashLink {...this.props} />
          <AuthorLink {...this.props} />
          <PullRequestLink {...this.props} />
          <PRDeploymentLink {...this.props.deployment} />
        </span>
      </Link>
    );
  }
}

export class BuildTitle extends React.Component {
  render() {
    if (this.props.size === 2) {
      return (
        <h2>
          {this.props.project.owner} /
          {this.props.project.name} /
          {this.props.branch}
          #{this.props.build_number}
        </h2>
      );
    }

    return (
      <h3>
        {this.props.project.owner} /
        {this.props.project.name} /
        {this.props.branch}
        #{this.props.build_number}
      </h3>
    );
  }
}

class MetaLink extends React.Component {
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

  value() {
    return this.props.time;
  }
}

class HashLink extends MetaLink {
  iconClass() {
    return 'fa-slack';
  }

  value() {
    return this.props.sha.substr(0, 7);
  }
}

class AuthorLink extends MetaLink {
  iconClass() {
    return 'fa-user';
  }

  value() {
    return this.props.author;
  }
}

class PullRequestLink extends MetaLink {
  iconClass() {
    return 'fa-code-fork fa-rotate-180';
  }

  value() {
    return this.props.pull_request_id;
  }
}

class PRDeploymentLink extends MetaLink {
  iconClass() {
    return 'fa-eye';
  }

  value() {
    return this.props.port;
  }
}
