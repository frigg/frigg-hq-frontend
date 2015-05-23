import React from 'react/addons';

import AlertStore from '../stores/alert-store';

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

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
    var alerts = this.state.alerts.map(alert => {
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
    var icon = false;

    if (this.props.iconClasses) {
      icon = (
        <i className={this.props.iconClasses}></i>
      );
    }

    return (
      <div className="alert">
        {icon}
        {this.props.message}
      </div>
    );
  }
}
