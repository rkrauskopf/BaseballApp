angular.module('MainCtrl', [])
    .config(function($httpProvider) {
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    })
    .controller('MainCtrl', function($scope, $rootScope, $http, $location) {

    $scope.tagline = 'To the moon!';
    $rootScope.uploadVideoId = null;

    if(!$rootScope.isAuthenticated) {
        $rootScope.isAuthenticated = false;
    }

    $scope.logOut = function() {
        $http.get('auth/logout')
        .success(function() {
            $rootScope.isAuthenticated = false;
            $location.path('/');
        })
        .error(function() {
            console.log('WARNING: Unable to log out');
        });
    };

    $scope.facebookLogin = function() {
        $http.get('/auth/facebook')
            .success(function(){
                console.log('successful facebook login!');
            })
            .error(function(message) {
               console.log('Unsuccessful facebook login:', message);
            });

    }

    $scope.gmailLogin = function() {
        $http.get('/auth/google')
            .success(function(){
                console.log('successful Gmail login!');
            })
            .error(function(message) {
                console.log('Unsuccessful Gmail login:', message);
            });

    }

});