'use strict';

describe('Component: MoviesmappingComponent', function () {

  // load the controller's module
  beforeEach(module('yeotempApp'));

  var MoviesmappingComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    MoviesmappingComponent = $componentController('moviesmapping', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
