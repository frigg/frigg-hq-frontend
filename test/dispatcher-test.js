/* eslint-env mocha */
import {Dispatcher} from 'flux';

import {AppDispatcher} from '../src/dispatcher';

describe('Dispatcher', () => {
  describe('.dispatch(payload)', () => {
    let dispatcher;

    beforeEach(() => {
      dispatcher = new AppDispatcher();
    });

    it('should call super.dispatch', (done) => {
      const payload = {actionType: 'FETCH_SOMETHING'};
      const stub = sinon.stub(Dispatcher.prototype, 'dispatch');
      dispatcher.dispatch(payload);

      setTimeout(() => {
        expect(stub.calledWith(payload)).to.be.true;
        done();
      }, 2);
    });

    it('should not throw errors', () => {
      const payload = {actionType: 'FETCH_SOMETHING'};
      sinon.stub(Dispatcher.prototype, 'dispatch').throws();
      sinon.stub(console, 'log');

      expect(() => { dispatcher.dispatch(payload); }).to.not.throw(Error);
    });
  });
});
