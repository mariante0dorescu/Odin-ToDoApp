export default class Task {
   constructor(name, priority, description, dueDate, status = "active", project = null) {
    this.id = Math.floor(Math.random() * Date.now()).toString(16);
    this.name = name;
    this.priority =  priority;
    this.description = description;
    this.dueDate = dueDate;
    this.status = status;
    this.project = project;
  }

  getDate() {
    return this.dueDate
  }

  getDateFormatted() {
    const day = this.dueDate.split('/')[2]
    const month = this.dueDate.split('/')[1]
    const year = this.dueDate.split('/')[0]
    return `${month}/${day}/${year}`
  }
}

