import "./style.css";
import {Project} from "./modules/project.js";
import {Todo} from "./modules/todo.js";
import { renderProjects, renderTodos, showTodoDetail  } from "./modules/dom.js";
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
  renderTodos(
    projects[activeProjectIndex],
    showTodoDetail,
    editTodo,
    deleteTodo
  );
}

function editProject(index) {
  const newName = prompt("Enter new project name:", projects[index].name);
  if (newName) {
    projects[index].name = newName;
    saveProjects(projects);
    renderProjects(projects, setActiveProject, editProject, deleteProject);
  }
}

function deleteProject(index) {
  if (confirm("Are you sure you want to delete this project?")) {
    projects.splice(index, 1);
    if (activeProjectIndex >= projects.length) activeProjectIndex = 0;
    saveProjects(projects);
    renderProjects(projects, setActiveProject, editProject, deleteProject);
    if (projects.length > 0) {
      renderTodos(projects[activeProjectIndex], showTodoDetail, editTodo, deleteTodo);
    }
  }
}

function editTodo(index) {
  const project = projects[activeProjectIndex];
  const todo = project.getTodos()[index];

  const newTitle = prompt("Edit title:", todo.title);
  const newDesc = prompt("Edit description:", todo.description);
  const newDue = prompt("Edit due date:", todo.dueDate);
  const newPriority = prompt("Edit priority (low/medium/high):", todo.priority);

  todo.title = newTitle || todo.title;
  todo.description = newDesc || todo.description;
  todo.dueDate = newDue || todo.dueDate;
  todo.priority = newPriority || todo.priority;

  saveProjects(projects);
  renderTodos(project, showTodoDetail, editTodo, deleteTodo);
}

function deleteTodo(index) {
  const project = projects[activeProjectIndex];
  if (confirm("Delete this todo?")) {
    project.todos.splice(index, 1);
    saveProjects(projects);
    renderTodos(project, showTodoDetail, editTodo, deleteTodo);
  }
}

// Initial render
renderProjects(projects, setActiveProject, editProject, deleteProject);
renderTodos(projects[activeProjectIndex], showTodoDetail, editTodo, deleteTodo);
