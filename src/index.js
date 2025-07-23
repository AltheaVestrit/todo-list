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

console.log("[Local Storage Test] Starting test...")

localStorage.setItem("myKey", "myValue");
console.log(localStorage.getItem("myKey"));

const myTask1 = {
    name: "Do the laundry",
    dueDate: "23-07-2023",
    priority: "medium",
    description: "Wash the colored clothes, and maybe the dark clothes as well",
    status: "to do"
};

const myTask2 = {
    name: "Wash dishes",
    dueDate: "23-07-2023",
    priority: "high",
    description: "Handwash wooden utensils and run dishwasher",
    status: "done"
}

const tasksArray = [myTask1, myTask2];



localStorage.setItem("tasks", JSON.stringify(tasksArray));
console.log(JSON.parse(localStorage.getItem("tasks")));

console.log("[Local Storage Test] Test completed!")