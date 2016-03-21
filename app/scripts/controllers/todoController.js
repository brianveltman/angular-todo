(function() {
    'use strict';
    /**
     * @ngdoc function
     * @name todoApp.controller:todoController
     * @description
     * # todoController
     * Controller of the todoApp
     */

    angular.module('todoController', [])
        .controller('todoController', ['$scope', 'Todos', 'localStorageService', '$pusher', function ($scope, Todos, localStorageService, $pusher) {

            var client = new Pusher('68ee1e650a5898375283');
            var pusher = $pusher(client);
            var todoChannel = pusher.subscribe('todo-channel');
            
            if (navigator.onLine === true) {
                var todosInStorage = localStorageService.get('todos');
                $scope.todos = todosInStorage || [];
                $scope.$watch('todos', function () {
                    localStorageService.set('todos', $scope.todos);
                }, true);
                $scope.newToDo = '';

            }

            var load = function () {
                Todos.get().success(function (data) {
                    $scope.todos = data;
                    todoChannel.bind('new-todo',
                        function(data) {
                            $scope.todos.push(data);
                        }
                    );
                });
            };

            load();

            $scope.save = function () {
                var dateNow = new Date().toISOString();
                if (navigator.onLine === true) {
                    Todos.create({'task': $scope.newToDo, 'done': false, 'created_at': dateNow})
                        .success(function () {
                            //load();
                            $scope.newToDo = '';
                            $scope.$watch('todos', function () {
                                localStorageService.set('todos', $scope.todos);
                            }, true);
                        });
                } else {
                    $scope.$watch('todos', function () {
                        localStorageService.set('todos', $scope.todos);
                    }, true);
                    $scope.todos.push({'task': $scope.newToDo, 'done': false, 'created_at': dateNow});
                    $scope.newToDo = '';
                }
            };


            $scope.delete = function (id) {
                // if (navigator.onLine == true) {
                Todos.delete(id)
                    .success(function () {
                        load();
                    });
                /* } else {
                 $scope.todos.delete(id);
                 } */
            };

            $scope.update = function (id, done) {
                Todos.update(id, done)
                    .success(function () {
                        load();
                    });
            };
        }]);
})();