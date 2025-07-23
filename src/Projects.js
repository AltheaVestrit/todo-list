// To do: add functionality to add tasks to project using Tasks.js module

export default (function Projects() {
    
    let projects = {};

    const createNewProject = (name) => {
        const id = crypto.randomUUID();
        const tasks = {};
        projects[id] = { name, tasks };
    }

    const deleteProject = (id) => {
        if (projects.hasOwnProperty(id)) {
            delete projects[id];
            return true;
        } else {
            return false;
        }
    }

    const returnProjects = () => {
        return projects
    };

    return { createNewProject, returnProjects, deleteProject };
})();