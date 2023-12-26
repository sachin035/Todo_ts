// import { Task, ITask } from "./task";
// import { TaskList, ITaskList } from "./taskList";
// import "./assets/style.css";

// const searchInput = document.getElementById("search-input") as HTMLInputElement;

// const taskList = new TaskList();

// const todoListElement = document.getElementById("task-listElement");

// function createTask(title: string, description: string): Task {
//   const task = new Task(title, description);
//   taskList.addTask(task);

//   return task;
// }

// // Example usage:
// createTask("Learn JavaScript", "Study and practice JavaScript fundamentals");

// function toggleTaskCompleted(id: string): Task {
//   const task = taskList.getTaskById(id);

//   if (!task) {
//     throw new Error(`Task with id ${id} not found`);
//   }

//   task.toggleCompleted();

//   return task;
// }

// function filterTasks(list: ITaskList, searchTerm: string = ""): ITaskList {
//   const tasks = list.list.filter((item) => {
//     return (
//       item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.description.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   });

//   return new TaskList(tasks);
// }

// function renderList(tasks: ITaskList) {
//   if (!todoListElement) throw new Error("Todo element not found");

//   todoListElement.innerHTML = "";

//   tasks.list.forEach((task) => {
//     const element = document.createElement("div");
//     element.classList.add("task-item");

//     const title = document.createElement("h2");
//     title.classList.add("todo-title");
//     title.textContent = task.title;

//     const description = document.createElement("label");
//     description.classList.add("todo-description");
//     description.textContent = task.description;

//     const label = document.createElement("label");
//     label.classList.add("form-control");
//     element.appendChild(label);

//     const inputField = document.createElement("input");
//     inputField.setAttribute("type", "checkbox");
//     inputField.checked = task.completed;

//     inputField.addEventListener("change", () => {
//       toggleTaskCompleted(task.id);
//       renderList(filterTasks(taskList, searchInput.value));
//     });

//     label.appendChild(title);
//     label.appendChild(description);
//     label.appendChild(inputField);

//     todoListElement.appendChild(element);
//   });
// }

// const todoBtnAdd = document.getElementById("add-task");

// todoBtnAdd?.addEventListener("click", () => {
//   // const title: string =
//   //   (document.getElementById("todo-input-title") as HTMLInputElement).value ||
//   //   "Todo";
//   // const desc: string =
//   //   (document.getElementById("todo-input-desc") as HTMLInputElement).value ||
//   //   "Nothing to describe here !! 😁";
//   // const todo = createTask(title, desc);
//   // renderList(filterTasks(taskList, searchInput.value));

//   // titleInput.value = "";
//   // descInput.value = "";
//   // // hideForm();

//   const titleInput = document.getElementById(
//     "todo-input-title"
//   ) as HTMLInputElement;
//   const descInput = document.getElementById(
//     "todo-input-desc"
//   ) as HTMLInputElement;

//   const title: string = titleInput.value || "Todo";
//   const desc: string = descInput.value || "Nothing to describe here !! 😁";

//   // Create task and render the list
//   const todo = createTask(title, desc);
//   renderList(filterTasks(taskList, searchInput.value));

//   // Reset input values to the original placeholder
//   titleInput.value = "";
//   descInput.value = "";

//   // hideForm();
// });

// searchInput.addEventListener("input", () => {
//   render(searchInput.value);
// });

// function render(searchParam: string = "") {
//   const filteredTaskList = filterTasks(taskList, searchParam);
//   renderList(filteredTaskList);
// }

// render();

// function hideForm(): void {
//   const todoList = document.getElementById("todo-list");
//   if (todoList) {
//     todoList.style.display = "none";
//     (document.getElementById("todo-input-title") as HTMLInputElement).value =
//       "";
//     (document.getElementById("todo-input-desc") as HTMLInputElement).value = "";
//   }
// }

import { Task, ITask } from "./task";
import { TaskList, ITaskList } from "./taskList";
import "./assets/style.css";

let titleInput: HTMLInputElement;
let descInput: HTMLInputElement;
let addTaskButton: HTMLButtonElement;

const searchInput = document.getElementById("search-input") as HTMLInputElement;
const allBtn = document.getElementById("all-btn") as HTMLButtonElement;
const completedBtn = document.getElementById(
  "completed-btn"
) as HTMLButtonElement;
const remainingBtn = document.getElementById(
  "remaining-btn"
) as HTMLButtonElement;

const taskList = new TaskList();
const todoListElement = document.getElementById("task-listElement");

function createTask(title: string, description: string): Task {
  const task = new Task(title, description);
  taskList.addTask(task);

  return task;
}

function toggleTaskCompleted(id: string): Task {
  const task = taskList.getTaskById(id);

  if (!task) {
    throw new Error(`Task with id ${id} not found`);
  }

  task.toggleCompleted();

  return task;
}

function filterTasks(
  list: ITaskList,
  searchTerm: string = "",
  completed?: boolean
): ITaskList {
  let tasks = list.list;

  if (completed !== undefined) {
    tasks = tasks.filter((item) => item.completed === completed);
  }

  tasks = tasks.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return new TaskList(tasks);
}

function renderList(tasks: ITaskList) {
  if (!todoListElement) throw new Error("Todo element not found");

  todoListElement.innerHTML = "";

  tasks.list.forEach((task) => {
    const element = document.createElement("div");
    element.classList.add("task-item");

    const title = document.createElement("h2");
    title.classList.add("todo-title");
    title.textContent = task.title;

    const description = document.createElement("label");
    description.classList.add("todo-description");
    description.textContent = task.description;

    const label = document.createElement("label");
    label.classList.add("form-control");
    element.appendChild(label);

    const inputField = document.createElement("input");
    inputField.setAttribute("type", "checkbox");
    inputField.checked = task.completed;

    inputField.addEventListener("change", () => {
      toggleTaskCompleted(task.id);
      renderList(filterTasks(taskList, searchInput.value));
    });

    label.appendChild(title);
    label.appendChild(description);
    label.appendChild(inputField);

    todoListElement.appendChild(element);
  });
}

allBtn?.addEventListener("click", () =>
  renderList(filterTasks(taskList, searchInput.value))
);
completedBtn?.addEventListener("click", () => {
  renderList(filterTasks(taskList, searchInput.value, true));
});

remainingBtn?.addEventListener("click", () => {
  renderList(filterTasks(taskList, searchInput.value, false));

  hideInputAndButton();
});

const todoBtnAdd = document.getElementById("add-task");

todoBtnAdd?.addEventListener("click", () => {
  const titleInput = document.getElementById(
    "todo-input-title"
  ) as HTMLInputElement;
  const descInput = document.getElementById(
    "todo-input-desc"
  ) as HTMLInputElement;

  const title: string = titleInput.value || "Todo";
  const desc: string = descInput.value || "No description";

  // Create task and render the list
  const todo = createTask(title, desc);
  renderList(filterTasks(taskList, searchInput.value));

  // Reset input values to the original placeholder
  titleInput.value = "";
  descInput.value = "";
});

searchInput.addEventListener("input", () => {
  render(searchInput.value);
});

function render(searchParam: string = "") {
  const filteredTaskList = filterTasks(taskList, searchParam);
  renderList(filteredTaskList);
}

function hideInputAndButton() {
  if (titleInput && descInput && addTaskButton) {
    titleInput.style.display = "none";
    descInput.style.display = "none";
    addTaskButton.style.display = "none";
  }
}

render();
