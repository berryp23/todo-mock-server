const { randomUUID } = require('crypto');
const todoData = require('../db/todos');

exports.getTodos = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: todoData,
  });
};

exports.getTodo = (req, res, next) => {
  const todo = todoData.find((t) => t.id === req.params.id);
  if (todo == null) {
    return res.status(404).json({
      success: false,
      data: null,
    });
  }
  res.status(200).json({
    success: true,
    data: todo,
  });
};

exports.createTodo = (req, res, next) => {
  const todo = { ...req.body, id: randomUUID() };
  todoData.push(todo);
  res.status(201).json({
    success: true,
    data: todo,
  });
};

exports.updateTodo = (req, res, next) => {
  const idx = todoData.findIndex((t) => t.id == req.params.id);
  if (idx === -1) {
    return res.status(404).json({
      success: false,
      data: null,
    });
  }
  const data = { ...todoData[idx], ...req.body };
  todoData[idx] = data;
  res.status(200).json({
    success: true,
    data,
  });
};

exports.deleteTodo = (req, res, next) => {
  const idx = todoData.findIndex((t) => t.id == req.params.id);
  if (idx === -1) {
    return res.status(404).json({
      success: false,
      data: null,
    });
  }
  delete todoData[idx];
  res.status(200).json({
    success: true,
    data: null,
  });
};
