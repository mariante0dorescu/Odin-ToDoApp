import Storage from './storage';

export default class UI {

  static loadTasks(){
    const container = document.querySelector('.tasks__container--bottom');
    container.innerHTML = "";

    const tasks = Storage.getTasks();
    tasks.forEach((task) => UI.addTasksToPage(UI.createTask(task)));
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

  // remove task from document
  static deleteTask(el){
    el.closest('.task__box').remove();
  }


  // create div with task info
  static createTask(task){
    const div = document.createElement('div');
    div.classList.add('task__box');
    div.id = task.id;
    task.status === 'completed' ? div.classList.add('completed') : "";
    div.innerHTML = `
            <span id="taskTag" class="tag"></span>
            <span id="taskTag">${task.priority.toUpperCase()}</span>
            <div class="task_info">
              <h2>${task.name}</h2>
              <p>${task.description}</p>
              <p>${task.dueDate}</p>
            </div>
            <div class="task_edit hidden"></div>
            <div class="task__controls">
            ${task.status === 'active' ? `
              <div class="tooltip">
                <button class="btn__control" id="edit_task"><i class="fa-solid fa-pen-to-square"></i></button>
                <span class="tooltiptext">Edit</span>
              </div>
              ` : ""}
              <div class="tooltip">
                <button class="btn__control" id="complete_task"><i class="fa-solid fa-square-check"></i></button>
                <span class="tooltiptext">${task.status === 'active' ?" Mark as complete" : " Mark as active"}</span>
              </div>
              <div class="tooltip">
                <button class="btn__control" id="delete_task"><i class="fa-solid fa-trash-can"></i></button>
                <span class="tooltiptext">Delete Task</span>
              </div>
    `;
    return div;
  }


    static editTask(el){
      const task = Storage.getTaskInfo(el);
      // console.log(Storage.getTaskID(el))

      const info = el.closest('.task__box').querySelector('.task_info');
      const controls = el.closest('.task__box').querySelector('.task__controls');
      const editContainer = el.closest('.task__box').querySelector('.task_edit');
      
      info.classList.add('hidden');
      controls.classList.add('hidden');
      editContainer.classList.remove('hidden')

      const form = document.createElement('form');
      form.classList.add("form");
      form.setAttribute("action", "#")
      form.setAttribute("id", "editTask");

      const taskName = document.createElement('input');
      taskName.classList.add("input_text");
      taskName.setAttribute("id", "task_name");
      taskName.setAttribute("type", "text");
      taskName.setAttribute('value', `${task[0].name}`)

      const taskDesc = document.createElement('input');
      taskDesc.classList.add("input_text");
      taskDesc.setAttribute("id", "task_description");
      taskDesc.setAttribute("type", "text");
      taskDesc.setAttribute('value', `${task[0].description}`)

      const taskDate = document.createElement('input');
      taskDate.classList.add("input_text");
      taskDate.setAttribute("id", "task_dueDate");
      taskDate.setAttribute("type", "date");
      taskDate.setAttribute('value', `${task[0].dueDate}`)

      const controlDiv = document.createElement('div');
      controlDiv.classList.add('form__controls');

      const updateBTN = document.createElement('button');
      updateBTN.classList.add('btn');
      updateBTN.classList.add('add');
      updateBTN.setAttribute('type', 'submit')
      updateBTN.innerText = "Update"

      const cancelBTN = document.createElement('button');
      cancelBTN.classList.add('btn');
      cancelBTN.classList.add('reset');
      cancelBTN.setAttribute('type', 'resey')
      cancelBTN.innerText = "Cancel"



      controlDiv.appendChild(updateBTN)
      controlDiv.appendChild(cancelBTN)

      form.appendChild(taskName);
      form.appendChild(taskDesc);
      form.appendChild(taskDate);
      form.appendChild(controlDiv);
      editContainer.appendChild(form);

      form.addEventListener('submit', (e) => {
        e.preventDefault()

        Storage.updateTask(Storage.getTaskID(el),taskName.value, taskDesc.value, taskDate.value);

        info.classList.remove('hidden');
        controls.classList.remove('hidden');
        editContainer.classList.add('hidden');
        UI.loadTasks();
      })

    }

  // add task to page
  static addTasksToPage(task){
    const container = document.querySelector('.tasks__container--bottom');
    container.appendChild(task);
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