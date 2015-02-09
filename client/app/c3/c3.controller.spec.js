'use strict';

describe('Controller: C3Ctrl', function () {

  // load the controller's module
  beforeEach(module('serveMeApp'));

  var C3Ctrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    C3Ctrl = $controller('C3Ctrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
