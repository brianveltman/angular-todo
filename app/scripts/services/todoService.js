(function() {
  'use strict';

  angular.module('todoApp')

      .service('todoService', function ($http, $q) {
          this.get = function(callback){
              $http.get('/api/todos')
              .then(callback);
          };

           this.delete = function(todo){
             if(!todo._id){
               return $q.resolve();
             }
             return $http.delete('/api/todos/' + todo._id).then(function(){
               console.log("todo " + todo.task + " has been deleted");
             });
           };

           this.save = function(todos){
             var queue = [];
             todos.forEach(function(todo){
               var request;
               if (!todo._id){
                 request = $http.post('/api/todos', todo);
               } else {
                 request = $http.put('/api/todos/' + todo._id, todo).then(function(result){
                   todo = result.data.todo;
                   return todo;
                 });
               }
               queue.push(request);
             });
             return $q.all(queue).then(function(results){
               console.log("Saved " + todos.length + " todos");
             });
           };
      });
})();
