export default class Task {
   constructor(name, priority, description, dueDate, status, project = null) {
    this.id = Math.floor(Math.random() * Date.now()).toString(16);
    this.name = name;
    this.priority =  priority;
    this.description = description;
    this.dueDate = dueDate;
    this.status = status;
    this.project = project;
  }
}
