import React from 'react';
import request from 'superagent';
import moment from 'moment';

import BuildStore from '../stores/build-store';
import Action from '../actions';
import Loading from './loading';

export default class Task extends React.Component {
  constructor() {
    super();
    this.state = {show: false};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (this.props.pending) return;
    var state = this.state;
    state.show = state.show === true ? false : true;
    this.setState(state);
  }

  render() {
    var log = '';
    var classes = 'fa';
    var returnCode = false;

    if(this.props.pending) {
      classes += ' fa-spinner fa-pulse orange';
    } else if (this.props.succeeded) {
      classes += ' fa-check green';
    } else {
      classes += ' fa-times red'
    }

    //FIXME, colorify

    if (this.state.show) {
      log = (
        <pre>
          <code>
            {this.props.log}
          </code>
        </pre>
      );
    }

    if (!this.props.pending) {
      returnCode = (
        <span className="meta">Return code: {this.props.return_code}</span>
      );
    }

    return (
      <div className="task">
        <h3 onClick={this.handleClick}>
          <i className={classes}></i>
          {this.props.task}
          {returnCode}
        </h3>
        {log}
      </div>
    );
  }
}
