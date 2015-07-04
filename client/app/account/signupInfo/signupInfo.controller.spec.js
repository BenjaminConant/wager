'use strict';

describe('Controller: SignupInfoCtrl', function () {

  // load the controller's module
  beforeEach(module('wApp'));

  var SignupInfoCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SignupInfoCtrl = $controller('SignupInfoCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
