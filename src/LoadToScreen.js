export default (function LoadToScreen() {
  const projectMenuList = document.querySelector("#project-menu-list");
  const activeProjectName = document.querySelector("#active-project-name");
  const taskTable = document.querySelector("#task-table");

  const loadProjectsToNav = (obj) => {
    projectMenuList.innerHTML = "";
    let firstProject = true;
    for (const [key, value] of Object.entries(obj)) {
      const project = document.createElement("li");
      project.dataset.id = key;
      project.innerText = value.name;
      if (firstProject) {
        project.classList.add("project-active");
        firstProject = false;
      }
      projectMenuList.appendChild(project);
    }
  };

  const loadActiveProject = (obj) => {
    const activeProjectID =
      document.querySelector(".project-active").dataset.id;
    activeProjectName.innerText = obj[activeProjectID].name;
    taskTable.innerHTML = `<div class="tbl-head">Task Name</div>
        <div class="tbl-head">Description</div>
        <div class="tbl-head">Due Date</div>
        <div class="tbl-head">Priority</div>
        <div class="tbl-head">Status</div>
        <div class="tbl-head">Actions</div>`;
    for (const [taskID, taskObj] of Object.entries(
      obj[activeProjectID].tasks
    )) {
      for (const [key, value] of Object.entries(taskObj)) {
        const cell = document.createElement("div");
        cell.innerText = value;
        taskTable.appendChild(cell);
      }
      const actionCell = document.createElement("div");
      const editBtn = document.createElement("button");
      editBtn.dataset.id = taskID;
      editBtn.id = "btn-edit";
      editBtn.classList = "task-btn tooltip";
      editBtn.innerHTML = `✏️
            <span class="tooltiptext small-text">Edit</span>`;
      actionCell.appendChild(editBtn);
      const deleteBtn = document.createElement("button");
      deleteBtn.dataset.id = taskID;
      deleteBtn.id = "btn-delete";
      deleteBtn.classList = "task-btn tooltip";
      deleteBtn.innerHTML = `🗑️
            <span class="tooltiptext small-text">Delete</span>`;
      actionCell.appendChild(deleteBtn);
      const changeProjectBtn = document.createElement("button");
      changeProjectBtn.dataset.id = taskID;
      changeProjectBtn.id = "btn-delete";
      changeProjectBtn.classList = "task-btn tooltip";
      changeProjectBtn.innerHTML = `🔄
            <span class="tooltiptext small-text">Change Project</span>`;
      actionCell.appendChild(changeProjectBtn);
      taskTable.appendChild(actionCell);
    }
  };

  return { loadProjectsToNav, loadActiveProject };
})();
