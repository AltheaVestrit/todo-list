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

// import css:
import './styles.css';
*/

import myProjects from "./Projects.js";

// ====================== TESTING ======================== //

console.log("=================================");
console.log("INITIALIZE PROJECTS IIFE");
console.log(myProjects.returnProjects());

console.log("=================================");
console.log("UPDATE PROJECT NAME");
const firstProject = Object.entries(myProjects.returnProjects())[0][0]; //first [0]: to get the first entry, second [0]: to get the key of that entry ([1] would get the value)
console.log("Update succesful: " + myProjects.updateProject(firstProject,"Blabla"));
console.log(myProjects.returnProjects());

console.log("=================================");
console.log("ADD NEW PROJECT");
myProjects.createNewProject("My new project");
console.log(myProjects.returnProjects());

console.log("=================================");
console.log("DELETE PROJECT")
console.log("Deletion succesful: " + myProjects.deleteProject(firstProject));
console.log(myProjects.returnProjects());

console.log("=================================");
console.log("TRY TO DELETE NON-EXISTING PROJECT");
console.log("Deletion succesful: " + myProjects.deleteProject(firstProject)); //firstProject was already deleted before
console.log(myProjects.returnProjects());

console.log("=================================");
console.log("ADD NEW TASK TO EXISTING PROJECT");
const newProject = Object.entries(myProjects.returnProjects())[0][1];
newProject.tasks.createNewTask({name: "my new task", priority: "high"});
console.log(newProject.tasks.returnTasks());

console.log("=================================");
console.log(myProjects.projects);

console.log("=================================");
console.log("TRY TO ADD NEW TASK TO NON-EXISTING PROJECT");
firstProject.tasks.createNewTask({name: "my new task", priority: "high"});
console.log(newProject.tasks.returnTasks());

/*

To do:
- Figure out: why can projects not be accessed, but tasks can
- How to deal with adding task to non-existing project? Is this even a valid use case?

*/