import {Project} from "./project.js";
import {Todo} from "./todo.js";

function loadProjects() {
  const data = JSON.parse(localStorage.getItem("projects"));
  if (!data) return [];

  return data.map(projectData => {
    const project = new Project(projectData.name);
    projectData.todos.forEach(todoData => {
      const todo = new Todo(
        todoData.title,
        todoData.description,
        todoData.dueDate,
        todoData.priority,
        todoData.completed
      );
      project.addTodo(todo);
    });
    return project;
  });
}

function saveProjects(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

// 👇 Export them both together
export { loadProjects, saveProjects };
