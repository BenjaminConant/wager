'use strict';

angular.module('wApp')
  .factory('Bet', function ($http) {
   
    return {
      get: function () {
        return $http.get('/api/bets');
      },
      update: function(bet) {
      	return $http.put('/api/bets/' + bet._id, bet);
      }
    };
  });
