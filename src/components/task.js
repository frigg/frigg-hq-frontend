import React from 'react';
import request from 'superagent';
import moment from 'moment';

import BuildStore from '../stores/build-store';
import Action from '../actions';
import Loading from './loading';

export class Task extends React.Component {
  constructor() {
    super();
    this.state = {show: false};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    var state = this.state;
    state.show = state.show === true ? false : true;
    this.setState(state);
  }

  render() {
    var classes = 'fa fa-check green';
    var log = '';
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

    return (
      <div className="task">
        <h3 onClick={this.handleClick}>
          <i className={classes}></i>
          {this.props.task}
          <span className="meta">Return code: {this.props.return_code}</span>
        </h3>
        {log}
      </div>
    );
  }
}
