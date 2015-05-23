import React from 'react';
import request from 'superagent';
import moment from 'moment';

import BuildStore from '../stores/build-store';
import Action from '../actions';
import Loading from './loading';
import {BuildTitle} from './build-list';
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

  fetch() {
    Action.getBuild(
      this.props.params.owner + '/' +
      this.props.params.name + '/' +
      this.props.params.buildNumber
    );
    Action.addAlert({
      message: 'We are currently loading new data from the server',
      iconClasses: 'fa fa-spinner fa-pulse',
      key: 'loading-data'
    });
  }

  componentDidMount() {
    BuildStore.addChangeListener(this._onChange.bind(this));
    this.setState({build: this.get()});
    this.fetch();
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

    if (!build.result || build.result.still_running) {
      clearTimeout(this.fetchTimeout);
      this.fetchTimeout = setTimeout(this.fetch.bind(this), 2000);
    }

    return (
      <div className="build-details">
        <BuildTitle {...build} size={2}/>
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
