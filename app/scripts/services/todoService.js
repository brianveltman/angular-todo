(function() {
  'use strict';

  angular.module('todoService', [])

      .factory('Todos', ['$http', function ($http) {
        return {
          get: function () {
            return $http.get('/api/todos');
          },
          create: function (newTodo) {
            if (navigator.onLine) {
              console.log('create fc' + newTodo);
              return $http.post('/api/todo', newTodo);
            }
          },
          push: function (newTodo) {
            if (navigator.onLine) {
              return $http.post('/api/todos', newTodo);
            }
          },
          update: function (id, done) {
            return $http.patch('/api/todo/' + id, done);
          },
          delete: function (id) {
            return $http.delete('/api/todo/' + id);
          }
        };
      }]);
})();
