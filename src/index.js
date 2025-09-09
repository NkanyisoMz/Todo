import "./style.css";
import {Project} from "./modules/project.js";
import {Todo} from "./modules/todo.js";
import { renderProjects, renderTodos } from "./modules/dom.js";
import { saveProjects, loadProjects } from "./modules/storage.js";

// Loads or create default project
let projects = loadProjects();
let activeProjectIndex = 0;

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

// Add project button
document.getElementById("add-project").addEventListener("click", () => {
  const name = prompt("Enter new project name:");
  if (name) {
    const newProject = new Project(name);
    projects.push(newProject);
    saveProjects(projects);
    renderProjects(projects);
  }
});

// Add todo button
document.getElementById("add-todo").addEventListener("click", () => {
  const activeProject = projects[activeProjectIndex];
  if (!activeProject) return;

  const title = prompt("Todo title?");
  const desc = prompt("Todo description?");
  const due = prompt("Due date (YYYY-MM-DD)?");
  const priority = prompt("Priority (low/medium/high)?");

  if (title) {
    const newTodo = new Todo(title, desc, due, priority, false);
    activeProject.addTodo(newTodo);
    saveProjects(projects);
    renderTodos(activeProject);
  }
});

function setActiveProject(index) {
  activeProjectIndex = index;
  renderTodos(projects[activeProjectIndex]);
}

renderProjects(projects, setActiveProject);
renderTodos(projects[activeProjectIndex]);