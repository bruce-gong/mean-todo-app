// webpack/js/boot.js
import {bootstrap} from 'angular2/platform/browser'; // Angular magic to bootstrap the application in a web browser
import {TodoComponent} from './TodoComponent';

let boot = document.addEventListener('DOMContentLoaded', () => {
  bootstrap(TodoComponent);
});

// Expose boot so it can be required by webpack.
module.exports = boot;
