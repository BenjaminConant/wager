'use strict';

describe('Service: Bet', function () {

  // load the service's module
  beforeEach(module('wApp'));

  // instantiate service
  var Bet;
  beforeEach(inject(function (_Bet_) {
    Bet = _Bet_;
  }));

  it('should do something', function () {
    expect(!!Bet).toBe(true);
  });

});
