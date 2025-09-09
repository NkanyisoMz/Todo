import "./style.css";
import {Project} from "./modules/project.js";
import {Todo} from "./modules/todo.js";
import { renderProjects, renderTodos } from "./modules/dom.js";
import { saveProjects, loadProjects } from "./modules/storage.js";

// Loads or create default project
let projects = loadProjects();
if (projects.length === 0) {
  const defaultProjects = new Project("Default");

  defaultProjects.addTodo( 
    new Todo("Buy milk", "Go to the store and get whole milk",
    "2025-09-10","high"));
    defaultProjects.addTodo(
      new Todo("Study", "Finish Odin Project lesson on todos", 
      "2025-09-12", "medium")
    );
    defaultProjects.addTodo(
      new Todo("Exercise", "30 min run in the park", 
      "2025-09-13", "low")
    );

    projects.push(defaultProjects);
    saveProjects(projects);
}

// Render the UI
renderProjects(projects);

//Render first project’s todos immediately
renderTodos(projects[0]);
