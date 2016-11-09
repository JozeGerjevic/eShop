angular.module('app').controller('SliderController', function($scope, ProductFactory) {

    $scope.interval = 3000;
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    $scope.slides = ProductFactory.query({
        query: "Al",
        onlyOnSale : true,
        onlyStocked : true
    });

});
