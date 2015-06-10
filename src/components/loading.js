import React from 'react';

import strings from '../strings';

export default class Loading extends React.Component {
  render() {
    var message = false;
    var classes = 'text-center loading';
    var iconClasses = 'fa fa-spinner fa-pulse fa-4x';

    if (!navigator.onLine) {
      message = (
        <h2>{strings.OFFLINE_NO_DATA}</h2>
      );
    }

    return (
      <div className={classes}>
        {message}
        <p><i className={iconClasses}></i></p>
      </div>
    );
  }
}
