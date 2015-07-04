'use strict';

angular.module('wApp')
  .controller('SignupInfoCtrl', function ($scope, Auth, $http) {
  	var user = Auth.getCurrentUser()
    $scope.number = '';
    $scope.setNumber = function() {
      console.log($scope.number);
      console.log(user);
      $http.post('/api/users/setNumber', {id: user._id, number: $scope.number})
      .then(function(res){
      	console.log(res);
      	user = res.data;
      	$scope.number = 'Thanks! Check ya phone fr a txt!'
      })
      .then(null, function(err){
      	console.log(err);
      })
    };
  });
