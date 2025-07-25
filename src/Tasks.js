export default function Tasks() {
  let tasks = {};

  const createNewTask = ({
    name,
    description = "",
    dueDate = "",
    priority = "Low",
    status = "To do",
  }) => {
    const id = crypto.randomUUID();
    tasks[id] = { name, description, dueDate, priority, status, id };
  };

  const returnTasks = () => {
    return tasks;
  };

  const deleteTask = (id) => {
    if (tasks.hasOwnProperty(id)) {
      delete tasks[id];
      return true;
    } else {
      return false;
    }
  };

  createNewTask({ name: "New Task" });

  return { createNewTask, returnTasks, deleteTask };
}
