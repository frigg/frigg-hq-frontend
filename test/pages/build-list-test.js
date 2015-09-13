/* eslint-env mocha */
import React from 'react/addons';
import {expect} from 'chai';

import {BuildListPage} from '../../src/pages';

const {TestUtils} = React.addons;

describe('BuildListPage', () => {
  const params = {owner: 'frigg', name: 'frigg-hq'};

  it("should render component", () => {
    let component = TestUtils.renderIntoDocument(
      <BuildListPage params={params}/>
    );

    expect(TestUtils.findRenderedDOMComponentWithTag(component, 'div')).to.be.truthy;
  });
});
