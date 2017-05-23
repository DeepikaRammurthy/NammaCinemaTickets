'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var seatbookendpointCtrlStub = {
  index: 'seatbookendpointCtrl.index',
  show: 'seatbookendpointCtrl.show',
  create: 'seatbookendpointCtrl.create',
  update: 'seatbookendpointCtrl.update',
  destroy: 'seatbookendpointCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var seatbookendpointIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './seatbookendpoint.controller': seatbookendpointCtrlStub
});

describe('Seatbookendpoint API Router:', function() {

  it('should return an express router instance', function() {
    expect(seatbookendpointIndex).to.equal(routerStub);
  });

  describe('GET /api/seatbookendpoints', function() {

    it('should route to seatbookendpoint.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'seatbookendpointCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/seatbookendpoints/:id', function() {

    it('should route to seatbookendpoint.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'seatbookendpointCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/seatbookendpoints', function() {

    it('should route to seatbookendpoint.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'seatbookendpointCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/seatbookendpoints/:id', function() {

    it('should route to seatbookendpoint.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'seatbookendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/seatbookendpoints/:id', function() {

    it('should route to seatbookendpoint.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'seatbookendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/seatbookendpoints/:id', function() {

    it('should route to seatbookendpoint.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'seatbookendpointCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
