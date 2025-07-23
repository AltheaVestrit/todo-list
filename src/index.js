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

import Projects from "./Projects.js"

const myProjects = Projects;

console.log("Initialize projects object:")
console.log(myProjects.returnProjects());

console.log("Add a project to the projects object:")
myProjects.createNewProject("my new project");
console.log(myProjects.returnProjects());

console.log("Remove project:")
const firstProject = Object.entries(myProjects.returnProjects())[0][0]; //first [0]: to get the first entry, second [0]: to get the key of that entry ([1] would get the value)
console.log("Deletion succesful: " + myProjects.deleteProject(firstProject));
console.log(myProjects.returnProjects());