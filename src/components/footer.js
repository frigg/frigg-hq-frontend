import React from 'react';
import {Link} from 'react-router';

export default class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="container">
          <div className="icon-links">
            <a href="https://frigg.io/docs/"><i className="fa fa-book"></i></a>
            <a href="https://github.com/frigg"><i className="fa fa-github-square"></i></a>
            <a href="https://frigg.io/feed.xml"><i className="fa fa-rss-square"></i></a>
            <a href="https://twitter.com/frigg_io"><i className="fa fa-twitter-square"></i></a>
          </div>
          <div className="text-center">
            <a href="https://frigg.io/terms">Terms of Service</a>
          </div>
        </div>
      </div>
    );
  }
}
