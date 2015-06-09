import React from 'react';

export default class Loading extends React.Component {
  render() {
    var message = false;
    var classes = 'text-center';
    var iconClasses = 'loading fa fa-spinner fa-pulse fa-4x';

    return (
      <div className={classes}>
        {message} <i className={iconClasses}></i>
      </div>
    );
  }
}
