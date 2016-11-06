angular.module('app').factory('ProductsFactory', function ($resource) {

    return $resource('http://smartninja.betoo.si/api/eshop/categories/:id/products');

});