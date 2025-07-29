import Tasks from "./Tasks.js";

export default (function Projects() {
  let projects = {};

  // PROJECT METHODS
  // CREATE
  const createNewProject = (name) => {
    const id = crypto.randomUUID();
    const tasks = Tasks();
    projects[id] = { name, tasks };
  };

  // RETURN
  const hasProject = (id) => {
    if (projects.hasOwnProperty(id)) {
      return true;
    } else {
      return false;
    }
  };

  // only for dev purposes:
  const returnProjects = () => {
    return projects;
  };

  const returnProjectIDs = () => {
    return Object.keys(projects);
  };

  const returnProject = (id) => {
    if (hasProject(id)) {
      return projects[id].name;
    } else {
      return "false - Project not found";
    }
  };

  // UPDATE
  const updateProject = (id, newName) => {
    if (hasProject(id)) {
      projects[id].name = newName;
      return true;
    } else {
      return false;
    }
  };

  // DELETE
  const deleteProject = (id) => {
    if (hasProject(id)) {
      delete projects[id];
      return true;
    } else {
      return false;
    }
  };

  // TASK METHODS
  // CREATE
  const createNewTask = (projectID, argsObj) => {
    if (hasProject(projectID)) {
      projects[projectID].tasks.createNewTask(argsObj);
      return true;
    } else {
      return false;
    }
  };

  // RETURN
  // only for dev purposes:
  const returnTasks = (projectID) => {
    if (hasProject(projectID)) {
      return projects[projectID].tasks.returnTasks();
    } else {
      return "Project not found";
    }
  };

  const returnTaskIDs = (projectID) => {
    if (hasProject(projectID)) {
      return projects[projectID].tasks.returnTaskIDs();
    } else {
      return "false - Project not found";
    }
  };

  const returnTask = (projectID, taskID) => {
    if (hasProject(projectID)) {
      if (projects[projectID].tasks.hasTask(taskID)) {
        projects[projectID].tasks.returnTask(taskID);
        return true;
      } else {
        return "false - Task not found";
      }
    } else {
      return "false - Project not found";
    }
  };

  const returnAllData = () => {
    let returnObject = {};
    for (const [key, value] of Object.entries(projects)) {
      returnObject[key] = {name: value.name, tasks: value.tasks.returnAllTasks()};
    }
    return returnObject;
  }

  // UPDATE
  const updateTask = (projectID, taskID, argsObj) => {
    if (hasProject(projectID)) {
      if (projects[projectID].tasks.hasTask(taskID)) {
        projects[projectID].tasks.updateTask(taskID, argsObj);
        return true;
      } else {
        return "false - Task not found";
      }
    } else {
      return "false - Project not found";
    }
  };

  // DELETE
  const deleteTask = (projectID, taskID) => {
    if (hasProject(projectID)) {
      if (projects[projectID].tasks.hasTask(taskID)) {
        projects[projectID].tasks.deleteTask(taskID);
        return true;
      } else {
        return "false - Task not found";
      }
    } else {
      return "false - Project not found";
    }
  };

  createNewProject("Default Project");

  return {
    createNewProject,
    hasProject,
    returnProjects,
    returnProjectIDs,
    returnProject,
    updateProject,
    deleteProject,
    createNewTask,
    returnTasks,
    returnTaskIDs,
    returnTask,
    returnAllData,
    updateTask,
    deleteTask,
  };
})();
