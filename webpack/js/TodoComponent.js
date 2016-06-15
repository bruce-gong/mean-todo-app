import {Component, View} from 'angular2/core'; // Import Component and View constructor (for metadata)
import {HTTP_PROVIDERS} from 'angular2/http'; // We're using http in our TodoService, but we can only specify providers in the component
import {TodoService} from './TodoService'

class TodoComponent {
  constructor(todoService) {
    this.todos = [];
    this.todoData = {
      text: ''
    };
    this.todoService = todoService;
    this.todoService.getAllTodos()
      // Rxjs, we subscribe to the response
      .subscribe((res) => {
        this.todos = res;
      });
  }
  createTodo() {
    this.todoService.postNewTodo(this.todoData)
      .subscribe((res) => {
        this.todos = res;
        this.todoData.text = '';
      });
  }
  deleteTodo(id) {
    this.todoService.deleteTodo(id)
      .subscribe((res) => {
        this.todos = res;
      })
  }
};

TodoComponent.annotations = [
  new Component({
    selector: 'todo-app', // Tag to show app
    providers: [TodoService, HTTP_PROVIDERS], // Lets Angular know about TodoService and Http
    templateUrl: 'templates/TodoComponent' // Our template, we'll create this next
  }),
];

TodoComponent.parameters = [[TodoService]];

export {TodoComponent};
