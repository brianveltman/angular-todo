var mongoose = require('mongoose');

var todoSchema =  new mongoose.Schema ({
  task: { type: String,  default: '' },
  done: { type: Boolean, default: 0 }
});

module.exports = mongoose.model('Todo', todoSchema);