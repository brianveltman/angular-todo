module.exports = function (router, pusher) {

var Todo = require('./model/todo');

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
        pusher.trigger(
          'todo-channel', // Pusher channel
          'new-todo', // Pusher event
            {
              "task": req.body.task,
              "done": req.body.done,
              "created_at": req.body.created_at
            });
        res.status(200).end();
      }
    });

  });

  router.delete('/todo/:id', function (req, res) {
    Todo.remove({
      _id: req.params.id
    }, function (err) {
      if (err) {
        res.send(err);
      } else {
        pusher.trigger(
          'todo-channel',
          'remove-todo', req.params.id);
        res.status(200).end();
      }
    });
  });

  router.put('/todo/:id', function (req, res) {
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
