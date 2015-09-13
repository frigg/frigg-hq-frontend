import React from 'react/addons';

export class BooleanIcon extends React.Component {
  render() {
    const classes = 'fa ' + (!!this.props.value ? 'fa-check' : 'fa-times');

    return (
      <i className={classes} title={!!this.props.value ? 'Yes' : 'No'}></i>
    );
  }
}

BooleanIcon.propTypes = {
  value: React.PropTypes.boolean,
};
