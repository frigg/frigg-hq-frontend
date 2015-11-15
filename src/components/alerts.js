/* eslint-disable react/no-multi-comp */
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import AlertStore from '../stores/alert-store';

export default class Alerts extends React.Component {

  constructor() {
    super();
    this.state = {alerts: []};
  }

  componentDidMount() {
    this.setState({alerts: AlertStore.getAll()});
  }

  componentWillMount() {
    AlertStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    AlertStore.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.setState({alerts: AlertStore.getAll()});
  }

  render() {
    const alerts = this.state.alerts.map(alert => {
      return (<Alert {...alert} />);
    });

    return (
      <div className="alerts">
        <ReactCSSTransitionGroup transitionName="alert" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        {alerts}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export class Alert extends React.Component {
  render() {
    let icon = false;
    let classes = 'alert';
    if (this.props.alertType) classes += ' alert-' + this.props.alertType;

    if (this.props.iconClasses) {
      icon = (
        <i className={this.props.iconClasses}></i>
      );
    }

    return (
      <div className={classes}>
        {icon}
        {this.props.message}
      </div>
    );
  }
}

Alert.propTypes = {
  alertType: React.PropTypes.string,
  message: React.PropTypes.string,
  iconClasses: React.PropTypes.string,
};
