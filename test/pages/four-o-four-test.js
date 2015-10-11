/* eslint-env mocha */
import React from 'react/addons';
import {expect} from 'chai';

import strings from '../../src/strings';
import {FourOFourPage} from '../../src/pages';

const {TestUtils} = React.addons;

describe('FourOFourPage', () => {

  it("should render component not found string", () => {
    FourOFourPage.pro
    let component = TestUtils.renderIntoDocument(<FourOFourPage />);
    let header = TestUtils.findRenderedDOMComponentWithTag(component, 'h2');

    expect(header.getDOMNode().innerHTML).to.equal(strings('FOUR_O_FOUR'));
  });
});
