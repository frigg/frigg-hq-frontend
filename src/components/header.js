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
            <a href="/auth/logout/" className="button">Logout</a>
          </div>
        </div>
      </div>
    );
  }
}
