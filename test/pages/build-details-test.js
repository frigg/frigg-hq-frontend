/* eslint-env mocha */
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Actions from '../../src/actions';
import BuildStore from '../../src/stores/build-store';
import {BuildDetailsPage} from '../../src/pages';

describe('BuildDetailsPage', () => {
  beforeEach(() => sinon.stub(Actions, 'getBuild'))
  const params = {owner: 'frigg', name: 'frigg-hq', buildNumber: 100};

  it("should render component", () => {
    sinon.stub(BuildStore, 'getAll').returns(fixtures.BUILD);
    const component = TestUtils.renderIntoDocument(
      <BuildDetailsPage params={params} location={{}} />
    );

    expect(component).to.have.xpath('//div[@class="build-details"]')
  });
});
