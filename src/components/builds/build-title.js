import React from 'react';
import {Map} from 'immutable';

export default class BuildTitle extends React.Component {
  constructor() {
    super();
    this.props = {project: Map()}
  }

  render() {
    if (!this.props.project) return false;
    if (this.props.size === 2) {
      return (
        <h2>
          {this.props.project.owner} /
          {this.props.project.name} /
          {this.props.branch}
          #{this.props.buildNumber}
        </h2>
      );
    }

    return (
      <h3>
        {this.props.project.owner} /
        {this.props.project.name} /
        {this.props.branch}
        #{this.props.buildNumber}
      </h3>
    );
  }
}

BuildTitle.propTypes = {
  project: React.PropTypes.object,
  branch: React.PropTypes.string,
  size: React.PropTypes.number,
  buildNumber: React.PropTypes.number,
};
