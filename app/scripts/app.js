'use strict';

/**
 * @ngdoc overview
 * @name todoApp
 * @description
 * # todoApp
 *
 * Main module of the application.
 */
var TodoApp = angular
    .module('todoApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.sortable',
        'LocalStorageModule',
        'todoController',
        'todoService',
        'pusher-angular'
    ])
    .config(['localStorageServiceProvider', '$routeProvider', function(localStorageServiceProvider, $routeProvider){
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
