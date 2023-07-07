export default class Storage {


  // get tasks local save or epmty array
  static getTasks(){
    let tasks;
    if(localStorage.getItem("odinTasks") === null) {
      tasks = []
    } else {
      tasks = JSON.parse(localStorage.getItem('odinTasks'));
    }
    return tasks;
  }

  // get project local save or epmty array
  static getProjects(){
    let projects;
    if(localStorage.getItem("odinProjects") === null) {
      projects = []
    } else {
      projects = JSON.parse(localStorage.getItem("odinProjects"));
    }
    // console.log(projects)
    return projects;
  }

  // get project task based on the name of the project
  static getProjectTasks(name) {
    let projects = Storage.getProjects();
    let index = projects.findIndex((project) =>  project.name === name);
    return projects[index].tasks;
  }

  // add new project to local storage
  static saveProject(project){
    const projects = Storage.getProjects();    
    projects.push(project);
    localStorage.setItem("odinProjects",JSON.stringify(projects))
  }

  // add new task to project
  static saveTaskInProject(projectName, task){
    Storage.saveTask(task);
    const projects = Storage.getProjects();    
    projects[projectName].push(task.id);
    localStorage.setItem("odinProjects",JSON.stringify(projects))
  }


  // add task to local storage
  static saveTask(task) {
    const tasks = Storage.getTasks();    
    tasks.push(task);
    localStorage.setItem('odinTasks',JSON.stringify(tasks))
  }

  // get tasks with today's date
  static getTodayTasks(){
    let tasks = Storage.getTasks();
    //console.log(tasks)
    return tasks;
  }

  //get tasks with next week's date
  static getNextWeekTasks(){
    let tasks = Storage.getTasks();
    //console.log(tasks)
    return tasks;
  }


  // mark task completed in local storage
  static completeTask(el){
    const tasks = Storage.getTasks(); 
   
    tasks.forEach((task) => {
      if(task.id === Storage.getTaskID(el)){
        if(task.status === "completed"){
          task.status = "active";
        } else {
          task.status = "completed";
        }
      }
    })

    localStorage.setItem('odinTasks',JSON.stringify(tasks));
  }

  // delete task from local storage
  static deleteTask(el){
    const tasks = Storage.getTasks(); 
    //const id = el.closest('.task__box').id    
    tasks.forEach((task, index) => {
      if(task.id === Storage.getTaskID(el)){
        tasks.splice(index, 1);
      }
    })

    localStorage.setItem('odinTasks',JSON.stringify(tasks));
  }

  // helper - find index of task based on id
  static getTaskID(el){
    const id = el.closest('.task__box').id;
    return id;
  }

  // helper - return the task from local storage based on id
  static getTaskInfo(el) {
    const tasks = Storage.getTasks();
    const task = tasks.filter((t) => {return t.id === Storage.getTaskID(el)});
    return task;
  }

  // update task properties in local storage
  static updateTask(id,name, description, dueDate){
    const tasks = Storage.getTasks(); 
    const index = tasks.findIndex((task) =>  task.id === id);
    tasks[index].name = name;
    tasks[index].description = description;
    tasks[index].dueDate = dueDate;    
    localStorage.setItem('odinTasks',JSON.stringify(tasks));
  }
}

