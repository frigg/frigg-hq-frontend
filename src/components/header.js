import React from 'react';
import {Link} from 'react-router';

export default class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="container">
          <Link to="builds" className="brand">Frigg CI</Link>
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
