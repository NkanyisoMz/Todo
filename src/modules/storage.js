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
  