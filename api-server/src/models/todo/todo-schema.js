'use strict';
const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  text: { type: String, required: true },
  assignedTo: { type: String },
  status: { type: String, enum: ['complete', 'incomplete'] },
  difficulty: { type: Number, enum: [1,2,3,4,5] },
  dueDate: { type: String }
});

module.exports = mongoose.model('products', todoSchema);
