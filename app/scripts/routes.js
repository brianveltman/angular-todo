(function() {
    'use strict';

    angular.module('todoApp')
        .config(['localStorageServiceProvider', '$routeProvider', function (localStorageServiceProvider, $routeProvider) {
        localStorageServiceProvider.setPrefix('ycp');
        $routeProvider
            .when('/', {
                templateUrl: 'views/todo.html',
                controller: 'todoController',
                controllerAs: 'todoController'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'about'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
})();