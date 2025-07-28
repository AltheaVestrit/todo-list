/*
// import from packages:
import _ from 'lodash';

// import data:
import Icon from './icon.png';
import Data from './data.xml';
import Notes from './data.csv';
import toml from './data.toml';
import yaml from './data.yaml';
import json from './data.json5';

// import additional js files:
import myModule from './myModule.js';
*/

import './styles.css';
import myProjects from "./Projects.js";

// ====================== TESTING ======================== //

// PROJECT MODULES
console.log("=================================");
console.log("INITIALIZE PROJECTS IIFE");
console.log(myProjects.returnProjects());
const firstProject = myProjects.returnProjectIDs()[0];

// CREATE
console.log("=================================");
console.log("ADD NEW PROJECT");
myProjects.createNewProject("My new project");
console.log(myProjects.returnProjects());
const newProject = myProjects.returnProjectIDs()[1];

// DELETE
console.log("=================================");
console.log("DELETE PROJECT");
console.log("Deletion succesful: " + myProjects.deleteProject(firstProject));
console.log(myProjects.returnProjects());

// RETURN
console.log("=================================");
console.log("RETURN PROJECT");
console.log(newProject, myProjects.returnProject(newProject));

console.log("=================================");
console.log("TRY RETURNING NON-EXISTING PROJECT");
console.log(firstProject, myProjects.returnProject(firstProject));

// UPDATE
console.log("=================================");
console.log("UPDATE PROJECT NAME");
console.log(
  "Update succesful: " + myProjects.updateProject(newProject, "Blabla")
);
console.log(myProjects.returnProjects());

// DELETE
console.log("=================================");
console.log("TRY TO DELETE NON-EXISTING PROJECT");
console.log("Deletion succesful: " + myProjects.deleteProject(firstProject)); //firstProject was already deleted before
console.log(myProjects.returnProjects());

// TASKS MODULES
// CREATE
console.log("=================================");
console.log("ADD NEW TASK TO EXISTING PROJECT");
console.log(
  "Task created: " +
    myProjects.createNewTask(newProject, {
      name: "my new task",
      priority: "high",
    })
);
console.log(myProjects.returnTasks(newProject));
const myTask = myProjects.returnTaskIDs(newProject)[0];

console.log("=================================");
console.log("TRY TO ADD NEW TASK TO NON-EXISTING PROJECT");
console.log(
  "Task created: " +
    myProjects.createNewTask(firstProject, {
      name: "my new task",
      priority: "high",
    })
);

// RETURN
console.log("=================================");
console.log("RETURN TASK");
console.log(myTask, myProjects.returnTask(newProject, myTask));

console.log("=================================");
console.log("TRY RETURNING NON-EXISTSING TASK");
console.log("23497234987", myProjects.returnTask(newProject, "23497234987"));
console.log(myProjects.returnTasks(newProject));

// UPDATE
console.log("=================================");
console.log("UPDATE EXISTING TASK");
console.log(
  "Task updated: " +
    myProjects.updateTask(newProject, myTask, {
      name: "updated task",
      priority: "medium",
      dueDate: "today",
    })
);
console.log(myProjects.returnTasks(newProject));

console.log("=================================");
console.log("TRY UPDATING EXISTING TASK IN NON-EXISTING PROJECT");
console.log(
  "Task updated: " +
    myProjects.updateTask(firstProject, myTask, {
      name: "updated task",
      priority: "medium",
      dueDate: "today",
    })
);

console.log("=================================");
console.log("TRY UPDATING NON-EXISTING TASK IN EXISTING PROJECT");
console.log(
  "Task updated: " +
    myProjects.updateTask(newProject, "23423498734", {
      name: "updated task",
      priority: "medium",
      dueDate: "today",
    })
);

// DELETE
console.log("=================================");
console.log("DELETE TASK");
console.log("Task deleted: " + myProjects.deleteTask(newProject, myTask));
console.log(myProjects.returnTasks(newProject));

console.log("=================================");
console.log("TRY DELETING NON-EXISTING TASK");
console.log(
  "Task deleted: " + myProjects.deleteTask(newProject, "23497234987")
);
console.log(myProjects.returnTasks(newProject));
