angular.module('NewTrainerCtrl', []).controller('NewTrainerCtrl', function($scope, $rootScope, $http, $location) {


    $scope.submitForm = function(isValid) {
        if(isValid) {
            var data = {
                "firstName" : $scope.firstName,
                "lastName" : $scope.lastName,
                "email": $scope.email,
                "password": $scope.password
            };
            $http.post('/auth/trainerSignup', data)
                .success(function(returnObj) {
                    console.log('New Trainer Created!');
                    //$location.path('/trainerList');
                })
                .error(function(message) {
                    $scope.errorMessage = message;
                    console.log('Failed Trainer Creation');
                });
        }
    }
});