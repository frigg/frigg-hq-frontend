import _ from 'lodash';
import React from 'react';
import moment from 'moment';

export default React.createClass({
  displayName: 'Worker',

  propTypes: {
    host: React.PropTypes.string.isRequired,
    lastSeen: React.PropTypes.string.isRequired,
    versions: React.PropTypes.object.isRequired,
  },

  render: function() {
    return (
      <li>
        <h3>{this.props.host}</h3>
        {moment(this.props.lastSeen).fromNow()}
        <dl className='versions'>
          {_.map(this.props.versions, WorkerDependency)}
        </dl>
      </li>
    );
  },
});

const WorkerDependency = (value, key) => (
  <span key={key}>
    <dt>{key}</dt>
    <dd>{value.current}</dd>
  </span>
);
