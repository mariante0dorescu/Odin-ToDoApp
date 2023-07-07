import './styles/main.scss';
import UI from './ui.js'
import Task from './task'
import Project from './project'
import Storage from './storage';

// initial content load event
document.addEventListener('DOMContentLoaded', UI.loadTasks('All Tasks', Storage.getTasks()))
document.addEventListener('DOMContentLoaded', UI.loadProjects(Storage.getProjects()))


// load tasks
const linksContainer = document.querySelector('.links__container');
const todayTasks = linksContainer.querySelector('#today');
const nextWeekTasks = linksContainer.querySelector('#next_week');

todayTasks.addEventListener('click', () => UI.loadTasks('Today tasks', Storage.getTodayTasks()))
nextWeekTasks.addEventListener('click', () => UI.loadTasks('Next week tasks', Storage.getNextWeekTasks()))


// show forms event listeners
document.getElementById('add_task').addEventListener('click', () => UI.showTaskForm())
document.getElementById('add_project').addEventListener('click', () => UI.showProjectForm())

// create task event
const taskForm = document.getElementById('addTask');
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskName = taskForm.querySelector('#task_name');
  const taskPriority = taskForm.querySelector('#task_priority');
  const taskDescription = taskForm.querySelector('#task_description');
  const taskDueDate = taskForm.querySelector('#task_dueDate');
  
  const task = new Task(taskName.value, taskPriority.value, taskDescription.value, taskDueDate.value);
  Storage.addTask(task);
  UI.loadTasks('All Tasks', Storage.getTasks());
  UI.showTaskForm();
  UI.clearFields(taskForm);
})

const cancelTaskForm = taskForm.querySelector('.reset');
cancelTaskForm.addEventListener('click', () => UI.showTaskForm())


//create project event
const projectForm = linksContainer.querySelector('#addProject');
projectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const projectName = projectForm.querySelector('#addProjectName');
  const project = new Project(projectName.value);
  Storage.saveProject(project);
  UI.showProjectForm();
  UI.loadProjects();
})

const cancelProjectForm = projectForm.querySelector('.reset');
cancelProjectForm.addEventListener('click', () => UI.showProjectForm());


// edit / delete / mark complete task events

const taskContainer = document.querySelector('.tasks__container--bottom')
taskContainer.addEventListener('click', (e) => {
  
  if(e.target.id === "delete_task"){      
      UI.deleteTask(e.target)
      Storage.deleteTask(e.target);
     } else if(e.target.id === "complete_task") {
      Storage.completeTask(e.target);
      UI.loadTasks("", Storage.getTasks());
     } else if(e.target.id === "edit_task") {
      UI.editTask(e.target)
     } 
     else {
      return;
     }
})
