angular.module('OrderListCtrl', []).controller('OrderListCtrl', function($scope, $http) {
    $scope.tagline = 'To the moon!';

    $http.get('/api/orders')
    .success(function(data) {
        $scope.orders = data;
    });
});