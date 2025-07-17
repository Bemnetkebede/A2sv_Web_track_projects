"use strict";
const taskInput = document.getElementById("input_");
const addButton = document.getElementById("add_button");
const taskList = document.createElement("ul");
taskList.className = "task-list";
document.body.appendChild(taskList);
// Modal elements
const editModal = document.getElementById("editModal");
const editInput = document.getElementById("editInput");
const saveEditBtn = document.getElementById("saveEdit");
const cancelEditBtn = document.getElementById("cancelEdit");
let tasks = [];
function updateEmptyMessage() {
    const existingMsg = document.getElementById("emptyMessage");
    if (taskList.children.length === 0 && !existingMsg) {
        const msg = document.createElement("p");
        msg.id = "emptyMessage";
        msg.className = "empty-message";
        msg.textContent = "No tasks added yet.";
        document.body.appendChild(msg);
    }
    else if (taskList.children.length > 0 && existingMsg) {
        existingMsg.remove();
    }
}
function renderTask(task) {
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
function addTask() {
    const taskValue = taskInput.value.trim();
    if (!taskValue) {
        alert("Please enter the task");
        return;
    }
    const newTask = { value: taskValue };
    tasks.push(newTask);
    renderTask(newTask);
    storeTasks();
    taskInput.value = "";
}
function updateTask(oldValue, newValue) {
    const task = tasks.find((t) => t.value === oldValue);
    if (task) {
        task.value = newValue;
        storeTasks();
    }
}
function storeTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
    const saved = localStorage.getItem("tasks");
    if (!saved)
        return;
    tasks = JSON.parse(saved);
    tasks.forEach(renderTask);
}
window.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    updateEmptyMessage();
});
addButton.addEventListener("click", addTask);
