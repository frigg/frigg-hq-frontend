/* eslint-env mocha */
import sinon from 'sinon';
import {expect} from 'chai';
import {Dispatcher} from 'flux';

import {AppDispatcher} from '../src/dispatcher';

describe('Dispatcher', () => {
  describe('.dispatch(payload)', () => {
    let sandbox;
    let dispatcher;

    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      dispatcher = new AppDispatcher();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should call super.dispatch', (done) => {
      const payload = {actionType: 'FETCH_SOMETHING'};
      const stub = sandbox.stub(Dispatcher.prototype, 'dispatch');
      dispatcher.dispatch(payload);

      setTimeout(() => {
        expect(stub.calledWith(payload)).to.be.true;
        done();
      }, 2);
    });

    it('should not throw errors', () => {
      const payload = {actionType: 'FETCH_SOMETHING'};
      sandbox.stub(Dispatcher.prototype, 'dispatch').throws();
      sandbox.stub(console, 'log');

      expect(() => { dispatcher.dispatch(payload); }).to.not.throw(Error);

      sandbox.restore();
    });
  });
});
