(function() {
  angular.module('chartApp',['ui.bootstrap', 'nvd3'])

  .controller('mainCtrl', ['$scope', '$http', '$modal',
    function($scope, $http, $modal) {
      $scope.members = [];
      $scope.lastmodify = '';

      $http.get('http://tonyq.org/kptaipei/api-20150628.php')
      .success(function(result) {
        $scope.members = result.data;
        $scope.lastmodify = result.lastmodify;
      });

      $scope.pieOptions = {
        chart: {
          type: 'pieChart',
          height: 500,
          x: function(d){return d.name;},
          y: function(d){return d.count;},
          showLabels: true,
          showLegend: false,
          transitionDuration: 500,
          labelThreshold: 0.01
        }
      };
    }
  ])

  .controller('hospitalPieChartCtrl', ['$scope',
    function($scope){
      var _hospital;

      $scope.$watch('members', function(members) {
        $scope.hospitalHash = {};
        $scope.hospitals = [];

        // count hospitals
        for (var i = 0; i < members.length; i++) {
          _hospital = members[i]['收治單位'];
          if ($scope.hospitalHash[_hospital] == null)
            $scope.hospitalHash[_hospital] = 1;
          else
            $scope.hospitalHash[_hospital] += 1;
        }

        for (_hospital in $scope.hospitalHash) {
          $scope.hospitals.push({
            name: _hospital,
            count: $scope.hospitalHash[_hospital]
          });
        }

        $scope.hospitals.sort(function(a, b){return b.count - a.count});
      });
    }
  ])

  .controller('damagePieChartCtrl', ['$scope',
    function($scope){
      var _damage;

      $scope.$watch('members', function(members) {
        $scope.damageHash = {};
        $scope.damages = [];

        // count hospitals
        for (var i = 0; i < members.length; i++) {
          _damage = members[i]['救護檢傷'];
          if ($scope.damageHash[_damage] == null)
            $scope.damageHash[_damage] = 1;
          else
            $scope.damageHash[_damage] += 1;
        }

        for (_damage in $scope.damageHash) {
          $scope.damages.push({
            name: _damage ? _damage : '未分類',
            count: $scope.damageHash[_damage]
          });
        }

        $scope.damages.sort(function(a, b){return b.count - a.count});
      });
    }
  ])

  .controller('damageInHospitalPieChartCtrl', ['$scope',
    function($scope){
      var _damage;

      $scope.$watch('members', function(members) {
        $scope.damageHash = {};
        $scope.damages = [];

        // count hospitals
        for (var i = 0; i < members.length; i++) {
          _damage = members[i]['醫療檢傷'];
          if ($scope.damageHash[_damage] == null)
            $scope.damageHash[_damage] = 1;
          else
            $scope.damageHash[_damage] += 1;
        }

        for (_damage in $scope.damageHash) {
          $scope.damages.push({
            name: _damage ? _damage : '未分類',
            count: $scope.damageHash[_damage]
          });
        }

        $scope.damages.sort(function(a, b){return b.count - a.count});
      });
    }
  ]);

})();
