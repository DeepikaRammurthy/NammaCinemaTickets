'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var moviesmappingendpointCtrlStub = {
  index: 'moviesmappingendpointCtrl.index',
  show: 'moviesmappingendpointCtrl.show',
  create: 'moviesmappingendpointCtrl.create',
  update: 'moviesmappingendpointCtrl.update',
  destroy: 'moviesmappingendpointCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var moviesmappingendpointIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './moviesmappingendpoint.controller': moviesmappingendpointCtrlStub
});

describe('Moviesmappingendpoint API Router:', function() {

  it('should return an express router instance', function() {
    expect(moviesmappingendpointIndex).to.equal(routerStub);
  });

  describe('GET /api/moviesmappingendpoints', function() {

    it('should route to moviesmappingendpoint.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'moviesmappingendpointCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/moviesmappingendpoints/:id', function() {

    it('should route to moviesmappingendpoint.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'moviesmappingendpointCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/moviesmappingendpoints', function() {

    it('should route to moviesmappingendpoint.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'moviesmappingendpointCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/moviesmappingendpoints/:id', function() {

    it('should route to moviesmappingendpoint.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'moviesmappingendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/moviesmappingendpoints/:id', function() {

    it('should route to moviesmappingendpoint.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'moviesmappingendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/moviesmappingendpoints/:id', function() {

    it('should route to moviesmappingendpoint.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'moviesmappingendpointCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
