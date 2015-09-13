/* eslint-env mocha */
import Promise from 'bluebird';
import sinon from 'sinon';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as ApiService from '../src/api-service';
import http from  '../src/api-service';


chai.use(chaiAsPromised);
const {expect} = chai;

describe('ApiService', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

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

  describe('.getUser()', () => {
    it('should call get with correct url', () => {
      sandbox.stub(http, 'get').returns(Promise.resolve({}));
      expect(ApiService.getUser()).to.eventually.deep.equal({});
      expect(http.get.calledWith('/api/users/me')).to.be.true;
    });
  });

  describe('.getBuild()', () => {
    it('should call get with correct url', () => {
      sandbox.stub(http, 'get').returns(Promise.resolve({}));
      expect(ApiService.getBuild('slug')).to.eventually.deep.equal({});
      expect(http.get.calledWith('/api/builds/slug')).to.be.true;
    });
  });

  describe('.getBuilds()', () => {
    it('should call get with correct url', () => {
      sandbox.stub(http, 'get').returns(Promise.resolve({}));
      expect(ApiService.getBuilds()).to.eventually.deep.equal({});
      expect(http.get.calledWith('/api/builds/')).to.be.true;
    });

    it('should call get with correct url if slug is given', () => {
      sandbox.stub(http, 'get').returns(Promise.resolve({}));
      expect(ApiService.getBuilds('slug')).to.eventually.deep.equal({});
      expect(http.get.calledWith('/api/builds/slug')).to.be.true;
    });
  });
});
