'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Todo = require('../models/Todo');

var _Todo2 = _interopRequireDefault(_Todo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import the Todo model

var mainController = {
  // Compiles the file named "index" in the views directory (`/views`) using the view engine (ejs)
  getIndex: function getIndex(req, res) {
    res.render('index');
  },

  // Allows us to access our Angular templates
  getTemplate: function getTemplate(req, res) {
    res.render('templates/' + req.params.template);
  },

  // This gets all Todos in the collection and sends it back in JSON format
  getAllTodos: function getAllTodos(req, res) {
    _Todo2.default.find({}, function (err, todos) {
      if (err) {
        // Send the error to the client if there is one
        return res.send(err);
      }
      // Send todos in JSON format
      res.json(todos);
    });
  },

  postNewTodo: function postNewTodo(req, res) {
    // This creates a new todo using POSTed data (in req.body)
    _Todo2.default.create({
      text: req.body.text,
      done: false
    }, function (err, todo) {
      if (err) {
        return res.send(err);
      }
      _Todo2.default.find({}, function (err, todos) {
        if (err) {
          return res.send(err);
        }
        // Send list of all todos after new one has been created and saved
        res.json(todos);
      });
    });
  },

  deleteTodo: function deleteTodo(req, res) {
    _Todo2.default.remove({
      _id: req.params.id
    }, function (err, todo) {
      if (err) {
        return res.send(err);
      }
      _Todo2.default.find({}, function (err, todos) {
        if (err) {
          return res.send(err);
        }
        res.json(todos);
      });
    });
  }
};

exports.default = mainController;