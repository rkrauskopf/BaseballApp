// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainCtrl'
        })

        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })

        .when('/signup', {
            templateUrl: 'views/signup.html',
            controller: 'SignupCtrl'
        })

        .when('/profile', {
            templateUrl: 'views/profile.html',
            controller: 'ProfileCtrl'
        })

        .when('/orderList', {
            templateUrl: 'views/orderList.html',
            controller: 'OrderListCtrl'
        })

        .when('/uploadVideo', {
            templateUrl: 'views/uploadVideo.html',
            controller: 'UploadVideoCtrl'
        })

        .when('/uploadOrder', {
            templateUrl: 'views/uploadOrder.html',
            controller: 'UploadOrderCtrl'
        });

    $locationProvider.html5Mode(true);

}]);