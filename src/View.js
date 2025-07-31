export default class View {
  constructor() {
    // Nav list with projects
    this.projectsList = this.getElement("#project-menu-list");
    this.projectsListItems = document.querySelectorAll("#project-menu-list li");
    // "Add project" button
    this.createProjectBtn = this.getElement("#new-project-btn");
    // Tasks section
    this.taskTable = this.getElement("#task-table");
    this.projectTitle = this.getElement("#active-project-name");
    // "Add task" button
    this.createTaskBtn = this.getElement("#new-task-btn");
    // Dev elements
    this.newProjectName = this.getElement("#new-project-name");
    this.newTaskName = this.getElement("#new-task-name");
    this.resetToDoListBtn = this.getElement("#reset");
    // Project modal
    this.projectModal = this.getElement("#project-form");
    this.projectModalOverlay = this.getElement("#project-overlay");
    this.projectCloseModalBtn = this.getElement("#project-close-btn");
    this.projectModalSubmitBtn = this.getElement("#project-modal-submit-btn");
    this.projectInputName = this.getElement("#project-input-name");
  }

  createElement(tag, className, itemID) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (itemID) element.dataset.id = itemID;
    return element;
  }

  getElement(selector) {
    return document.querySelector(selector);
  }

  #getActiveProject() {
    if (document.querySelector(".project-active")) {
      return document.querySelector(".project-active").dataset.id;
    }
  }

  #setActiveProject(projectID) {
    this.projectsListItems = document.querySelectorAll("#project-menu-list li");
    this.projectsListItems.forEach((project) => {
      if (project.dataset.id === projectID) {
        project.classList = "project-active";
      } else {
        project.classList = "";
      }
    });
  }

  static taskTableHeader = `<div class="tbl-head">Task Name</div>
  <div class="tbl-head">Description</div>
  <div class="tbl-head">Due Date</div>
  <div class="tbl-head">Priority</div>
  <div class="tbl-head">Status</div>
  <div class="tbl-head">Actions</div>`;

  renderProjects(projects, projectID) {
    this.projectsList.innerHTML = "";
    let firstProjectID;
    for (const [key, value] of Object.entries(projects)) {
      firstProjectID = firstProjectID ? firstProjectID : key;
      const project = this.createElement("li", "project", key);
      project.innerText = value.name;
      this.projectsList.appendChild(project);
    }
    if (projectID) {
      this.#setActiveProject(projectID);
    } else {
      this.#setActiveProject(firstProjectID);
    }
    this.renderTasks(projects);
  }

  renderTasks(projects) {
    this.taskTable.innerHTML = View.taskTableHeader;
    const activeProjectID = this.#getActiveProject();
    if (activeProjectID) {
      this.projectTitle.innerText = projects[activeProjectID].name;
      for (const [taskID, taskObj] of Object.entries(
        projects[activeProjectID].tasks
      )) {
        for (const [key, value] of Object.entries(taskObj)) {
          const cell = this.createElement("div");
          cell.innerText = value;
          this.taskTable.appendChild(cell);
        }
        const actionCell = this.createElement("div");
        const editBtn = this.createElement(
          "button",
          "task-btn tooltip",
          taskID
        );
        editBtn.id = "btn-edit";
        editBtn.innerHTML = `✏️
            <span class="tooltiptext small-text">Edit</span>`;
        actionCell.appendChild(editBtn);
        const deleteBtn = this.createElement(
          "button",
          "task-btn tooltip",
          taskID
        );
        deleteBtn.id = "btn-delete";
        deleteBtn.innerHTML = `🗑️
            <span class="tooltiptext small-text">Delete</span>`;
        actionCell.appendChild(deleteBtn);
        const changeProjectBtn = this.createElement(
          "button",
          "task-btn tooltip",
          taskID
        );
        changeProjectBtn.id = "btn-delete";
        changeProjectBtn.innerHTML = `🔄
            <span class="tooltiptext small-text">Change Project</span>`;
        actionCell.appendChild(changeProjectBtn);
        this.taskTable.appendChild(actionCell);
      }
    } else {
      this.projectTitle.innerText = "";
    }
  }

  bindCreateProjectModal(handler) {
    const modalClose = () => {
      this.projectModal.classList.add("hidden");
      this.projectModalOverlay.classList.add("hidden");
    }
    const modalSubmit = () => {
      if (this.projectInputName.value) {
        handler(this.projectInputName.value);
        this.projectInputName.value = "";
        modalClose();
      }
    }
    this.projectCloseModalBtn.addEventListener("click", modalClose);
    this.projectModalOverlay.addEventListener("click", modalClose);
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && !this.projectModal.classList.contains("hidden")) {
        modalClose();
      }
    });
    this.createProjectBtn.addEventListener("click", (e) => {
      this.projectModal.classList.remove("hidden");
      this.projectModalOverlay.classList.remove("hidden");
    });
    this.projectModalSubmitBtn.addEventListener("click", e => {
      if (this.projectInputName.value) {
        modalSubmit();
      }
    })
    document.addEventListener("keydown", e => {
      if (e.key === "Enter" && !this.projectModal.classList.contains("hidden")) {
        modalSubmit();
      }
    })
  }

  bindCreateTask(handler) {
    this.createTaskBtn.addEventListener("click", (e) => {
      if (this.newTaskName.value) {
        handler(this.#getActiveProject(), { name: this.newTaskName.value });
      }
    });
  }

  bindResetToDoList(handler) {
    this.resetToDoListBtn.addEventListener("click", (e) => {
      handler();
    });
  }

  bindToggleProject(handler) {
    this.projectsList.addEventListener("click", (e) => {
      handler(e.target.dataset.id);
    });
  }
}
