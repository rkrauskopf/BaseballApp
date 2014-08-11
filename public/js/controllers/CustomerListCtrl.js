angular.module('CustomerListCtrl', []).controller('CustomerListCtrl', function($scope, $rootScope, $http, $location) {
    $scope.customers = null;

    $http.get('/api/customers')
        .success(function(customers) {
            $scope.customers = customers;
        })
        .error(function(errMessage) {

        });
});