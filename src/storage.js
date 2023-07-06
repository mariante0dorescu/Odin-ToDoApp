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

  static deleteTask(el){
    const tasks = Storage.getTasks(); 
    const id = el.closest('.task__box').id    
    tasks.forEach((task, index) => {
      if(task.id === id){
        tasks.splice(index, 1);
      }
    })

    localStorage.setItem('odinTasks',JSON.stringify(tasks));
  }
}

