var Todo = require('./model/todo');

<<<<<<< 0480089f9e4aa30187ec6f29f3cfc0535b57b880
module.exports = function (app, pusher) {
=======
module.exports = function (router) {
>>>>>>> Prefix API route with /api

  router.get('/todos', function (req, res) {
    Todo.find(function (err, todos) {
      if (err) res.send(err);
      else res.json(todos);
    });
  });

  router.post('/todo', function (req, res) {
    var newTodo = new Todo({task: req.body.task, created_at: req.body.created_at});

    newTodo.save(function (err) {
      if (err) {
        res.send(err);
      } else {
        pusher.trigger('todo-channel', 'new-todo', {"task": req.body.task, "done": req.body.done, "created_at": req.body.created_at });
        res.status(200).end();
      }
    });

  });

  router.delete('/todo/:id', function (req, res) {
    Todo.remove({
      _id: req.params.id
    }, function (err, todo) {
      if (err)
        res.send(err);
      res.status(200).end();
    });
  });

  router.put('/todos/:id', function (req, res) {
    Todo.update({
      _id: req.params.id,
      done: true
    }, function (err, todo) {
      if (err)
        res.send(err);
      res.status(200).end();
    });
  });

};