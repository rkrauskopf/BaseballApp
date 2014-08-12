angular.module('TrainerListCtrl', []).controller('TrainerListCtrl', function($scope, $rootScope, $http) {
    $scope.trainers = null;

    var self = this;

    //Call this on load
    getTrainers();

    function getTrainers() {
        $http.get('/api/trainers')
            .success(function(trainers) {
                $scope.trainers = trainers;
            })
            .error(function(errorMessage) {
                $scope.errorMesage = errorMessage;
            });
    }

    $scope.deleteTrainer = function($event) {
        $('#confirm-modal').modal();

        //to access the trainer ID use the following
        var trainer = angular.element($event.target).scope().trainer;
        $scope.deleteID = trainer._id;
        $scope.deleteUserName = trainer.local.firstName + ' ' + trainer.local.lastName;
    }

    $scope.confirmDelete = function() {

        $http.delete('/api/user/' + $scope.deleteID)
            .success(function(message) {
                $('#confirm-modal').modal('hide');
                getTrainers();
            })
            .error(function(errorMessage) {
               $('#confirm-modal').modal('hide');
               $scope.errorMessage = errorMessage;
            });

    }


});