/* eslint-env mocha */
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import {BuildDetailsPage} from '../../src/pages';

describe('BuildDetailsPage', () => {
  const params = {owner: 'frigg', name: 'frigg-hq', buildNumber: 100};

  it("should render component", () => {
    const component = TestUtils.renderIntoDocument(
      <BuildDetailsPage params={params} />
    );

    expect(component).to.have.xpath('//div[@class="build-details"]')
  });
});
