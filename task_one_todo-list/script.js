var taskInput = document.getElementById("input_");
var addButton = document.getElementById("add_button");

var taskList = document.createElement("ul");
taskList.className = "task-list";
document.body.appendChild(taskList);

updateEmptyMessage()
function updateEmptyMessage() {
    const existingMsg = document.getElementById("emptyMessage");
    console.log(taskList.children.length)
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

addButton.addEventListener(
    "click" , ()=>{
        var taskText = taskInput.value.trim();
        console.log(taskText)
        if (taskText == ''){
            alert('please Enter the task')
        }
        else if (taskText != ''){
            var listItem = document.createElement("li")
            listItem.className = 'list-Item'

            const checkbox = document.createElement("input")
            checkbox.type = "checkbox";
            checkbox.className = "task-checkbox";

            const taskSpan = document.createElement("span");
            taskSpan.className = "task-text";
            taskSpan.textContent = taskText;

            checkbox.addEventListener("change", () => {
                taskSpan.classList.toggle("completed", checkbox.checked);
            });
            
            const editModal = document.getElementById("editModal");
            const editInput = document.getElementById("editInput");
            const saveEditBtn = document.getElementById("saveEdit");
            const cancelEditBtn = document.getElementById("cancelEdit");
            const editBtn = document.createElement("button");
            editBtn.className ="editBtn"
            editBtn.textContent = "Edit";
            editBtn.onclick = () => {
                editInput.value = taskSpan.textContent;

                editModal.classList.remove("hidden");
                cancelEditBtn.onclick = () => {
                    editModal.classList.add("hidden")
                }
                saveEditBtn.onclick = () =>{
                    if (editInput.value.trim() && taskSpan){
                        taskSpan.textContent = editInput.value.trim()
                        editModal.classList.add("hidden");
                    }
                }
            }
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "deleteBtn";
            deleteBtn.textContent = "Delete";
            deleteBtn.onclick = () => {
                taskList.removeChild(listItem);
                updateEmptyMessage();
            };
            // Group checkbox + text
            const leftSide = document.createElement("div");
            leftSide.className = "task-left";
            leftSide.appendChild(checkbox);
            leftSide.appendChild(taskSpan);

            // Group buttons
            const rightSide = document.createElement("div");
            rightSide.className = "task-right";
            rightSide.appendChild(editBtn);
            rightSide.appendChild(deleteBtn);

            // Append to <li>
            listItem.appendChild(leftSide);
            listItem.appendChild(rightSide);

            // Add to the task list
            taskList.appendChild(listItem);
            updateEmptyMessage();

            taskInput.value = "";

        }

    }
)