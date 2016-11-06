angular.module('app').config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/category');

    $stateProvider.state('category', {
        url: '/category',
        templateUrl: 'templates/category.html',
        controller: function ($scope, CategoryFactory) {
            $scope.categories = CategoryFactory.query({});
        }
    });

    $stateProvider.state('products', {
        url: '/products',
        templateUrl: 'templates/products.html',
        controller: function ($scope, ProductFactory) {
            $scope.$watch('search', function (newValue) {
                $scope.products = ProductFactory.query({
                    onlyStocked: true,
                    query: newValue
                });
            });
            $scope.products = ProductFactory.query({
                onlyStocked: true
            });
        }
    });

    
    $stateProvider.state('productsCtg', {
        url: '/productsCtg/:catid',
        templateUrl: 'templates/products.html',
        controller: function ($scope, ProductsFactory,$stateParams) {
            $scope.$watch('search', function (newValue) {
                $scope.products = ProductsFactory.query({
                    onlyStocked: true,
                    query: newValue,
                    id: $stateParams.catid
                });
            }); 
            $scope.products = ProductsFactory.query({
                onlyStocked: true,
                id: $stateParams.catid
            });
        }
    });
    
    
    $stateProvider.state('detail', {
        url: '/products/:id',
        templateUrl: 'templates/product.html',
        controller: function ($scope, ProductFactory, $stateParams) {
            $scope.product = ProductFactory.get({
                id: $stateParams.id
            });
        }
    });

    $stateProvider.state('orders', {
        url: '/orders',
        template: '<h2>Submitted a new POST request for an order</h2><p>Check the network tab of your developer tools.</p>',
        controller: function ($scope, OrderFactory) {
            var newOrder = new OrderFactory({
                items: [],
                price: {}
            });
            newOrder.$save();
        }
    });
});