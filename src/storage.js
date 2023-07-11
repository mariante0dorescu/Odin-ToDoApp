import Task from './task'

export default class Storage {
  // get tasks local save or epmty array
  static getTasks(){
    let tasks;
    if(localStorage.getItem("odinTasks") === null) {
      tasks = []
    } else {
      tasks = JSON.parse(localStorage.getItem('odinTasks'));
    }
    return tasks
  }

  //convert local storage into tasks class instance
  static convertTasks(tasks){
    let taskCls = [];
    tasks.forEach((task) => {
    taskCls.push(new Task(task.name, task.priority, task.description, task.dueDate, task.status, task.project))
    })

    return taskCls;
  }

  // get project local save or epmty array
  static getProjects(){
    let projects;
    if(localStorage.getItem("odinProjects") === null) {
      projects = [];
    } else {
      projects = JSON.parse(localStorage.getItem("odinProjects"));
    }
    return projects;
  }

  // add new project to local storage
  static saveProject(project){
    const localProjects = Storage.getProjects();    
    localProjects.push(project);
    localStorage.setItem("odinProjects",JSON.stringify(localProjects))
  }
  
  // check if project name already exists in the local storage
  static getProjectId(name){
    const localProjects = Storage.getProjects();
    return localProjects.findIndex((project) =>  project.name === name);
  }

  // get project task based on the name of the project
  static getProjectTasks(name) {
    let tasks = Storage.getTasks(); // returns all tasks
    let localProjects = Storage.getProjects(); // returns all projects 
    let index = Storage.getProjectId(name)
    let tasksIDS = localProjects[index].tasks; // returns array with ids of tasks
    
    let result = tasksIDS.map((id) => {
      return tasks.find((task) => {
        return task.id === id;
      })
    })
    
    return result;
  }

  // add new task to project
  static saveTaskInProject(projectName, id){
    const localProjects = Storage.getProjects();
    const index = localProjects.findIndex((project) => project.name = projectName);
          
    localProjects[index].tasks.push(id);
    localStorage.setItem("odinProjects",JSON.stringify(localProjects))
  }


  // return the index of the project saved in storage, based on the name
  static getProjectStorageId(projectName){
    // const localProjects = Storage.getProjects();
    // console.log(localProjects)
    // console.log(projectName)
    const index = Storage.getProjects().findIndex((project) => project.name = projectName);    
    return index;
  }


  // add task to local storage
  static saveTask(task) {
    const tasks = Storage.getTasks();    
    tasks.push(task);
    localStorage.setItem('odinTasks',JSON.stringify(tasks));
  }

  // get tasks with today's date
  static getTodayTasks(){
    let tasks = Storage.convertTasks(Storage.getTasks());
    console.log(tasks)
    return tasks;
  }

  //get tasks with next week's date
  static getNextWeekTasks(){
    let tasks = Storage.getTasks();
    console.log(tasks)
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
    const id = Storage.getTaskID(el); 
    console.log(id) 
    // delete from tasks local storage
    const tasks = Storage.getTasks();
    
    const filteredTasks = tasks.filter(task => task.id !== id);
    console.log(filteredTasks)
    
    // tasks.forEach((task, index) => {
     
    //   if(task.id === id){
    //     tasks.splice(index, 1);
    //   }
    // })
    

    // delete id from project saved in local storage
    const localProjects = Storage.getProjects();
    localProjects.forEach((project) => {
      project.tasks = project.tasks.filter((taskId) => taskId !== id);
    })

    // localStorage.setItem("odinProjects",JSON.stringify(localProjects))
    // localStorage.setItem('odinTasks',JSON.stringify(tasks));
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

