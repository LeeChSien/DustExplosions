(function() {
  angular.module('searchApp',[])

  .controller('mainCtrl', ['$scope', '$http',
    function($scope, $http) {
      $scope.keywords = ""
      $scope.members = [];
      $scope.lastmodify = '';

      $http.get('http://tonyq.org/kptaipei/api-20150628.php').success(function(result) {
        $scope.members = result.data;
        $scope.lastmodify = result.lastmodify;
      });

      $scope.search = function() {
        //
      };

      $scope.namePipe = function() {
        return ($scope.keywords.length > 1) ? $scope.keywords[0] + '○' + $scope.keywords.substr(2, $scope.keywords.length-2) : $scope.keywords;
      };
    }
  ]);

})();
