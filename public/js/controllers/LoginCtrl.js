angular.module('LoginCtrl', []).controller('LoginCtrl', function($scope, $rootScope, $http, $location) {
    $scope.tagline = 'To the moon!';


    /*
     $http.get('/api/orders')
     .success(function(data) {
     console.log(data);
     });
    */

    $scope.submitForm = function(isValid) {
        if(isValid) {
            var data = {
                "email": $scope.loginEmail,
                "password": $scope.loginPassword
            };
            $http.post('/test/login', data)
                .success(function(returnObj) {
                    console.log('Log In Success: ' + returnObj.success);
                    $rootScope.isAuthenticated = true;
                    $location.path('/profile');
                })
                .error(function(message) {
                    $scope.errorMessage = message;
                    console.log('Failed local login');
                });
        }
    }
});