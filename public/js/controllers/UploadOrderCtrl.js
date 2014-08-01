angular.module('UploadOrderCtrl', []).controller('UploadOrderCtrl', function($scope, $http) {

    $scope.videoName = null;
    $scope.videBinary = null;

    $scope.videoForm = function(isValid) {
        if(isValid) {
            $http.post('/api/videos', data)
                .success(function() {
                    console.log('successful upload!');
                })
                .error(function() {
                   console.log('unsuccessful upload');
                });
        }
    }

});