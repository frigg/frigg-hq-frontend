import React from 'react';

export default class StaffButton extends React.Component {
  render() {
    if (!this.props.isStaff) return false;
    return (
      <a href={this.props.href} className="button">{this.props.text}</a>
    );
  }
}

StaffButton.propTypes = {
  isStaff: React.PropTypes.bool,
  href: React.PropTypes.string,
  text: React.PropTypes.string,
};
