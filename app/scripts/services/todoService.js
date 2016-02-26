'use strict';

angular.module('todoService', [])

  .factory('Todos', ['$http', function ($http) {
    return {
      get: function () {
        return $http.get('/todos');
      },
      create: function (newTodo) {
        if (navigator.onLine) {
        return $http.post('/todo', newTodo);
      };
      },
      update: function (id, done) {
        return $http.patch('/todo/' + id, done );
      },
      delete: function (id) {
        return $http.delete('/todo/' + id);
      }
    };
  }]);

function updateBrowserConnection(connected) {
  var el = document.querySelector('#connection');
  if (connected) {
    if (el.classList) {
      el.classList.add('online');
      el.classList.remove('offline');
    } else {
      el.addClass('online');
      el.removeClass('offline');
    }
  } else {
    if (el.classList) {
      el.classList.remove('online');
      el.classList.add('offline');
    } else {
      el.removeClass('online');
      el.addClass('offline');
    }
  }
}

  window.addEventListener('load', function() {
  if (navigator.onLine) {
    updateBrowserConnection(true);
  } else {
    updateBrowserConnection(false);
  }
}, false);

window.addEventListener('online', function() {
  updateBrowserConnection(true);
}, false);

window.addEventListener('offline', function() {
  updateBrowserConnection(false);
}, false);