angular.module('TrainerListCtrl', []).controller('TrainerListCtrl', function($scope, $rootScope, $http, $location) {
    $scope.trainers = null;

    $http.get('/api/trainers')
        .success(function(trainers) {
            $scope.trainers = trainers;
        })
        .error(function(errorMessage) {
            $scope.errorMesage = errorMessage;
        });
});