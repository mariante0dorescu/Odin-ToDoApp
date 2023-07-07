export default class Project {
  constructor(name, tasks) {
    this.name = name;
    this.tasks = [];
  }

  get tasks() {
    return this.tasks;
  }
}