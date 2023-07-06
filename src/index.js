import './styles/main.scss';
import UI from './ui.js'
import Task from './task'
import Project from './project'
import Storage from './storage';

// initial content load event
document.addEventListener('DOMContentLoaded', UI.loadTasks())
document.addEventListener('DOMContentLoaded', UI.loadProjects())


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
  UI.loadTasks();
  UI.showTaskForm();
  UI.clearFields(taskForm);
})

const cancelTaskForm = taskForm.querySelector('.reset');
cancelTaskForm.addEventListener('click', () => UI.showTaskForm())


//create project event
const projectForm = document.getElementById('addProject');
projectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const projectName = projectForm.querySelector('#addProjectName');
  const project = new Project(projectName.value);
  UI.addProjectsToPage(project);
})

const cancelProjectForm = projectForm.querySelector('.reset');
cancelProjectForm.addEventListener('click', () => UI.showProjectForm());


// edit / delete / mark complete task events

// const tasksContainer = document.querySelectorAll('.task__box');
// tasksContainer.forEach((task) => task.addEventListener('click', (e) => { 
//   e.preventDefault();
//   console.log(e)
//  const action = e.target.parentElement.id;
//  const box = e.target.closest('.task__box');

//  if(action === "delete_task"){
//   box.remove()
//   Storage.deleteTask(box.id);
//  } else if(action === "complete_task") {
//   console.log("complete")
//  } else if(action === "edit_task") {
//   console.log("edit")
//  } 
//  else {
//   return;
//  }

// })
// )

const taskContainer = document.querySelector('.tasks__container--bottom')
taskContainer.addEventListener('click', (e) => {
  
  if(e.target.id === "delete_task"){      
      UI.deleteTask(e.target)
      Storage.deleteTask(e.target);
     } else if(e.target.id === "complete_task") {
      Storage.completeTask(e.target);
      UI.loadTasks();
     } else if(e.target.id === "edit_task") {
      console.log("edit")
     } 
     else {
      return;
     }
})
