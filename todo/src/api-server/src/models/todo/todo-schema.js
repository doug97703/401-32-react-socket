'use strict';
const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  text: { type: String, required: true },
  _id: { type: String },
  assignedTo: { type: String },
  complete: { type: Boolean },
  difficulty: { type: String, enum: ['1', '2', '3', '4', '5'] },
  dueDate: { type: String }
});

module.exports = mongoose.model('todo', todoSchema);
