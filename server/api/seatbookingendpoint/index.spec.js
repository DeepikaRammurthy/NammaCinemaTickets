'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var seatbookingendpointCtrlStub = {
  index: 'seatbookingendpointCtrl.index',
  show: 'seatbookingendpointCtrl.show',
  create: 'seatbookingendpointCtrl.create',
  update: 'seatbookingendpointCtrl.update',
  destroy: 'seatbookingendpointCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var seatbookingendpointIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './seatbookingendpoint.controller': seatbookingendpointCtrlStub
});

describe('Seatbookingendpoint API Router:', function() {

  it('should return an express router instance', function() {
    expect(seatbookingendpointIndex).to.equal(routerStub);
  });

  describe('GET /api/seatbookingendpoints', function() {

    it('should route to seatbookingendpoint.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'seatbookingendpointCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/seatbookingendpoints/:id', function() {

    it('should route to seatbookingendpoint.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'seatbookingendpointCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/seatbookingendpoints', function() {

    it('should route to seatbookingendpoint.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'seatbookingendpointCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/seatbookingendpoints/:id', function() {

    it('should route to seatbookingendpoint.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'seatbookingendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/seatbookingendpoints/:id', function() {

    it('should route to seatbookingendpoint.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'seatbookingendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/seatbookingendpoints/:id', function() {

    it('should route to seatbookingendpoint.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'seatbookingendpointCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
