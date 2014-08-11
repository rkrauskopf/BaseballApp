angular.module('MainCtrl', []).controller('MainCtrl', function($scope, $rootScope, $http, $location) {

    $scope.tagline = 'To the moon!';
    $rootScope.uploadVideoId = null;

    if(!$rootScope.isAuthenticated) {
        $rootScope.isAuthenticated = false;
    }

/*
    $http.get('/api/orders')
        .success(function(data) {
            console.log(data);
        });
*/
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

    //logic currently requires that orders be defined
    /*
    var data = {
        "name": "here is an order",
        "isPayed" : false
    };



    $http.post('/api/orders', data)
        .success(function(data) {
            console.log('hurray! successful order!');
        })
        .error(function(message) {
            console.log('damn we suck again!');
        });
    */
});