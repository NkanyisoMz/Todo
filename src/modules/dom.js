export function renderProjects(projects, onSelect, onEdit, onDelete) {
  const projectList = document.getElementById("project-list");
  projectList.innerHTML = "";

  projects.forEach((project, index) => {
    const li = document.createElement("li");

    const btn = document.createElement("button");
    btn.textContent = project.name;
    btn.dataset.index = index;
    btn.addEventListener("click", () => onSelect(index));

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // don’t also trigger select
      onEdit(index);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      onDelete(index);
    });

    li.appendChild(btn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    projectList.appendChild(li);
  });
}


  
export function renderTodos(project, onSelect, onEdit, onDelete) {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";

  project.getTodos().forEach((todo, index) => {
    const li = document.createElement("li");

    const btn = document.createElement("button");
    btn.textContent = `${todo.title} (due: ${todo.dueDate})`;
    btn.addEventListener("click", () => onSelect(todo, index));

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      onEdit(index);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      onDelete(index);
    });

    li.appendChild(btn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  });
}
  
export function showTodoDetail(todo) {
    const detailDiv = document.getElementById("todo-detail");
    detailDiv.classList.remove("hidden");
  
    detailDiv.innerHTML = `
      <h3>${todo.title}</h3>
      <p><strong>Description:</strong> ${todo.description}</p>
      <p><strong>Due:</strong> ${todo.dueDate}</p>
      <p><strong>Priority:</strong> ${todo.priority}</p>
      <p><strong>Status:</strong> ${todo.completed ? "Done ✅" : "Pending ⏳"}</p>
      <button id="close-detail">Close</button>
    `;


  document.getElementById("close-detail").addEventListener("click", hideTodoDetail);
  }

  export function hideTodoDetail() {
  const detailDiv = document.getElementById("todo-detail");
  detailDiv.classList.add("hidden");
  detailDiv.innerHTML = ""; // clear content
}

  