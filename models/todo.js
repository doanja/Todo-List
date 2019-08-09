const mongoose = require('mongoose');

// schema for a todo item for mongodb
const TodoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    todo: String
});

module.exports = mongoose.model('Todo', TodoSchema);