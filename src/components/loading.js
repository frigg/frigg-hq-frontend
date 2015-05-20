import React from 'react';

export default class BuildDetails extends React.Component {
  render() {
    var iconClasses = 'loading fa fa-spinner fa-pulse fa-4x'
    if (this.props.minimal === true) iconClasses += ' minimal';
    return (
      <div className="text-center">
        <i className={iconClasses}></i>
      </div>
    );
  }
}
