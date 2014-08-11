angular.module('UploadVideoCtrl', [])


    /*  TODO: Figure out a better way to organize a directive, should there be some central location for
     all custom directives??
     */
    /*
    .directive("fileread", [function () {
        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                        });
                    }
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }])
    */
    .controller('UploadVideoCtrl', function($scope, $rootScope, $http, $location) {

        $scope.videoName = null;
        $scope.fileInputScope = null;

        $scope.submitVideo = function(isValid) {
            if(isValid) {

                var formData = new FormData();

                var fileSelected = document.getElementById('videoFile').files[0];

                formData.append('name', $scope.videoName);
                formData.append('fileBinary', fileSelected);
                //formData.append('fileBinary', $scope.file);


                //TODO: Move out of shorthand and set Content Type to either
                //undefined or form(?)
                $http.post('/api/videos', formData,
                    {
                        transformRequest: angular.identity,
                        headers: { 'Content-Type' : undefined }
                    })
                    .success(function(videoId) {
                        $scope.successMessage = 'successful upload!';
                        console.log('successful upload!');
                        $rootScope.uploadVideoId = videoId;
                        $location.path('/uploadOrder');
                    })
                    .error(function(message) {
                        console.log('unsuccessful upload');
                        $scope.errorMessage = message;
                    });
            }
        }
    });