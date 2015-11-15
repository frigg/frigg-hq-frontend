/* eslint-disable react/no-multi-comp */
import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';

import BuildTitle from './build-title';
import {getUrlForProject} from '../../helpers/projects';


export default class BuildListItem extends React.Component {

  getUrl() {
    const build = this.props.build;
    return getUrlForProject(build.project) + `${this.props.build.build_number}/`;
  }

  render() {
    const build = this.props.build;
    const classes = 'build ' + build.color;
    const time = moment(build.start_time).fromNow();
    const port = build.deployment ? build.deployment.port : undefined;

    return (
      <Link className={classes} to={this.getUrl()}>
        <BuildTitle project={build.project} branch={build.branch} buildNumber={build.build_number} />
        <span className="meta">
          <div className="message">{build.short_message}</div>
          <TimeLink value={time} />
          <HashLink value={build.sha} />
          <AuthorLink value={build.author} />
          <PullRequestLink value={build.pull_request_id.toString()} />
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
