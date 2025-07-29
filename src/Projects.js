export default function StartProjects(projects = false) {
  // PROJECT METHODS
  // CREATE
  const createNewProject = (name) => {
    const id = crypto.randomUUID();
    const tasks = {};
    projects[id] = { name, tasks };
  };

  if (!projects) {
    var projects = {};
    createNewProject("Default Project");
    createNewTask(returnProjectIDs()[0], { name: "New Task" });
  };

  // RETURN
  const returnAllData = () => {
    return projects;
  };

  const hasProject = (id) => {
    if (projects.hasOwnProperty(id)) {
      return true;
    } else {
      return false;
    }
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
  const createNewTask = (
    projectID,
    { name, description = "", dueDate = "", priority = "Low", status = "To do" }
  ) => {
    if (hasProject(projectID)) {
      const taskID = crypto.randomUUID();
      projects[projectID].tasks[taskID] = { name, description, dueDate, priority, status };
      return true;
    } else {
      return false;
    }
  };

  // RETURN
  const hasTask = (projectID, taskID) => {
    if (hasProject(projectID)) {
      if (projects[projectID].hasOwnProperty(taskID)) {
        return true;
      } else {
        console.log("Task does not exist");
        return false;
      }
    } else {
      console.log("Project does not exist");
      return false;
    }
  };

  const returnAllTasks = (projectID) => {
    if (hasProject(projectID)) {
      return projects[projectID].tasks;
    } else {
      return "Project not found";
    }
  };

  const returnTaskIDs = (projectID) => {
    if (hasProject(projectID)) {
      return Object.keys(projects[projectID].tasks);
    } else {
      return "Project not found";
    }
  };

  const returnTask = (projectID, taskID) => {
    if (hasTask(projectID, taskID)) {
      return projects[projectID].tasks[taskID];
    }
  };

  // UPDATE
  const updateTask = (
    projectID,
    taskID,
    {
      name = false,
      description = false,
      dueDate = false,
      priority = false,
      status = false,
    }
  ) => {
    if (hasTask(projectID, taskID)) {
      projects[projectID].tasks[id].name = name ? name : tasks[id].name;
      projects[projectID].tasks[id].description = description
        ? description
        : tasks[id].description;
      projects[projectID].tasks[id].dueDate = dueDate
        ? dueDate
        : tasks[id].dueDate;
      projects[projectID].tasks[id].priority = priority
        ? priority
        : tasks[id].priority;
      projects[projectID].tasks[id].status = status ? status : tasks[id].status;
      return true;
    } else {
      return false;
    }
  };

  // DELETE
  const deleteTask = (projectID, taskID) => {
    if (hasTask(projectID, taskID)) {
      delete projects[projectID].tasks[taskID];
    }
  };

  return {
    createNewProject,
    returnAllData,
    hasProject,
    returnProjectIDs,
    returnProject,
    updateProject,
    deleteProject,
    createNewTask,
    hasTask,
    returnAllTasks,
    returnTaskIDs,
    returnTask,
    updateTask,
    deleteTask,
  };
};
