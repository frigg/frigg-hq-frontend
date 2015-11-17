/* eslint-env mocha */
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import {WorkerStatsPage} from '../../src/pages';

describe('WorkerPage', () => {

  it("should render component", () => {
    const component = TestUtils.renderIntoDocument(<WorkerStatsPage />);

    expect(component).to.have.xpath('//div[@class="worker-stats-page"]')
  });
});
