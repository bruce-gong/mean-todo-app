import express from 'express';
import logger from 'morgan'; // Logs each server request to the console
import bodyParser from 'body-parser';
import methodOverride from 'method-override'; // Allows for PUT and DELETE methods to be used in browsers where they are not supported
import mongoose from 'mongoose'; // Wrapper for interacting with MongoDB
import path from 'path';

// Import controllers
import mainController from './controllers/main';

// Configure database
mongoose.connect('mongodb://localhost:27017/todoDB');
mongoose.connection.on('error', function () {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

// Configure app
let app = express();
app.set('port', process.env.PORT || 3000); // Set port to 3000 or the provided PORT variable
app.set('views', path.join(__dirname, '..', 'views')); // Set our views directory to be `/views` (in the app root, which is one level above)
app.set('view engine', 'ejs'); // Set our view engine to be ejs
app.use(express.static(path.join(__dirname, '..', 'public'))); // Set the static files directory - /public will be / on the frontend
app.use(logger('dev')); // Log requests to the console;   why use 'dev'?
app.use(bodyParser.json()); // Parse JSON data and put it into an object with we can access
app.use(methodOverride()); // Allow PUT/DELETE

// Configure routes
app.get('/', mainController.getIndex);
app.get('/templates/:template', mainController.getTemplate);
app.get('/todos', mainController.getAllTodos);
app.post('/todos', mainController.postNewTodo);
app.delete('/todos/:id', mainController.deleteTodo);

// Start app
app.listen(app.get('port'), function () {
  console.log(`App listening on port ${app.get('port')}!`)
})
