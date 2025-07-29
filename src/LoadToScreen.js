export default (function LoadToScreen() {

    const projectMenuList = document.querySelector(".project-menu-list");
    const activeProjectName = document.querySelector("#active-project-name");

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
    }

    const loadActiveProject = (obj) => {

    }

    return { loadProjectsToNav };
})();