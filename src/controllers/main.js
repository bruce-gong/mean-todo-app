import Todo from '../models/Todo'; // Import the Todo model

let mainController = {
  // Compiles the file named "index" in the views directory (`/views`) using the view engine (ejs)
  getIndex: (req, res) => {
    res.render('index');
  },

  // Allows us to access our Angular templates
  getTemplate: (req, res) => {
    res.render('templates/' + req.params.template);
  },

  // This gets all Todos in the collection and sends it back in JSON format
  getAllTodos: (req, res) => {
    Todo.find({}, (err, todos) => {
      if (err) {
        // Send the error to the client if there is one
        return res.send(err);
      }
      // Send todos in JSON format
      res.json(todos);
    });
  },

  postNewTodo: (req, res) => {
    // This creates a new todo using POSTed data (in req.body)
    Todo.create({
      text: req.body.text,
      done: false
    }, (err, todo) => {
      if (err) {
        return res.send(err);
      }
      Todo.find({}, (err, todos) => {
        if (err) {
          return res.send(err);
        }
        // Send list of all todos after new one has been created and saved
        res.json(todos);
      });
    });
  },

  deleteTodo: (req, res) => {
    Todo.remove({
      _id: req.params.id
    }, (err, todo) => {
      if (err) {
        return res.send(err);
      }
      Todo.find({}, (err, todos) => {
        if (err) {
          return res.send(err);
        }
        res.json(todos);
      });
    });
  }
}

export default mainController;
