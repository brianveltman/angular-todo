'use strict';

describe('Controller: todoController', function () {

  // load the controller's module
  beforeEach(module('todoApp'));

  var todoController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    todoController = $controller('todoController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

    it('should have no todos', function () {
        expect(scope.todos.length).toBe(0);
    });
});
