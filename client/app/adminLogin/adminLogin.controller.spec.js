'use strict';

describe('Controller: AdminLoginCtrl', function () {

  // load the controller's module
  beforeEach(module('wApp'));

  var AdminLoginCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminLoginCtrl = $controller('AdminLoginCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
