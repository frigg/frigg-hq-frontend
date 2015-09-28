import React from 'react';
import {Link} from 'react-router';

import StaffButton from '../buttons/staff_button';
import LogInOutButton from '../buttons/loginout_button';

export default class Header extends React.Component {

  constructor() {
    super();
    this.state = {online: navigator.onLine};
  }

  componentDidMount() {
    window.addEventListener('online', this.updateOnlineState.bind(this));
    window.addEventListener('offline', this.updateOnlineState.bind(this));
  }

  updateOnlineState() {
    this.setState({online: navigator.onLine});
  }

  render() {
    let offline = false;
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
            <StaffButton href="/stats/" text="Stats" isStaff={this.props.user.get('is_staff')} />
            <StaffButton href="/workers/" text="Workers" isStaff={this.props.user.get('is_staff')} />
            <StaffButton href="/admin/" text="Admin" isStaff={this.props.user.get('is_staff')} />
            <LogInOutButton isAnonymous={this.props.user.get('is_anonymous')} />
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  user: React.PropTypes.object,
};
