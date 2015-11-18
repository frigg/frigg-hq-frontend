import React from 'react';

import strings from '../../strings';
import BuildTitle from './build-title';

export default React.createClass({
  displayName: 'ErrorBuildDetails',

  propTypes: {
    build: React.PropTypes.object.isRequired,
  },

  render: function() {
    const {build} = this.props;
    return (
      <div className='build-details'>
        <BuildTitle project={build.project} branch={build.branch} buildNumber={build.build_number} size={2}/>
        <h3 className='text-center'>{strings('BUILD_ERRORED')}</h3>
        <p className='text-center'>{build.result.tasks}</p>
      </div>
    );
  },
});
