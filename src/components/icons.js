import React from 'react';

export class BooleanIcon extends React.Component {
  render() {
    var classes = 'fa ' + (!!this.props.value ? 'fa-check' : 'fa-times');

    return (
      <i className={classes} title={!!this.props.value ? 'Yes' : 'No'}></i>
    );
  }
}
