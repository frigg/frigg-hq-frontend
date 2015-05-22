import React from 'react';

export default class Loading extends React.Component {
  render() {
    var message = false;
    var classes = 'text-center';
    var iconClasses = 'loading fa fa-spinner fa-pulse';

    if (this.props.minimal === true) {
      iconClasses += ' minimal';
      classes += ' alert alert-info'
      message = 'We are fetching the latest builds for you';
    } else {
      iconClasses += ' fa-4x';
    }

    return (
      <div className={classes}>
        {message} <i className={iconClasses}></i>
      </div>
    );
  }
}
