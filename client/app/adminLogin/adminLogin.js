'use strict';

angular.module('wApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('adminLogin', {
        url: '/adminLogin',
        templateUrl: 'app/adminLogin/adminLogin.html',
        controller: 'AdminLoginCtrl'
      });
  });