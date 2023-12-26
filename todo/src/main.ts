import { Task } from "./task";
import { TaskList, ITaskList } from "./taskList";
import "./assets/style.css";

// let titleInput: HTMLInputElement;
// // let descInput: HTMLInputElement;
// let addTaskButton: HTMLButtonElement;

const searchInput = document.getElementById("search-input") as HTMLInputElement;
const allBtn = document.getElementById("all-btn") as HTMLButtonElement;
const completedBtn = document.getElementById(
  "completed-btn"
) as HTMLButtonElement;
const remainingBtn = document.getElementById(
  "remaining-btn"
) as HTMLButtonElement;

const titleInput = document.getElementById(
  "todo-input-title"
) as HTMLInputElement;
const descInput = document.getElementById(
  "todo-input-desc"
) as HTMLInputElement;

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

    const deleteIcon = document.createElement("span");
    deleteIcon.classList.add("delete-icon");
    deleteIcon.textContent = "❌";

    deleteIcon.addEventListener("click", () => {
      deleteTask(task.id);
      renderList(filterTasks(taskList, searchInput.value));
    });

    label.appendChild(title);
    label.appendChild(description);
    label.appendChild(inputField);
    label.appendChild(deleteIcon);

    todoListElement.appendChild(element);
  });
}

allBtn?.addEventListener("click", () => {
  renderList(filterTasks(taskList, searchInput.value));
  showInputAndButton();
});
completedBtn?.addEventListener("click", () => {
  renderList(filterTasks(taskList, searchInput.value, true));
  hideInputAndButton();
});

remainingBtn?.addEventListener("click", () => {
  renderList(filterTasks(taskList, searchInput.value, false));

  hideInputAndButton();
});

const todoBtnAdd = document.getElementById("add-task") as HTMLInputElement;

todoBtnAdd?.addEventListener("click", () => {
  const title: string = titleInput.value || "Todo";
  const desc: string = descInput.value || "No description";

  // Create task and render the list
  createTask(title, desc);
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
  if (titleInput && descInput && todoBtnAdd) {
    titleInput.style.display = "none";
    descInput.style.display = "none";
    todoBtnAdd.style.display = "none";
  }
}
function showInputAndButton() {
  if (titleInput && descInput && todoBtnAdd) {
    titleInput.style.display = "block";
    descInput.style.display = "block";
    todoBtnAdd.style.display = "block";
  }
}

function deleteTask(id: string) {
  const taskIndex = taskList.list.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    taskList.list.splice(taskIndex, 1);
  }
}

render();
