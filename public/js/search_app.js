(function() {
  angular.module('searchApp',[])

  .controller('mainCtrl', ['$scope', '$http',
    function($scope, $http) {
      $scope.model = {foo: 'bar'};
      $scope.members = [];

      $http.get('./data.json').success(function(result) {
        $scope.members = result;
      });
    }
  ]);

})();
