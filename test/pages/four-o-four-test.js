/* eslint-env mocha */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';

import strings from '../../src/strings';
import {FourOFourPage} from '../../src/pages';


describe('FourOFourPage', () => {

  it("should render component not found string", () => {
    const component = TestUtils.renderIntoDocument(<FourOFourPage />);

    expect(component).to.have.xpath(`//h2[contains(., '${strings('FOUR_O_FOUR')}')]`);
  });
});
