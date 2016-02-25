'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:todoController
 * @description
 * # todoController
 * Controller of the todoApp
 */

angular.module('todoApp')
    .controller('todoController', function($scope, localStorageService) {

        var todosInStorage = localStorageService.get('todos');

        $scope.todos = todosInStorage || [];

        $scope.$watch('todos', function() {
            localStorageService.set('todos', $scope.todos);
        }, true);

        $scope.addToDo = function(){
            $scope.todos.push({'title':$scope.newToDo,'done':false});
            $scope.newToDo = '';
        };


        $scope.removeTodo = function (index) {
            $scope.todos.splice(index, 1);
        };


        $scope.removeCompleted = function() {
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
        };

    });