import React from 'react';

export default class LogInOutButton extends React.Component {
  render() {
    if (this.props.isAnonymous === false) {
      return (
        <a href="/auth/logout/" className="button">Logout</a>
      );
    }
    return (
      <a href="/auth/login/" className="button">Login</a>
    );
  }
}

LogInOutButton.propTypes = {
  isAnonymous: React.PropTypes.bool,
};
