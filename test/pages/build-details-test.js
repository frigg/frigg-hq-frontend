/* eslint-env mocha */
import React from 'react/addons';
import {expect} from 'chai';

import {BuildDetailsPage} from '../../src/pages';

const {TestUtils} = React.addons;

describe('BuildDetailsPage', () => {
  const params = {owner: 'frigg', name: 'frigg-hq', buildNumber: 100};

  it("should render component", () => {
    BuildDetailsPage.pro
    let component = TestUtils.renderIntoDocument(
      <BuildDetailsPage params={params} />
    );

    expect(TestUtils.findRenderedDOMComponentWithTag(component, 'div')).to.be.truthy;
  });
});
