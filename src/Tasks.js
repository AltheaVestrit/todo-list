export default function Tasks() {
  let tasks = {};

  // CREATE
  const createNewTask = ({
    name,
    description = "",
    dueDate = "",
    priority = "Low",
    status = "To do",
  }) => {
    const id = crypto.randomUUID();
    tasks[id] = { name, description, dueDate, priority, status };
  };

  // RETURN
  const hasTask = (id) => {
    if (tasks.hasOwnProperty(id)) {
      return true;
    } else {
      return false;
    }
  };

  // only for dev purposes:
  const returnTasks = () => {
    return tasks;
  };

  const returnTaskIDs = () => {
    return Object.keys(tasks);
  };

  const returnTask = (id) => {
    if (hasTask(id)) {
      return {
        name: tasks[id].name,
        description: tasks[id].description,
        dueDate: tasks[id].dueDate,
        priority: tasks[id].priority,
        status: tasks[id].status,
      };
    } else {
      return false;
    }
  };

  const returnAllTasks = () => {
    let returnObject = {};
    for (const [key, value] of Object.entries(tasks)) {
      returnObject[key] = {
        name: value.name,
        description: value.description,
        dueDate: value.dueDate,
        priority: value.priority,
        status: value.status,
      };
    }
    return returnObject;
  };

  // UPDATE
  const updateTask = (
    id,
    {
      name = false,
      description = false,
      dueDate = false,
      priority = false,
      status = false,
    }
  ) => {
    if (hasTask(id)) {
      tasks[id].name = name ? name : tasks[id].name;
      tasks[id].description = description ? description : tasks[id].description;
      tasks[id].dueDate = dueDate ? dueDate : tasks[id].dueDate;
      tasks[id].priority = priority ? priority : tasks[id].priority;
      tasks[id].status = status ? status : tasks[id].status;
      return true;
    } else {
      return false;
    }
  };

  // DELETE
  const deleteTask = (id) => {
    if (hasTask(id)) {
      delete tasks[id];
      return true;
    } else {
      return false;
    }
  };

  createNewTask({ name: "New Task" });

  return {
    createNewTask,
    hasTask,
    returnTasks,
    returnTaskIDs,
    returnTask,
    returnAllTasks,
    updateTask,
    deleteTask,
  };
}
