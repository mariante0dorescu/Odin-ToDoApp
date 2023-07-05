export default class UI {
  static showTaskForm() {
    const formContainer = document.querySelector('.tasks__container--add-task');
    formContainer.classList.toggle('active');
  }

  static showProjectForm(){
    const formContainer = document.querySelector('.add__project');
    formContainer.classList.toggle('active');
  }
}