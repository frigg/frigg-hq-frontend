import React from 'react';

import Actions from '../../actions';
import BuildListItem from '../../components/builds/build-list-item';

export default React.createClass({
  displayName: 'BuildList',

  propTypes: {
    builds: React.PropTypes.arrayOf(React.PropTypes.object),
    params: React.PropTypes.object,
  },

  fetch: function() {
    Actions.getBuilds(this.props.params);
  },

  componentDidMount: function() {
    this.fetch();
  },

  render: function() {
    const {owner, project} = this.props.params;

    return (
      <div className='build-list'>
        {this.props.builds.filter(build => {
          if (project && build.project.name !== project) {
            return false;
          }
          if (owner && build.project.owner !== owner) {
            return false
          }
          return true;
        }).map(build => {
          return <BuildListItem key={build.id} build={build} />;
        })}
      </div>
    );
  },
});
