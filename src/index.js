import './styles/main.scss';
import UI from './ui.js'

// function component() {
//   const element = document.createElement('div');


//   element.innerHTML = `hello`;

//   return element;
// }

// document.body.appendChild(component());

document.getElementById('add_task').addEventListener('click', () => UI.showTaskForm())
document.getElementById('add_project').addEventListener('click', () => UI.showProjectForm())
