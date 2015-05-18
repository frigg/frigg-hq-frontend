import React from 'react';
import {Link} from 'react-router';

export default class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="container">
          <Link to="/" className="brand">Frigg CI</Link>
          <div className="navigation">
            <Link to="/" className="button">Builds</Link>
            <Link to="/logout" className="button">Logout</Link>
          </div>
        </div>
      </div>
    );
  }
}
