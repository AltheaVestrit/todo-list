import Tasks from "./Tasks.js";

export default (function Projects() {
  let projects = {};

  const createNewProject = (name) => {
    const id = crypto.randomUUID();
    const tasks = Tasks();
    projects[id] = { name, tasks };
  };

  const deleteProject = (id) => {
    if (projects.hasOwnProperty(id)) {
      delete projects[id];
      return true;
    } else {
      return false;
    }
  };

  const returnProjects = () => {
    return projects;
  };

  const updateProject = (id, newName) => {
    if (projects.hasOwnProperty(id)) {
      projects[id].name = newName;
      return true;
    } else {
      return false;
    }
  }

  const returnSpecificProject = (id) => {
    if (projects.hasOwnProperty(id)) {
      return projects[id];
    } else {
      return;
    }
  }

  createNewProject("Default Project");

  return { createNewProject, returnProjects, returnSpecificProject, updateProject, deleteProject };
})();
