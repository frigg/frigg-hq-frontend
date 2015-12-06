import React from "react";

import connectToStores from '../helpers/connect-to-stores';
import UserStore from '../stores/user-store';

const UserWrapper = React.createClass({
  displayName: "UserWrapper",

  propTypes: {
    children: React.PropTypes.any,
    user: React.PropTypes.object,
  },

  childContextTypes: {
    user: React.PropTypes.object,
  },

  getChildContext() {
    return {
      user: this.props.user,
    };
  },

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  },
})

export default connectToStores(
  UserWrapper,
  [UserStore],
  () => ({user: UserStore.getCurrentUser()})
);
