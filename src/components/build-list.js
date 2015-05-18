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
    this.state = {builds: []};
  }

  componentDidMount() {
    BuildStore.addChangeListener(this._onChange.bind(this));
    this.setState({builds: BuildStore.getAll()});
    Action.getBuilds();
  }

  componentWillUnmount() {
    BuildStore.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.setState({builds: BuildStore.getAll()});
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
        <Build {...build} />
      );
    });

    return (
      <div className="build-list">
        {builds}
      </div>
    );
  }
}

class Build extends React.Component {
  render() {
    var color = 'orange';
    var author;
    var pullRequest;

    if (this.props.result) {
      color = (this.props.result.succeeded ? 'green' : 'red');
    }

    var classes = 'build ' + color;
    var time = moment(this.props.start_time).fromNow();

    return (
      <Link className={classes} to="build" params={{owner: this.props.project.owner, name: this.props.project.name, buildNumber: this.props.build_number}}>
        <h3>
          {this.props.project.owner} /
          {this.props.project.name} /
          {this.props.branch}
          #{this.props.build_number}
        </h3>
        <span className="meta">
          <div className="message">{this.props.short_message}</div>
          <span className="timestamp"><i className="fa fa-clock-o"></i> {time}</span>
          <span className="sha"><i className="fa fa-slack"></i> {this.props.sha.substr(0, 7)}</span>
          <AuthorLink {...this.props} />
          <PullRequestLink {...this.props} />
        </span>
      </Link>
    );
  }
}

class AuthorLink extends React.Component {
  render() {
    if (!this.props.author) return false;

    var url = 'https://github.com/' + this.props.author;
    return (
      <span className="author">
        <i className="fa fa-user"></i>
        {this.props.author}
      </span>
    );
  }
}

class PullRequestLink extends React.Component {
  render() {
    if (this.props.pull_request_id == 0) return false;
    return (
      <span className="pull-request">
        <i className="fa fa-code-fork fa-rotate-180"></i>
        {this.props.pull_request_id}
      </span>
    );
  }
}
