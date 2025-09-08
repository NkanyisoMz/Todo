import "./style.css";
import Project from "./modules/project.js";
import Todo from "./modules/todo.js";
import { renderProjects } from "./modules/dom.js";
import { saveProjects, loadProjects } from "./modules/storage.js";

// Loads or create default project
let projects = loadProjects();
if (projects.length === 0) {
  const defaultProjects = ["Default", "Work", "Personal"].map(
    (name) => new Project(name)
  );
  projects.push(...defaultProjects);
  saveProjects(projects);
}

// Render the UI
renderProjects(projects);
