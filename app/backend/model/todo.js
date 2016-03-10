var mongoose = require('mongoose');

var todoSchema =  new mongoose.Schema ({
    task: { type: String,  default: '' },
    done: { type: Boolean, default: false },
    created_at: { type: String, default: '' }
});

module.exports = mongoose.model('Todo', todoSchema);