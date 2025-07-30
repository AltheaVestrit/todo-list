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

import "./styles.css";
import Model from "./Model.js";
import View from "./View.js";
import Controller from "./Controller.js";

const app = new Controller(new Model(), new View());
