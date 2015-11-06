import React from 'react';
/* eslint-disable camelcase */
import {ansi_to_html} from 'ansi_up';
/* eslint-enable */

export default class Task extends React.Component {
  constructor() {
    super();
    this.state = {show: false};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.pending) return;
    const state = this.state;
    state.show = state.show === true ? false : true;
    this.setState(state);
  }

  render() {
    let log = '';
    let classes = 'fa';
    let returnCode = false;

    if (this.props.task.get('pending')) {
      classes += ' fa-spinner fa-pulse orange';
    } else if (this.props.task.get('succeeded')) {
      classes += ' fa-check green';
    } else {
      classes += ' fa-times red';
    }

    if (this.state.show) {
      log = (
        <pre>
          <code dangerouslySetInnerHTML={{__html: ansi_to_html(this.props.task.get('log') || '')}}></code>
        </pre>
      );
    }

    if (!this.props.task.get('pending')) {
      returnCode = (
        <span className="meta">Return code: {this.props.task.get('return_code')}</span>
      );
    }
    return (
      <div className="task">
        <h3 onClick={this.handleClick}>
          <i className={classes}></i>
          {this.props.task.get('task')}
          {returnCode}
        </h3>
        {log}
      </div>
    );
  }
}

Task.propTypes = {
  task: React.PropTypes.object,
};
