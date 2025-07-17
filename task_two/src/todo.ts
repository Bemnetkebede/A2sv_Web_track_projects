interface Task {
    value: string;
}

const taskInput = document.getElementById("input_") as HTMLInputElement;
const addButton = document.getElementById("add_button") as HTMLButtonElement;
const taskList = document.createElement("ul");
taskList.className = "task-list";
document.body.appendChild(taskList);

// Modal elements
const editModal = document.getElementById("editModal") as HTMLDivElement;
const editInput = document.getElementById("editInput") as HTMLInputElement;
const saveEditBtn = document.getElementById("saveEdit") as HTMLButtonElement;
const cancelEditBtn = document.getElementById("cancelEdit") as HTMLButtonElement;

let tasks: Task[] = [];

function updateEmptyMessage(): void {
    const existingMsg = document.getElementById("emptyMessage");
    if (taskList.children.length === 0 && !existingMsg) {
        const msg = document.createElement("p");
        msg.id = "emptyMessage";
        msg.className = "empty-message";
        msg.textContent = "No tasks added yet.";
        document.body.appendChild(msg);
    } else if (taskList.children.length > 0 && existingMsg) {
        existingMsg.remove();
    }
    }

    function renderTask(task: Task): void {
    const listItem = document.createElement("li");
    listItem.className = "list-Item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";

    const taskSpan = document.createElement("span");
    taskSpan.className = "task-text";
    taskSpan.textContent = task.value;

    checkbox.addEventListener("change", () => {
        taskSpan.classList.toggle("completed", checkbox.checked);
    });

    const editBtn = document.createElement("button");
    editBtn.className = "editBtn";
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
        editInput.value = taskSpan.textContent || "";
        editModal.classList.remove("hidden");

        cancelEditBtn.onclick = () => {
        editModal.classList.add("hidden");
        };

        saveEditBtn.onclick = () => {
        const newValue = editInput.value.trim();
        if (newValue) {
            taskSpan.textContent = newValue;
            updateTask(task.value, newValue);
            task.value = newValue;
            editModal.classList.add("hidden");
        }
        };
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "deleteBtn";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
        taskList.removeChild(listItem);
        tasks = tasks.filter((t) => t.value !== task.value);
        storeTasks();
        updateEmptyMessage();
    };

    const leftSide = document.createElement("div");
    leftSide.className = "task-left";
    leftSide.appendChild(checkbox);
    leftSide.appendChild(taskSpan);

    const rightSide = document.createElement("div");
    rightSide.className = "task-right";
    rightSide.appendChild(editBtn);
    rightSide.appendChild(deleteBtn);

    listItem.appendChild(leftSide);
    listItem.appendChild(rightSide);
    taskList.appendChild(listItem);

    updateEmptyMessage();
}

function addTask(): void {
    const taskValue = taskInput.value.trim();
    if (!taskValue) {
        alert("Please enter the task");
        return;
    }

    const newTask: Task = { value: taskValue };
    tasks.push(newTask);
    renderTask(newTask);
    storeTasks();
    taskInput.value = "";
}

function updateTask(oldValue: string, newValue: string): void {
    const task = tasks.find((t) => t.value === oldValue);
    if (task) {
        task.value = newValue;
        storeTasks();
    }
}

function storeTasks(): void {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(): void {
    const saved = localStorage.getItem("tasks");
    if (!saved) return;
    tasks = JSON.parse(saved);
    tasks.forEach(renderTask);
}

window.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    updateEmptyMessage();
});

addButton.addEventListener("click", addTask);
