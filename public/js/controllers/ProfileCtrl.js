angular.module('ProfileCtrl', []).controller('ProfileCtrl', function($scope, $http) {
    $scope.tagline = 'To the moon!';



     $http.get('/api/orders')
     .success(function(data) {
     console.log(data);
     });


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