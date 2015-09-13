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
    let h2 = TestUtils.findRenderedDOMComponentWithTag(component, 'h2');

    expect(h2.getDOMNode().innerHTML).to.equal(strings('FOUR_O_FOUR'));
  });
});
