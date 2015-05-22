import React from 'react';
import request from 'superagent';
import moment from 'moment';

import BuildStore from '../stores/build-store';
import Action from '../actions';
import Loading from './loading';
import Task from './task';


export default class BuildDetails extends React.Component {

  constructor() {
    super();
    this.state = {build: null};
  }

  get() {
    return BuildStore.getBuild(
      this.props.params.owner,
      this.props.params.name,
      this.props.params.buildNumber
    );
  }

  componentDidMount() {
    BuildStore.addChangeListener(this._onChange.bind(this));
    this.setState({build: this.get()});
    Action.getBuild(
      this.props.params.owner + '/' +
      this.props.params.name + '/' +
      this.props.params.buildNumber
    );
  }

  componentWillUnmount() {
    BuildStore.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.setState({build: this.get()});
  }

  render() {
    var build = this.state.build;

    if (!build) return (<Loading />);

    var tasks = false;
    var state = 'Pending';

    if (build.result) {
      if (!build.result.still_running) {
        state = build.result.succeeded ? 'Success' : 'Failure';
      }

      tasks = this.state.build.result.tasks.map(task => {
        task.key = task.task;
        return (<Task {...task} />)
      });
    }

    return (
      <div className="build-details">
        <h2>
          {build.project.owner} /
          {build.project.name} /
          {build.branch}
          #{build.build_number}
        </h2>
        <div className="details">
          <strong>Branch:</strong> {build.branch} <br/>
          <strong>Commit hash:</strong> {build.sha} <br/>
          <strong>Author:</strong> {build.author} <br/>
          <strong>Timestamp:</strong> {moment(build.start_time).fromNow()}<br/>
          <strong>State:</strong> {state}
          <Coverage result={build.result} />
        </div>
        <div className="message">
          {build.message}
        </div>
        <div className="tasks">{tasks}</div>
      </div>
    );
  }
}

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
