/* eslint-env mocha */
import _ from 'lodash';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';

import {DeploymentDetailsPage} from '../../src/pages';
import BuildStore from '../../src/stores/build-store';

const deployment = {};
const BUILD = _.assign({}, fixtures.BUILD, {deployment});

describe('DeploymentDetailsPage', () => {
  const params = {owner: 'frigg', name: 'frigg-hq', buildNumber: 100};

  it("should render component", () => {
    sinon.stub(BuildStore, 'getBuild').returns(BUILD);
    const component = TestUtils.renderIntoDocument(
      <DeploymentDetailsPage params={params} />
    );

    expect(component).to.have.xpath('//div[@class="deployment-details"]')
  });
});
