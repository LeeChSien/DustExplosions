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

      $scope.namePipe = function(name) {
        return (name.length > 2) ? name[0] + '○' + name.substr(2, name.length-2) : name;
      };
    }
  ]);

})();
