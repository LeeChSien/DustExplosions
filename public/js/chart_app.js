(function() {
  angular.module('chartApp',['ui.bootstrap', 'nvd3'])

  .controller('mainCtrl', ['$scope', '$http', '$modal',
    function($scope, $http, $modal) {
      $scope.members = [];
      $scope.lastmodify = '';

      $http.get('//tonyq.org/kptaipei/api-20150628.php')
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
          valueFormat: function(d){
            return d3.format('d')(d);
          },
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
  ])

  .controller('countryPieChartCtrl', ['$scope',
    function($scope){
      var _country;

      $scope.$watch('members', function(members) {
        $scope.countryHash = {};
        $scope.countries = [];

        for (var i = 0; i < members.length; i++) {
          _country = members[i]['縣市別'];
          if ($scope.countryHash[_country] == null)
            $scope.countryHash[_country] = 1;
          else
            $scope.countryHash[_country] += 1;
        }

        for (_country in $scope.countryHash) {
          $scope.countries.push({
            name: _country ? _country : '未分類',
            count: $scope.countryHash[_country]
          });
        }

        $scope.countries.sort(function(a, b){return b.count - a.count});
      });
    }
  ])

  .controller('discreteBarChartCtrl', ['$scope',
    function($scope){
      var age;

      $scope.$watch('members', function(members) {
        $scope.people = [];
        for (var i = 1; i < 10; i++) {
          $scope.people.push({name: i*10 + '~' + (i+1)*10, count: 0});
        }

        for (var i = 0; i < members.length; i++) {
          if (members[i]['年齡']) {
            age = members[i]['年齡'];
            if ($scope.people[((age-(age%10))/10)-1]) { $scope.people[((age-(age%10))/10)-1].count += 1; }
          }
        }
      });
    }
  ]);

})();
