import React from 'react';
import stripAnsi from 'strip-ansi'

export default class Task extends React.Component {
  constructor() {
    super();
    this.state = {show: false};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.task.pending) return;
    const state = this.state;
    state.show = state.show === true ? false : true;
    this.setState(state);
  }

  render() {
    let log = '';
    let classes = 'fa';
    let returnCode = false;

    if (this.props.task.pending) {
      classes += ' fa-spinner fa-pulse orange';
    } else if (this.props.task.succeeded) {
      classes += ' fa-check green';
    } else {
      classes += ' fa-times red';
    }

    if (this.state.show) {
      log = (
        <pre>
          <code>{stripAnsi(this.props.task.log || '')}</code>
        </pre>
      );
    }

    if (!this.props.task.pending) {
      returnCode = (
        <span className='meta'>Return code: {this.props.task.return_code}</span>
      );
    }
    return (
      <div className='task'>
        <h3 onClick={this.handleClick}>
          <i className={classes}></i>
          {this.props.task.task}
          {returnCode}
        </h3>
        {log}
      </div>
    );
  }
}

Task.propTypes = {
  task: React.PropTypes.object.isRequired,
};
