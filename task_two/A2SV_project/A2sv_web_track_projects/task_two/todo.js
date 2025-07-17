"use strict";
const input = document.getElementById("input_");
const addButton = document.getElementById("add_button");
const noTaskMsg = document.getElementById("no-task");
const editModal = document.getElementById("editModal");
const editInput = document.getElementById("editInput");
const saveEdit = document.getElementById("saveEdit");
const cancelEdit = document.getElementById("cancelEdit");
let tasks = [];
let currentEditId = null;
function renderTasks() {
    const existList = document.getElementById("task-list");
    if (existList)
        existList.remove();
    const ul = document.createElement("ul");
    ul.id = "task-list";
    if (tasks.length === 0) {
        noTaskMsg.style.display = "block";
    }
    else {
        noTaskMsg.style.display = "none";
    }
    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.innerHTML = `
        <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleComplete('${task.id}')">
        ${task.text}
        <button class="edit" onclick="editTask('${task.id}')">Edit</button>
        <button class="delete" onclick="deleteTask('${task.id}')">Delete</button>
    `;
        ul.appendChild(li);
    });
    document.body.appendChild(ul);
    addButton.addEventListener("click", () => {
        const taskText = input.value.trim();
        if (!taskText) {
            alert('please Enter the task');
        }
        ;
        const newTask = {
            id: Date.now().toString(),
            text: taskText,
            completed: false,
        };
        tasks.push(newTask);
        input.value = "";
        renderTasks();
    });
    window.deleteTask = function (id) {
        tasks = tasks.filter((t) => t.id !== id);
        renderTasks();
    };
    window.editTask = function (id) {
        const task = tasks.find((t) => t.id === id);
        if (!task)
            return;
        currentEditId = id;
        editInput.value = task.text;
        editModal.classList.remove("hidden");
    };
    window.toggleComplete = function (id) {
        const task = tasks.find((t) => t.id === id);
        if (task) {
            task.completed = !task.completed;
            renderTasks();
        }
    };
    saveEdit.addEventListener("click", () => {
        if (!currentEditId)
            return;
        const task = tasks.find((t) => t.id === currentEditId);
        if (task) {
            task.text = editInput.value.trim();
            currentEditId = null;
            editModal.classList.add("hidden");
            renderTasks();
        }
    });
    cancelEdit.addEventListener("click", () => {
        editModal.classList.add("hidden");
    });
}
console.log("hel");
renderTasks();
