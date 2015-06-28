(function() {
  angular.module('searchApp',[])

  .controller('mainCtrl', ['$scope', '$http',
    function($scope, $http) {
      $scope.model = {foo: 'bar'};
      $scope.keywords = ""
      $scope.members = [];

      $http.get('./data.json').success(function(result) {
        $scope.members = result;
      });

      $scope.search = function() {
        //
      };

      $scope.namePipe = function() {
        if ($scope.keywords.length == 3)
          return $scope.keywords[0] + '○' + $scope.keywords[2];
        else
          return $scope.keywords;
      };
    }
  ]);

})();
