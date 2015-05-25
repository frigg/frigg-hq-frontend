import React from 'react';
import {Link} from 'react-router';

export default class Header extends React.Component {

  constructor() {
    super();
    this.state = {online: navigator.onLine};
  }

  componentDidMoun() {
    window.addEventListener('online', this.updateOnlineState.bind(this));
    window.addEventListener('offline', this.updateOnlineState.bind(this));
  }

  updateOnlineState() {
    this.setState({online: navigator.onLine});
  }

  render() {
    var offline = false;
    if (!this.state.online) offline = (<span className="offline">offline</span>);

    return (
      <div className="header">
        <div className="container">
          <Link to="builds" className="brand">
            Frigg CI
            {offline}
          </Link>
          <div className="navigation">
            <Link to="builds" className="button">Builds</Link>
            <StaffButton href="/stats/" text="Stats" {...this.props.user} />
            <StaffButton href="/admin/" text="Admin" {...this.props.user} />
            <LogInOutButton {...this.props.user} />
          </div>
        </div>
      </div>
    );
  }
}

export class LogInOutButton extends React.Component {
  render() {
    if (this.props.is_anonymous === false) {
      return (
        <a href="/auth/logout/" className="button">Logout</a>
      );
    } else {
      return (
        <a href="/auth/login/" className="button">Login</a>
      );
    }
  }
}


export class StaffButton extends React.Component {
  render() {
    if (this.props.is_staff === false) return false;
    return (
      <a href={this.props.href} className="button">{this.props.text}</a>
    );
  }
}
