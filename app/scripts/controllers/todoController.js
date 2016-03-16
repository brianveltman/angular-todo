'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:todoController
 * @description
 * # todoController
 * Controller of the todoApp
 */

angular.module('todoController', [])
    .controller('todoController', ['$scope', 'Todos', 'localStorageService', '$pusher', function($scope, Todos, localStorageService, $pusher) {

        var client = new Pusher('6c58cef4eda9a130ba92');
        var pusher = $pusher(client);
        var todoChannel = pusher.subscribe('todo-channel');

        if (navigator.onLine === true) {
    var todosInStorage = localStorageService.get('todos');
    $scope.todos = todosInStorage || [];
        $scope.$watch('todos', function() {
            localStorageService.set('todos', $scope.todos);
        }, true);
    $scope.newToDo = '';

    }

        var load = function () {
        Todos.get().success(function (data) {
        $scope.todos = data;
            todoChannel.bind('new-todo',
                function(data) {
                    console.log(data);
                }
            );
      });
    };

    load();

    $scope.save = function () {
        var dateNow = new Date().toISOString();
        if (navigator.onLine === true) {
            Todos.create({'task':$scope.newToDo,'done':false, 'created_at':dateNow})
            .success(function (pusher) {
                load();
                $scope.newToDo = '';
                pusher.trigger('todo-channel', 'new-todo', {"message": "hello world"});
                $scope.$watch('todos', function() {
            localStorageService.set('todos', $scope.todos);
        }, true);
            });
    } else {
            $scope.$watch('todos', function() {
                localStorageService.set('todos', $scope.todos);
            }, true);
            $scope.todos.push({'task':$scope.newToDo,'done':false, 'created_at':dateNow});
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


        /* $scope.removeCompleted = function() {
            $scope.todos = $scope.todos.filter(function(item){
                return !item.done;
            });
        };

        $scope.addDemo = function(){

            $scope.todos = [
            {'title':'Add a new item','done':false},
            {'title':'This item is done','done':true},
            {'title':'Persist data to database','done':false},
            {'title':'Store data on local disk for offline use','done':true},
            {'title':'Drag & drop to change position','done':true},
            {'title':'Remove all items that are done','done':true},
            {'title':'Form validation: prevent blank inputs','done':true},
            {'title':'Clear input field after adding new todo','done':true},
            {'title':'Add searchbox to filter todo items','done':false},
            {'title':'Remove individual todo','done':true},
            {'title':'Unit testing with Karma','done':true},
            {'title':'Modify todos','done':false},
            {'title':'Realtime sync using websockets','done':false},
            {'title':'Send source code to Tess for review','done':true},
            {'title':'Focus on input field to add new items instantly','done':true},
            {'title':'Move completed items to bottom','done':false},
            {'title':'Optimize for mobile use (long sentences breaks layout)','done':false}

        ];
        if (localStorageService.get('todos') === null) {
            localStorageService.set('todos', $scope.todos);
        };
        };*/

    }]);