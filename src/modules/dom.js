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

export function hideTodoDetail() {
  const detailDiv = document.getElementById("todo-detail");
  if (detailDiv) {
    detailDiv.classList.add("hidden");
    detailDiv.innerHTML = "";
  }
}

const overlay = document.getElementById("overlay");
const projectModal = document.getElementById("project-modal");
const todoModal = document.getElementById("todo-modal");
const todoDetailModal = document.getElementById("todo-detail-modal");
const todoDetailContent = document.getElementById("todo-detail-content");

export const hideModals = () => {
  overlay.style.display = "none";
  projectModal.style.display = "none";
  todoModal.style.display = "none";
  todoDetailModal.style.display = "none";
};

export const showModal = (modal) => {
  overlay.style.display = "block";
  modal.style.display = "block";
};

// ✅ Cleaned up: receives todo + callbacks
export function showTodoDetails(todo, onEdit, onDelete) {
  todoDetailContent.innerHTML = `
    <h3>${todo.title}</h3>
    <p>${todo.description || ""}</p>
    <p><strong>Due:</strong> ${todo.dueDate || "N/A"}</p>
    <p><strong>Priority:</strong> ${todo.priority || "Low"}</p>
  `;

  showModal(todoDetailModal);

  document.getElementById("edit-todo").onclick = onEdit;
  document.getElementById("delete-todo").onclick = onDelete;
  document.getElementById("close-todo-detail").onclick = hideModals;
}
