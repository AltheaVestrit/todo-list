export default class View {
  constructor() {
    // Nav list with projects
    this.projectsList = this.getElement("#project-menu-list");
    // "Add project" button
    this.createProjectBtn = this.getElement("#new-project-btn");
    // Tasks section
    this.taskTable = this.getElement("#task-table");
    this.projectTitle = this.getElement("#active-project-name");
    // "Add task" button
    this.createTaskBtn = this.getElement("#new-task-btn");
    // Reset button
    this.resetToDoListBtn = this.getElement("#reset");
    // Project modal
    this.projectModal = this.getElement("#project-form");
    this.projectModalOverlay = this.getElement("#project-overlay");
    this.projectCloseModalBtn = this.getElement("#project-close-btn");
    this.projectModalSubmitBtn = this.getElement("#project-modal-submit-btn");
    this.projectInputName = this.getElement("#project-input-name");
    // Task modal
    this.taskModal = this.getElement("#task-form");
    this.taskModalOverlay = this.getElement("#task-overlay");
    this.taskCloseModalBtn = this.getElement("#task-close-btn");
    this.taskModalSubmitBtn = this.getElement("#task-modal-submit-btn");
    this.taskInputName = this.getElement("#task-input-name");
    this.taskInputDescription = this.getElement("#task-input-description");
    this.taskInputDate = this.getElement("#task-input-date");
    this.taskInputPriority = this.getElement("#task-input-priority");
    this.taskInputStatus = this.getElement("#task-input-status");
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
    this.createTaskBtn.classList.add("hidden");
    this.projectsList.innerHTML = "";
    let firstProjectID;
    for (const [key, value] of Object.entries(projects)) {
      firstProjectID = firstProjectID ? firstProjectID : key;
      this.createTaskBtn.classList.remove("hidden");
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
        // const editBtn = this.createElement(
        //   "button",
        //   "task-btn tooltip btn-edit",
        //   taskID
        // );
        // editBtn.innerHTML = `✏️
        //     <span class="tooltiptext small-text">Edit</span>`;
        // actionCell.appendChild(editBtn);
        const deleteBtn = this.createElement(
          "button",
          "task-btn tooltip btn-delete",
          taskID
        );
        deleteBtn.innerHTML = `🗑️
            <span class="tooltiptext small-text">Delete</span>`;
        actionCell.appendChild(deleteBtn);
        // const changeProjectBtn = this.createElement(
        //   "button",
        //   "task-btn tooltip btn-change-project",
        //   taskID
        // );
        // changeProjectBtn.innerHTML = `🔄
        //     <span class="tooltiptext small-text">Change Project</span>`;
        // actionCell.appendChild(changeProjectBtn);
        this.taskTable.appendChild(actionCell);
      }
    } else {
      this.projectTitle.innerText = "";
    }
  }

  bindDeleteTask(handler) {
    const delBtns = document.querySelectorAll(".btn-delete");
    delBtns.forEach(button => {
      button.addEventListener("click", e => {
        handler(this.#getActiveProject(),e.target.dataset.id);
      })
    })
  }

  bindCreateProjectModal(handler) {
    const modalClose = () => {
      this.projectModal.classList.add("hidden");
      this.projectModalOverlay.classList.add("hidden");
      this.projectInputName.value = "";
    };
    const modalSubmit = () => {
      if (this.projectInputName.value) {
        handler(this.projectInputName.value);
        this.projectInputName.value = "";
        modalClose();
      }
    };
    this.projectCloseModalBtn.addEventListener("click", modalClose);
    this.projectModalOverlay.addEventListener("click", modalClose);
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        !this.projectModal.classList.contains("hidden")
      ) {
        modalClose();
      }
    });
    this.createProjectBtn.addEventListener("click", (e) => {
      this.projectModal.classList.remove("hidden");
      this.projectModalOverlay.classList.remove("hidden");
    });
    this.projectModalSubmitBtn.addEventListener("click", (e) => {
      if (this.projectInputName.value) {
        modalSubmit();
      }
    });
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Enter" &&
        !this.projectModal.classList.contains("hidden")
      ) {
        modalSubmit();
      }
    });
  }

  bindCreateTaskModal(handler) {
    const modalClose = () => {
      this.taskModal.classList.add("hidden");
      this.taskModalOverlay.classList.add("hidden");
      this.taskInputName.value = "";
    };
    const modalSubmit = () => {
      if (this.taskInputName.value) {
        handler(this.#getActiveProject(), {
          name: this.taskInputName.value,
          description: this.taskInputDescription.value,
          dueDate: this.taskInputDate.value,
          priority: this.taskInputPriority.value,
          status: this.taskInputStatus.value,
        });
        this.taskInputName.value = "";
        modalClose();
      }
    };
    this.taskCloseModalBtn.addEventListener("click", modalClose);
    this.taskModalOverlay.addEventListener("click", modalClose);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !this.taskModal.classList.contains("hidden")) {
        modalClose();
      }
    });
    this.createTaskBtn.addEventListener("click", (e) => {
      this.taskModal.classList.remove("hidden");
      this.taskModalOverlay.classList.remove("hidden");
    });
    this.taskModalSubmitBtn.addEventListener("click", (e) => {
      if (this.taskInputName.value) {
        modalSubmit();
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !this.taskModal.classList.contains("hidden")) {
        modalSubmit();
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
