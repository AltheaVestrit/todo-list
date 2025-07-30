export default class Model {
  constructor() {
    this.projects = JSON.parse(localStorage.getItem("userDataToDoApp")) || {};
  }

  // "Copy" the onChange function from the Controller to the Model class
  bindOnToDoListChange(callback) {
    this.onToDoListChange = callback;
  }

  // PROJECT METHODS
  // CREATE
  createProject(name) {
    const id = crypto.randomUUID();
    const tasks = {};
    this.projects[id] = { name, tasks };
    this.#commit(id);
  }

  // CHECK
  #hasProject(id) {
    if (this.projects.hasOwnProperty(id)) {
      return true;
    } else {
      return false;
    }
  }

  // UPDATE
  updateProject(id, newName) {
    if (this.#hasProject(id)) {
      this.projects[id].name = newName;
      this.#commit();
    }
  }

  // DELETE
  deleteProject(id) {
    if (this.#hasProject(id)) {
      delete this.projects[id];
      this.#commit();
    }
  }

  // TASK METHODS
  // CREATE
  createTask(
    projectID,
    { name, description = "", dueDate = "", priority = "Low", status = "To do" }
  ) {
    if (this.#hasProject(projectID)) {
      const taskID = crypto.randomUUID();
      this.projects[projectID].tasks[taskID] = {
        name,
        description,
        dueDate,
        priority,
        status,
      };
      this.#commit();
    }
  }

  // CHECK
  #hasTask(projectID, taskID) {
    if (this.#hasProject(projectID)) {
      if (this.projects[projectID].hasOwnProperty(taskID)) {
        return true;
      } else {
        console.log("Task does not exist");
        return false;
      }
    } else {
      console.log("Project does not exist");
      return false;
    }
  }

  // UPDATE
  updateTask(
    projectID,
    taskID,
    {
      name = false,
      description = false,
      dueDate = false,
      priority = false,
      status = false,
    }
  ) {
    if (this.#hasTask(projectID, taskID)) {
      this.projects[projectID].tasks[id].name = name ? name : tasks[id].name;
      this.projects[projectID].tasks[id].description = description
        ? description
        : tasks[id].description;
      this.projects[projectID].tasks[id].dueDate = dueDate
        ? dueDate
        : tasks[id].dueDate;
      this.projects[projectID].tasks[id].priority = priority
        ? priority
        : tasks[id].priority;
      this.projects[projectID].tasks[id].status = status
        ? status
        : tasks[id].status;
      this.#commit();
    }
  }

  // DELETE
  deleteTask(projectID, taskID) {
    if (this.#hasTask(projectID, taskID)) {
      delete this.projects[projectID].tasks[taskID];
      this.#commit();
    }
  }

  // RESET ALL
  reset() {
    this.projects = {};
    this.#commit();
  }

  // STORAGE METHODS
  // STORE DATA
  #commit(projectID) {
    if (projectID) {
      this.onToDoListChange(projectID);
    } else {
      this.onToDoListChange();
    }
    localStorage.setItem("userDataToDoApp", JSON.stringify(this.projects));
  }
}
