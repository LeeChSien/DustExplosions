(function() {
  angular.module('searchApp',[])

  .controller('mainCtrl', ['$scope', '$http',
    function($scope, $http) {
      var json = require('./data.json');

      $scope.model = {foo: 'bar'};

      $http.get('./data.json').success(function(result) {
        console.log(result)
      });
    }
  ]);

})();
