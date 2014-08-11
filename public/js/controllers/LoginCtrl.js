angular.module('LoginCtrl', []).controller('LoginCtrl', function($scope, $rootScope, $http, $location) {

    $scope.submitForm = function(isValid) {
        if(isValid) {
            var data = {
                "email": $scope.loginEmail,
                "password": $scope.loginPassword
            };
            $http.post('/auth/login', data)
                .success(function(returnObj) {
                    console.log('Log In Successfully!');
                    $rootScope.isAuthenticated = true;
                    $rootScope.userType = returnObj.userType;
                    $location.path('/profile');
                })
                .error(function(message) {
                    $scope.errorMessage = message;
                    console.log('Failed local login');
                });
        }
    }
});