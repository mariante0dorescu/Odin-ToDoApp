import Task from './task'
import Project from './project'
import Storage from './storage';

export default class UI {

  static loadTasks(){
    //  const tasks = [
    //   {
    //     name: "Task One",
    //     priority: "high",
    //     notes: "test test test",
    //     dueDate: "date",
    //     status: "active",
    //   },
    //   {
    //     name: "Task Two",
    //     priority: "normal",
    //     notes: "test test test",
    //     dueDate: "date",
    //     status: "completed",
    //   },
    // ];

    const tasks = Storage.getTasks();

    tasks.forEach((book) => UI.addTasksToPage(book));
  }

  static loadProjects(){
    const projects = [
      {
        name: 'test project'
      },
      {
        name: 'test project2'
      },
    ];

    projects.forEach((project) =>  {
      UI.addProjectsToPage(project);
      UI.addProjectsToForm(project)
    })
  }

  // create div with task info
  static addTasksToPage(task){
    const container = document.querySelector('.tasks__container--bottom');
    
    const div = document.createElement('div');
    div.classList.add('task__box');
    div.id = task.id;
    task.status === 'completed' ? div.classList.add('completed') : "";
    div.innerHTML = `
            <span id="taskTag" class="tag"></span>
            <h2>${task.name}</h2>
            <p>${task.notes}</p>
            <div class="task__controls">
              <div class="tooltip">
                <button class="btn__control" id="edit_task"><i class="fa-solid fa-pen-to-square"></i></button>
                <span class="tooltiptext">Edit</span>
              </div>
              <div class="tooltip">
                <button class="btn__control" id="complete_task"><i class="fa-solid fa-square-check"></i></button>
                <span class="tooltiptext">Mark as complete</span>
              </div>
              <div class="tooltip">
                <button class="btn__control" id="delete_task"><i class="fa-solid fa-trash-can"></i></button>
                <span class="tooltiptext">Delete Task</span>
              </div>
    `;
    container.appendChild(div)
  }

  // insert project list into page
  static addProjectsToPage(project) {
    const container = document.getElementById('projects');
    const projectBtn = document.createElement('button');
    projectBtn.classList.add('btn')
    projectBtn.innerText = project.name;
    container.appendChild(projectBtn)
  }

  // insert project list into form options
  static addProjectsToForm(project){
    const formContainer = document.querySelector('.tasks__container--add-task');
    const projectsList = formContainer.querySelector('#projects');    
    projectsList.insertAdjacentHTML('beforeend', `<option value="${project.name}">${project.name}</option>`);
  }

  // create task from task form input
  // addTask() {

  // }

  // show task form
  static showTaskForm() {
    const formContainer = document.querySelector('.tasks__container--add-task');
    formContainer.classList.toggle('active');
  }

  // show project form
  static showProjectForm(){
    const formContainer = document.querySelector('.add__project');
    formContainer.classList.toggle('active');
  }

  // clear form fields
  static clearFields(form){
    const formElements = form.getElementsByTagName('input');
    
    for(const field of formElements) {
      if(field.value === "Add" || field.value === "Cancel") {
        continue;
      }
      field.value = "";
    }
  }
}