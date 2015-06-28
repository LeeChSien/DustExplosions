(function() {
  angular.module('searchApp',[])

  .controller('mainCtrl', ['$scope', '$http',
    function($scope, $http) {
      $scope.keywords = ""
      $scope.members = [];
      $scope.lastmodify = '';

      $http.get('https://gist.githubusercontent.com/tony1223/098e45623c73274f7ae3/raw').success(function(result) {
        $scope.members = result.data;
        $scope.lastmodify = result.lastmodify;
      });

      $scope.search = function() {
        //
      };

      $scope.namePipe = function() {
        if ($scope.keywords.length > 1)
          return $scope.keywords[0] + '○' + $scope.keywords.substr(2, $scope.keywords.length-2);
        else
          return $scope.keywords;
      };
    }
  ]);

})();
