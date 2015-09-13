/* eslint-env mocha */
import React from 'react/addons';
import {expect} from 'chai';

import {DeploymentDetailsPage} from '../../src/pages';

const {TestUtils} = React.addons;

describe('DeploymentDetailsPage', () => {
  const params = {owner: 'frigg', name: 'frigg-hq', buildNumber: 100};

  it("should render component", () => {
    DeploymentDetailsPage.pro
    let component = TestUtils.renderIntoDocument(
      <DeploymentDetailsPage params={params} />
    );

    expect(TestUtils.findRenderedDOMComponentWithTag(component, 'div')).to.be.truthy;
  });
});
