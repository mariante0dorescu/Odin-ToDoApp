export default class Storage {
  static getTasks(){
    let tasks;
    if(localStorage.getItem("odinTasks") === null) {
      tasks = []
    } else {
      tasks = JSON.parse(localStorage.getItem('odinTasks'));
    }
    return tasks;
  }

  static getTodayTasks(tasks){
    tasks = Storage.getTasks();
    console.log(tasks)
    return tasks;
  }

  static getNextWeekTasks(task){
    console.log(tasks)
  }

  static getProjects(){
    let tasks = Storage.getTasks();
    const projectNames = tasks
      .filter((task) => task.project !== null)
      .map((task) => task.project);
    console.log(projectNames);
    return projectNames;
  }

  // static getProjects(){
  //   let tasks;
  //   if(localStorage.getItem("odinProjects") === null) {
  //     books = []
  //   } else {
  //     books = JSON.parse(localStorage.getItem('odinProjects'));
  //   }
  //   return books;
  // }

  static addTask(task) {
    const tasks = Storage.getTasks();    
    tasks.push(task);
    localStorage.setItem('odinTasks',JSON.stringify(tasks))
  }

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

  static getTaskID(el){
    const id = el.closest('.task__box').id;
    return id;
  }

  static getTaskInfo(el) {
    const tasks = Storage.getTasks();
    const task = tasks.filter((t) => {return t.id === Storage.getTaskID(el)});
    return task;
  }

  static updateTask(id,name, description, dueDate){
    //console.log(id, name, description, dueDate)

    const tasks = Storage.getTasks(); 
    const index = tasks.findIndex((task) =>  task.id === id);
    tasks[index].name = name;
    tasks[index].description = description;
    tasks[index].dueDate = dueDate;    
    localStorage.setItem('odinTasks',JSON.stringify(tasks));
  }
 
}

