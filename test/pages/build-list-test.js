/* eslint-env mocha */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';

import Actions from '../../src/actions';
import BuildStore from '../../src/stores/build-store';
import {BuildListPage} from '../../src/pages';

describe('BuildListPage', () => {
  beforeEach(() => sinon.stub(Actions, 'getBuilds'))
  const params = {owner: 'frigg', name: 'frigg-hq'};

  it("should render component", () => {
    sinon.stub(BuildStore, 'getAll').returns([fixtures.BUILD]);
    const component = TestUtils.renderIntoDocument(
      <BuildListPage params={params} />
    );

    expect(component).to.have.xpath('//div[@class="build-list"]')
  });
});
