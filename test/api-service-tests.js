/* eslint-env mocha */
import Promise from 'bluebird';
import * as ApiService from '../src/api-service';
import http from  '../src/api-service';

describe('ApiService', () => {
  describe('.transformForFrontend(payload)', () => {
    it('should turn snakecase into camelcase', () => {
      const output = ApiService.transformForFrontend({'is_pending': true});
      expect(output).to.deep.equal({isPending: true});
    });
  });

  describe('.transformForBackend(payload)', () => {
    it('should turn camelcase into snakecase', () => {
      const output = ApiService.transformForBackend({'isPending': true});
      expect(output).to.deep.equal({is_pending: true});
    });
  });

  describe('.transformWorkerStats(payload)', () => {
    const output = ApiService.transformWorkerStats(fixtures.WORKER_STATS);

    it('should transform stats into a list of workers', () => {
      expect(output).to.contain.key('workers');
      expect(output.workers.constructor).to.equal(Array);
    });

    it('should set last seen on worker object', () => {
      const worker = output.workers[0];
      expect(worker).to.contain.key('lastSeen');
      expect(worker.lastSeen).to.equal('2015-11-15T11:01:14.700Z');
    });


    it('should set versions on worker object', () => {
      const worker = output.workers[0];
      expect(worker).to.contain.key('versions');
      expect(worker.versions).to.contain.key('worker');
    });

    it('should set host on worker object', () => {
      const worker = output.workers[0];
      expect(worker).to.contain.key('host');
      expect(worker.host).to.equal('ron.frigg.io');
    });
  });

  describe('.getUser()', () => {
    it('should call get with correct url', () => {
      sinon.stub(http, 'get').returns(Promise.resolve({}));
      expect(ApiService.getUser()).to.eventually.deep.equal({});
      expect(http.get.calledWith('/api/users/me')).to.be.true;
    });
  });

  describe('.getBuild()', () => {
    it('should call return object', () => {
      sinon.stub(http, 'get').returns(Promise.resolve({}));
      sinon.stub(ApiService, 'createSlug').returns('slug');
      expect(ApiService.getBuild({})).to.eventually.deep.equal({});
    });
  });

  describe('.getBuilds()', () => {
    it('should call get with correct url', () => {
      sinon.stub(http, 'get').returns(Promise.resolve({}));
      expect(ApiService.getBuilds({})).to.eventually.deep.equal({});
      expect(http.get.calledWith('/api/builds/')).to.be.true;
    });
  });
});
