angular.module('OrderService', []).factory('Order', ['$http', function($http) {
    return {
        //Get all orders
        get: function() {
            return $http.get('/api/orders');
        },

        //Call to POST and create a new order
        create: function(orderData) {
            return $http.pos('/api/orders', orderData);
        },

        //call to DELETE an order
        delete: function(id) {
            return $http.delete('/api/orders' + id);
        }
    }
}])