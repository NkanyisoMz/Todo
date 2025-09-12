import "./style.css";
import { Project } from "./modules/project.js";
import { Todo } from "./modules/todo.js";
import { renderProjects, renderTodos, showTodoDetails, showProjectModal, showTodoModal } from "./modules/dom.js";
import { saveProjects, loadProjects } from "./modules/storage.js";

// Loads or create default project
let projects = loadProjects();
let activeProjectIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  console.log("Projects loaded:", projects); // Debug

  // Create default project if none exist
  if (projects.length === 0) {
    const defaultProject = new Project("Default");
    defaultProject.addTodo(
      new Todo("Buy milk", "Go to the store and get whole milk", "2025-09-10", "high", false)
    );
    defaultProject.addTodo(
      new Todo("Study", "Finish Odin Project lesson on todos", "2025-09-12", "medium", false)
    );
    defaultProject.addTodo(
      new Todo("Exercise", "30 min run in the park", "2025-09-13", "low", false)
    );
    projects.push(defaultProject);
    saveProjects(projects);
  }

  // Add project button
  const addProjectBtn = document.getElementById("add-project");
  if (addProjectBtn) {
    addProjectBtn.addEventListener("click", () => {
      showProjectModal("add", null, projects, (newProject) => {
        projects.push(newProject);
        saveProjects(projects);
        renderProjects(projects, setActiveProject, editProject, deleteProject);
      });
    });
  } else {
    console.error("Element #add-project not found in DOM");
  }

  // Add todo button
  const addTodoBtn = document.getElementById("add-todo");
  if (addTodoBtn) {
    addTodoBtn.addEventListener("click", () => {
      const activeProject = projects[activeProjectIndex];
      if (!activeProject) return;

      showTodoModal("add", null, activeProjectIndex, projects, (newTodo) => {
        activeProject.addTodo(newTodo);
        saveProjects(projects);
        renderTodos(
          activeProject,
          (todo, tIndex) => showTodoDetails(todo, () => editTodo(tIndex), () => deleteTodo(tIndex)),
          (tIndex) => editTodo(tIndex),
          (tIndex) => deleteTodo(tIndex)
        );
      });
    });
  } else {
    console.error("Element #add-todo not found in DOM");
  }

  // Initial render
  console.log("Rendering initial projects and todos");
  renderProjects(projects, setActiveProject, editProject, deleteProject);
  if (projects.length > 0) {
    renderTodos(
      projects[activeProjectIndex],
      (todo, tIndex) => showTodoDetails(todo, () => editTodo(tIndex), () => deleteTodo(tIndex)),
      (tIndex) => editTodo(tIndex),
      (tIndex) => deleteTodo(tIndex)
    );
  } else {
    document.getElementById("todo-list").innerHTML = "<p>No projects available. Add a project to start.</p>";
  }
});

// --- Functions ---

function setActiveProject(index) {
  activeProjectIndex = index;
  renderTodos(
    projects[activeProjectIndex],
    (todo, tIndex) => showTodoDetails(todo, () => editTodo(tIndex), () => deleteTodo(tIndex)),
    (tIndex) => editTodo(tIndex),
    (tIndex) => deleteTodo(tIndex)
  );
}

function editProject(index) {
  showProjectModal("edit", index, projects, (updatedProject) => {
    projects[index] = updatedProject;
    saveProjects(projects);
    renderProjects(projects, setActiveProject, editProject, deleteProject);
  });
}

function deleteProject(index) {
  if (confirm("Are you sure you want to delete this project?")) {
    projects.splice(index, 1);
    if (activeProjectIndex >= projects.length) activeProjectIndex = projects.length - 1;
    saveProjects(projects);
    renderProjects(projects, setActiveProject, editProject, deleteProject);
    if (projects.length > 0) {
      renderTodos(
        projects[activeProjectIndex],
        (todo, tIndex) => showTodoDetails(todo, () => editTodo(tIndex), () => deleteTodo(tIndex)),
        (tIndex) => editTodo(tIndex),
        (tIndex) => deleteTodo(tIndex)
      );
    } else {
      document.getElementById("todo-list").innerHTML = "<p>No projects available. Add a project to start.</p>";
    }
  }
}

function editTodo(index) {
  const project = projects[activeProjectIndex];
  showTodoModal("edit", index, activeProjectIndex, projects, (updatedTodo) => {
    project.getTodos()[index] = updatedTodo;
    saveProjects(projects);
    renderTodos(
      project,
      (todo, tIndex) => showTodoDetails(todo, () => editTodo(tIndex), () => deleteTodo(tIndex)),
      (tIndex) => editTodo(tIndex),
      (tIndex) => deleteTodo(tIndex)
    );
  });
}

function deleteTodo(index) {
  const project = projects[activeProjectIndex];
  if (confirm("Delete this todo?")) {
    project.getTodos().splice(index, 1);
    saveProjects(projects);
    renderTodos(
      project,
      (todo, tIndex) => showTodoDetails(todo, () => editTodo(tIndex), () => deleteTodo(tIndex)),
      (tIndex) => editTodo(tIndex),
      (tIndex) => deleteTodo(tIndex)
    );
  }
}