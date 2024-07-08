const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector(".wrapper input");
const tasksContainer = document.querySelector(".tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");

let taskCount = 0;

const displayCount = (taskCount) => {
    countValue.innerText = taskCount;
};

const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";
    if (!taskName) {
        setTimeout(() => {
            error.style.display = "block";
        }, 200);
        return;
    }

    const task = `<div class="task">
        <input type="checkbox" class="task-check">
        <span class="taskname">${taskName}</span>
        <button class="edit">
        <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="delete">
        <i class="fa-solid fa-trash"></i>
        </button>
    </div>`;

    tasksContainer.insertAdjacentHTML("beforeend", task);

    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((button) => {
        button.onclick = () => {
            button.parentNode.remove();
            taskCount = 1;
            displayCount(taskCount);
        };
    });

    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach((editBtn) => {
        editBtn.onclick = (e) => {
            let targetElement = e.target;
            if (!(e.target.className == "edit")) {
                targetElement = e.target.parentElement;
            }
            const taskNameElement = targetElement.previousElementSibling;
            const taskElement = targetElement.parentNode;

            targetElement.style.display = "none";
            targetElement.nextElementSibling.style.display = "none";

            newTaskInput.value = "";

            const confirmEditButton = document.createElement("button");
            confirmEditButton.className = "confirm-edit";
            confirmEditButton.innerHTML = "Confirm";

            const cancelEditButton = document.createElement("button");
            cancelEditButton.className = "cancel-edit";
            cancelEditButton.innerHTML = "Cancel";

            taskElement.appendChild(confirmEditButton);
            taskElement.appendChild(cancelEditButton);

            taskNameElement.contentEditable = "true";
            taskNameElement.focus();

            confirmEditButton.onclick = () => {
                taskNameElement.innerText =
                    newTaskInput.value.trim() || taskNameElement.innerText;
                newTaskInput.value = "";
                taskNameElement.contentEditable = "false";
                confirmEditButton.remove();
                cancelEditButton.remove();
                targetElement.style.display = "inline-block";
                targetElement.nextElementSibling.style.display = "inline-block";
            };

            cancelEditButton.onclick = () => {
                taskNameElement.contentEditable = "false";
                confirmEditButton.remove();
                cancelEditButton.remove();
                targetElement.style.display = "inline-block";
                targetElement.nextElementSibling.style.display = "inline-block";
            };
        };
    });

    const tasksCheck = document.querySelectorAll(".task-check");
    tasksCheck.forEach((checkBox) => {
        checkBox.onchange = () => {
            checkBox.nextElementSibling.classList.toggle("completed");
            if (checkBox.checked) {
                taskCount -= 1;
            } else {
                taskCount += 1;
            }
            displayCount(taskCount);
        };
    });
    taskCount += 1;
    displayCount(taskCount);
    newTaskInput.value = "";
};

addBtn.addEventListener("click", addTask);

window.onload = () => {
    taskCount = 0;
    displayCount(taskCount);
    newTaskInput.value = "";
};
