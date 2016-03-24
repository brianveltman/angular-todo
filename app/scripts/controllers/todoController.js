(function() {
    'use strict';
    /**
     * @ngdoc function
     * @name todoApp.controller:todoController
     * @description
     * # todoController
     * Controller of the todoApp
     */

    angular.module('todoApp')
        .controller('todoController', function ($scope, todoService, localStorageService, $pusher) {

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
              if (navigator.onLine === true ) {
                todoService.get(function(response){
                  $scope.todos = response.data;
                  todoChannel.bind('new-todo',
                      function(data) {
                          $scope.todos.push(data);
                      }
                  );
                });
              } else {
                var todosInStorage = localStorageService.get('todos');
                $scope.todos = todosInStorage || [];
              }
            };

            load();
            $scope.create = function() {
              var dateNow = new Date().toISOString();
              $scope.todos.unshift({task: $scope.newToDo,
                      done: false,
                    created_at: dateNow});
                    $scope.todos.edited = true;
                    $scope.newToDo = '';
                  };
            // $scope.create = function () {
            //     var dateNow = new Date().toISOString();
            //     if (navigator.onLine === true) {
            //         todoService.save({'task': $scope.newToDo, 'done': false, 'created_at': dateNow}, function(){
            //           $scope.newToDo = '';
            //           $scope.$watch('todos', function () {
            //               localStorageService.set('todos', $scope.todos);
            //           }, true);
            //         });
            //     } else {
            //         $scope.$watch('todos', function () {
            //             localStorageService.set('todos', $scope.todos);
            //         }, true);
            //         $scope.todos.push({'task': $scope.newToDo, 'done': false, 'created_at': dateNow});
            //         $scope.newToDo = '';
            //     }
            // };

            $scope.save = function() {
              var readyTodos = $scope.todos.filter(function(todo){
                if(todo.edited) {
                  return todo;
                }
              });
              todoService.save(readyTodos).finally($scope.resetTodoState());

            };

            $scope.resetTodoState = function() {
              $scope.todos.forEach(function(todo){
                todo.edited = false;

              });
            };


            $scope.delete = function (todo, $index) {
                // if (navigator.onLine == true) {
                todoService.delete(todo).then(function(){
                  $scope.todos.splice($index, 1);
                  load();
                });
            };


            // var pushLocalTodosToMongo = function() {
            //   var localTodos = JSON.stringify(localStorageService.get('todos'));
            //   //var todos = [localTodos];
            //   console.log('push' + localTodos);
            //   Todos.create(localTodos);
            //   return;
            // }

        });
})();
