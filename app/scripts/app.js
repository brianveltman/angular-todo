(function() {
        'use strict';
        /**
         * @ngdoc overview
         * @name todoApp
         * @description
         * # todoApp
         *
         * Main module of the application.
         */
        angular
            .module('todoApp', [
                    'ngAnimate',
                    'ngCookies',
                    'ngResource',
                    'ngRoute',
                    'ngSanitize',
                    'ngTouch',
                    'ui.sortable',
                    'LocalStorageModule',
                    'todoService',
                    'pusher-angular'
            ]);
})();
