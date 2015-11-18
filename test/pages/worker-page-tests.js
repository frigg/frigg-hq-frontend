/* eslint-env mocha */
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Actions from '../../src/actions';
import {WorkerStatsPage} from '../../src/pages';

describe('WorkerPage', () => {
  beforeEach(() => sinon.stub(Actions, 'getWorkerStats'))

  it('should render component', () => {
    const component = TestUtils.renderIntoDocument(<WorkerStatsPage />);

    expect(component).to.have.xpath('//div[@class="worker-stats-page"]')
  });
});
