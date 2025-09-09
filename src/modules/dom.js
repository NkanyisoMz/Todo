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
  
      li.addEventListener("click", () => {
        showTodoDetail(todo);
      });
  
      todoList.appendChild(li);
    });
  }
  
  function showTodoDetail(todo) {
    const detailDiv = document.getElementById("todo-detail");
    detailDiv.classList.remove("hidden");
  
    detailDiv.innerHTML = `
      <h3>${todo.title}</h3>
      <p><strong>Description:</strong> ${todo.description}</p>
      <p><strong>Due:</strong> ${todo.dueDate}</p>
      <p><strong>Priority:</strong> ${todo.priority}</p>
      <p><strong>Status:</strong> ${todo.completed ? "Done ✅" : "Pending ⏳"}</p>
    `;
  }
  