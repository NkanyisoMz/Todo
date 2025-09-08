export function renderProjects(projects) {
    const projectList = document.getElementById("project-list");
    projectList.innerHTML = "";
    projects.forEach((project, index) => {
      const li = document.createElement("li");
      li.textContent = project.name;
      li.dataset.index = index;
      projectList.appendChild(li);
    });
  }
  
  export function renderTodos(project) {
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";
    project.getTodos().forEach((todo, index) => {
      const li = document.createElement("li");
      li.textContent = `${todo.title} (due: ${todo.dueDate})`;
      li.dataset.index = index;
      todoList.appendChild(li);
    });
  }
  