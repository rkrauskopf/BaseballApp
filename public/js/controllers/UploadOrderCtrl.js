angular.module('UploadOrderCtrl', []).controller('UploadOrderCtrl', function($scope, $rootScope, $http) {

    $scope.orderName = null;

    $scope.submitOrder = function(isValid) {
        if(isValid) {

            var data = {
                name: $scope.orderName,
                originalVideoId: $rootScope.uploadVideoId
            };

            $http.post('/api/orders', data)
                .success(function() {
                    $scope.successMessage = 'Successful Upload';
                    console.log('successful upload!');
                })
                .error(function() {
                   $scope.errorMessage = 'Error Message';
                   console.log('unsuccessful upload');
                });
        }
    }

});