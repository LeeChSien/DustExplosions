(function() {
  angular.module('searchApp',['ui.bootstrap', 'leaflet-directive'])

  .controller('mainCtrl', ['$scope', '$http', '$modal',
    function($scope, $http, $modal) {
      $scope.keywords = ""
      $scope.members = [];
      $scope.hospitals = {};

      $scope.lastmodify = '';

      $http.get('//tonyq.org/kptaipei/api-20150628.php')
      .success(function(result) {
        $scope.members = result.data;
        $scope.lastmodify = result.lastmodify;
      });

      $http.get('//raw.githubusercontent.com/harry2690/psof/gh-pages/hospitals.json')
      .success(function(result) {
        for (var i = 0; i < result.data.length; i++) {
          $scope.hospitals[result.data[i]['醫院名稱']] = result.data[i];
        }
      });

      $scope.openHospitalModal = function ($event, hospital) {
        $event.preventDefault();

        var modalInstance = $modal.open({
          //size: 'lg',
          templateUrl: 'hospitalModalContent.html',
          controller: 'hospitalModalInstanceCtrl',
          resolve: {
            '$http': function() {
              return $http;
            },
            hospital: function () {
              return hospital;
            }
          }
        });
      };

      $scope.namePipe = function() {
        return ($scope.keywords.length > 1) ? $scope.keywords[0] + '○' + $scope.keywords.substr(2, $scope.keywords.length-2) : $scope.keywords;
      };

      $scope.statusClass = function(status) {
        return (status.indexOf('出院') != -1) ? ' label-success' : ' label-primary'
      };
    }
  ])

  .controller('hospitalModalInstanceCtrl', ['$scope', '$modalInstance', '$http', 'hospital',
    function ($scope, $modalInstance, $http, hospital) {
      $scope.hospital = hospital;

      $scope.close = function () {
        $modalInstance.dismiss('cancel');
      };

      $scope.center = {
        lat: 25.047923,
        lng: 121.5170907,
        zoom: 16
      };

      $scope.layers = {
        baselayers: {
          googleTerrain: {
            name: 'Google Terrain',
            layerType: 'TERRAIN',
            type: 'google'
          },
          googleRoadmap: {
            name: 'Google Streets',
            layerType: 'ROADMAP',
            type: 'google'
          }
        }
      };

      $scope.markers = {};

      if ($scope.hospital['地址']) {
        $http.get('//maps.googleapis.com/maps/api/geocode/json?address=' + $scope.hospital['地址'])
        .success(function(result) {
          $scope.markers = {
            hospital: {
              lat: result.results[0].geometry.location.lat,
              lng: result.results[0].geometry.location.lng,
              message: $scope.hospital['醫院名稱'],
              focus: true
            }
          };

          $scope.center = {
            lat: result.results[0].geometry.location.lat,
            lng: result.results[0].geometry.location.lng,
            zoom: 16
          };
        })
      }
    }
  ]);

})();
