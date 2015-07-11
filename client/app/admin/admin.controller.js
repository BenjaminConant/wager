'use strict';

angular.module('wApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, Bet) {

    // Use the User $resource to fetch all users
   
    function getData() {
      $scope.users = User.query();
      Bet.get().then(function(res){
        $scope.bets = res.data;
        console.log($scope.bets);
      })
    }
    getData();

    $scope.refreshData = function(){
      console.log("got called")
      getData();
    }


    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };

    $scope.betStatus = function(bet) {
      console.log(bet);
      if (!bet.taker) {
        return 'untaken';
      } else if (bet.settled) {
        return 'settled'
      } else if (bet.maker && bet.taker && !bet.settled) {
        return 'taken'
      }
    };

    
    $scope.makerWins = function(bet){
      bet.settled = true;
      bet.winner = bet.maker._id;
      bet.maker = bet.maker._id;
      bet.taker = bet.taker._id;
      Bet.update(bet).then(function(res){
        console.log("updated bet", res.data);
        bet.maker = res.data.maker;
        bet.taker = res.data.taker;
        bet.winner = res.data.winner;
        bet.settled = res.data.settled;
      })
      
    }

    $scope.takerWins = function(bet){
      bet.settled = true;
      bet.winner = bet.taker._id;
      bet.maker = bet.maker._id;
      bet.taker = bet.taker._id;
      Bet.update(bet).then(function(res){
        console.log("updated bet", res.data);
        bet.maker = res.data.maker;
        bet.taker = res.data.taker;
        bet.winner = res.data.winner;
        bet.settled = res.data.settled;
      })
    }

    $scope.noWinner = function(bet){
      bet.settled = true;
      bet.maker = bet.maker._id;
      bet.taker = bet.taker._id;
      Bet.update(bet).then(function(res){
        console.log("updated bet", res.data);
        bet.maker = res.data.maker;
        bet.taker = res.data.taker;
        bet.winner = res.data.winner;
        bet.settled = res.data.settled;
      })
      console.log("got called")
      getData();
    }



  });
