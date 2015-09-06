/* eslint-disable react/no-multi-comp */
import React from 'react/addons';

import AlertStore from '../stores/alert-store';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class Alerts extends React.Component {

  constructor() {
    super();
    this.state = {alerts: []};
  }

  componentDidMount() {
    AlertStore.addChangeListener(this._onChange.bind(this));
    this.setState({alerts: AlertStore.getAll()});
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
        <ReactCSSTransitionGroup transitionName="alert">
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
  iconClasses: React.PropTypes.string
};
