export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Explicit 'this' binding
    this.model.bindOnToDoListChange(this.onToDoListChange);
    this.view.bindProjectModal(this.handleCreateProject);
    this.view.bindCreateTask(this.handleCreateTask);
    this.view.bindResetToDoList(this.handleReset);
    this.view.bindToggleProject(this.onToDoListChange);

    // Display initial projects and tasks
    this.view.renderProjects(this.model.projects);
  }

  /* 
  Use arrow functions on the handle events, 
  to make them easier to bind 
  (see https://www.taniarascia.com/javascript-mvc-todo-app/#controller) 
  */
  onToDoListChange = (projectID) => {
    if (projectID) {
      this.view.renderProjects(this.model.projects, projectID);
    } else {
      this.view.renderProjects(this.model.projects);
    }
  };

  handleCreateProject = (name) => {
    this.model.createProject(name);
  };

  handleUpdateProject = (id, name) => {
    this.model.UpdateProject(id, name);
  };

  handleDeleteProject = (id) => {
    this.model.deleteProject(id);
  };

  handleCreateTask = (projectID, name) => {
    this.model.createTask(projectID, name);
  };

  handleUpdateTask = (projectID, taskID, task) => {
    this.model.updateTask(projectID, taskID, task);
  };

  handleDeleteTask = (projectID, taskID) => {
    this.model.deleteTask(projectID, taskID);
  };

  handleReset = () => {
    this.model.reset();
  };
}
