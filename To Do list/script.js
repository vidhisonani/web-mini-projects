const inputTask = document.getElementById("inputTask");
const addBtn = document.getElementById("addBtn");
const taskContainer = document.querySelector(".taskContainer")
const completeClassContainer = document.querySelector(".completeClassContainer")
const displayBlock1 = document.querySelector(".displayBlock1")
const displayBlock2 = document.querySelector(".displayBlock2")
const displayBlock3 = document.querySelector(".displayBlock3")
const displayBlock4 = document.querySelector(".displayBlock4")

function addTask() {
    const spanText = taskContainer.querySelectorAll("span")
    let task = inputTask.value.trim();
    task = (task.charAt(0).toUpperCase() + task.slice(1));
    if (task === "") {
        console.error("Enter any task");
        return;
    }
    let duplicateFound = false;
    spanText.forEach(element => {
        if (element.innerText.toLowerCase() === task.toLowerCase()) {
            duplicateFound = true;
        }
    });
    if (duplicateFound) {
        console.error("Already in list, Kindly enter a new item!");
        return;
    } else {
        // console.log(task);
        const taskClassEl = document.createElement("input");
        taskClassEl.type = 'checkbox';
        const taskText = document.createElement("span");
        taskText.innerText = task;
        inputTask.value = "";
        const taskItem = document.createElement("div");
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="#141B34" stroke-width="1.5" stroke-linecap="round"><path d="M19.5 5.5L19.0982 12.0062M4.5 5.5L5.10461 15.5248C5.25945 18.0922 5.33688 19.3759 5.97868 20.299C6.296 20.7554 6.7048 21.1407 7.17905 21.4302C7.85035 21.84 8.68108 21.9631 10 22" /><path d="M20 15L13 21.9995M20 22L13 15.0005" /><path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" /></svg>`;
        const editBtn = document.createElement("button");
        editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="#141B34" stroke-width="1.5" stroke-linejoin="round"><path d="M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506" /><path d="M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5" /></svg>`;
        taskItem.appendChild(taskClassEl);
        taskItem.appendChild(taskText);
        taskItem.appendChild(editBtn);
        taskItem.appendChild(deleteBtn);
        taskContainer.appendChild(taskItem);

        editBtn.classList.add("editBtn");
        deleteBtn.classList.add("deleteBtn");
        displayBlock1.style.display = "block";
        displayBlock2.style.display = "block";

        const checkbox = taskClassEl;
        checkbox.addEventListener("change", function () {
            // console.log("Checkbox clicked");
            if (this.checked) {
                taskItem.removeChild(editBtn)
                completeClassContainer.appendChild(taskItem);
                displayBlock3.style.display = "block";
                displayBlock4.style.display = "block";
            } else {
                completeClassContainer.removeChild(taskItem);
                taskItem.removeChild(deleteBtn);
                taskItem.appendChild(editBtn);
                taskItem.appendChild(deleteBtn);
                taskContainer.appendChild(taskItem);
            }
        });

        deleteBtn.addEventListener("click", event => {
            taskItem.remove()
        });
        editBtn.addEventListener("click", event => {
            if (editBtn.innerText === "" || editBtn.dataset.editing !== "true") {
                const editInput = document.createElement("input");
                editInput.type = "text";
                editInput.value = taskText.innerText;
                editInput.style.fontSize = "1.3rem";
                editInput.style.color = "#263238";
                taskItem.replaceChild(editInput, taskText);
                editBtn.innerHTML = "Save";
                editBtn.dataset.editing = "true";
                editInput.focus();
            } else {
                const newText = taskItem.querySelector("input[type='text']").value.trim();
                if (newText === "") {
                    alert("Task cannot be empty");
                    return;
                }
                taskText.innerText = newText.charAt(0).toUpperCase() + newText.slice(1);
                taskItem.replaceChild(taskText, taskItem.querySelector("input[type='text']"));
                editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="#141B34" stroke-width="1.5" stroke-linejoin="round"><path d="M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506" /><path d="M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5" /></svg>`;
                editBtn.dataset.editing = "false";
                editBtn.classList.add("editBtn");
            }
        });
    }
}
