angular.module('SignupCtrl', []).controller('SignupCtrl', function($scope, $http, $location) {
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
            $http.post('/auth/signup', data)
                .success(function(returnObj) {

                    if(returnObj.error) {
                        console.log('Sign Up Error: ' + returnObj.error);
                        $scope.errorMessage = returnObj.error;
                    }

                    else {
                        console.log('Sign Up Success: ' + returnObj.success);
                        $location.path('/login');
                    }
                })
                .error(function(message) {
                    $scope.errorMessage = message;
                });
        }
    }


});