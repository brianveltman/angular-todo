var Todo = require('./model/todo');

module.exports = function (app, pusher) {

  app.get('/todos', function (req, res) {
    Todo.find(function (err, todos) {
      if (err) res.send(err);
      else res.json(todos);
    });
  });

  app.post('/todo', function (req, res) {
    var newTodo = new Todo({task: req.body.task, created_at: req.body.created_at});

    newTodo.save(function (err) {
      if (err)res.send(err);
      res.status(200).end();
    });

  });

  app.delete('/todo/:id', function (req, res) {
    Todo.remove({
      _id: req.params.id
    }, function (err, todo) {
      if (err)
        res.send(err);
      res.status(200).end();
    });
  });

  app.put('/todos/:id', function (req, res) {
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