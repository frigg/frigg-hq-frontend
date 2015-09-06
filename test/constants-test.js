import _ from "lodash";
import {expect} from "chai";

import * as Actions from "../src/constants";

describe("Actions", function () {
  it("should contain the key as a string", function () {
    _.forOwn(Actions, function (key, value) {
      expect(key).to.equal(value);
    });
  });
});
