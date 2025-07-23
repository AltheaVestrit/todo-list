export default (function TasksArray() {
    
    let tasksArray = [];

    const createNewTask = ({ name, description = "", dueDate = "", priority = "Low", status = "To do" }) => {
        const id = crypto.randomUUID();
        tasksArray.push({ name, description, dueDate, priority, status, id });
    }

    const returnTasksArray = () => {return tasksArray};

    return { createNewTask, returnTasksArray };
})();