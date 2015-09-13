/* eslint-disable react/no-multi-comp */
import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';

import BuildTitle from './build-title';


export default class BuildListItem extends React.Component {
  render() {
    const build = this.props.build;
    const classes = 'build ' + build.get('color');
    const time = moment(build.get('start_time')).fromNow();
    const port = build.get('deployment') ? build.get('deployment').port : undefined;

    return (
      <Link className={classes} to="build" params={{owner: build.get('project').owner, name: build.get('project').name, buildNumber: build.get('build_number')}}>
        <BuildTitle project={build.get('project')} branch={build.get('branch')} buildNumber={build.get('build_number')} />
        <span className="meta">
          <div className="message">{build.get('short_message')}</div>
          <TimeLink value={time} />
          <HashLink value={build.get('sha')} />
          <AuthorLink value={build.get('author')} />
          <PullRequestLink value={build.get('pull_request_id')} />
          <PRDeploymentLink value={port} />
        </span>
      </Link>
    );
  }
}

BuildListItem.propTypes = {
  build: React.PropTypes.object,
};

class MetaLink extends React.Component {
  value() {
    return this.props.value;
  }

  render() {
    if (!this.value()) return false;
    const iconClasses = 'fa ' + this.iconClass();

    return (
      <span className="author">
        <i className={iconClasses}></i>
        {this.value()}
      </span>
    );
  }
}

MetaLink.propTypes = {
  value: React.PropTypes.string,
};

class TimeLink extends MetaLink {
  iconClass() {
    return 'fa-clock-o';
  }
}

class HashLink extends MetaLink {
  value() {
    return this.props.value.substr(0, 7);
  }

  iconClass() {
    return 'fa-slack';
  }
}

class AuthorLink extends MetaLink {
  iconClass() {
    return 'fa-user';
  }
}

class PullRequestLink extends MetaLink {
  iconClass() {
    return 'fa-code-fork fa-rotate-180';
  }
}

class PRDeploymentLink extends MetaLink {
  iconClass() {
    return 'fa-eye';
  }
}
