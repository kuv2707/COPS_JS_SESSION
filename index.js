let tasks = JSON.parse(localStorage.getItem("tasks"));
if(!tasks) tasks=[]


let heading=document.querySelector(".heading")
console.log(heading)
heading.innerText="TODO LIST BY COPS IITBHU"

const tasksContainer = document.querySelector(".tasks-container");
const taskInputContainer = document.querySelector(".task-input-container");
const taskAddButton = document.querySelector(".task-add-button");
const taskTitleInput = document.querySelector(".task-title-input");


function taskAddHandler() {
	const title = taskTitleInput.value;
	resetInputTaker();
	const task = {
        title:title,
        done:false,
        id:Date.now()
    };
	console.log(task);
    
	appendNewTask(task);
}

function resetInputTaker() {
	taskTitleInput.value = "";
	taskAddButton.disabled = true;
}

taskAddButton.addEventListener("click",taskAddHandler)



taskTitleInput.addEventListener("keyup", function () {
	//cannot use keypress as it does not work for backspace
	if (taskTitleInput.value === "") {
		taskAddButton.disabled = true;
	} else {
		taskAddButton.disabled = false;
	}
});


function appendNewTask(task) {
	tasks.push(task);
	saveTasks();
	const taskEntryElement = createTaskEntryElement(task);
	tasksContainer.appendChild(taskEntryElement);
}

function createTaskEntryElement(task) {
	const outerdiv = document.createElement("div");
	outerdiv.className = "task-entry";
	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.checked = task.done;
	const titleshower = document.createElement("div");
	titleshower.className = "task-title";
	if (task.done) titleshower.classList.toggle("strike-through");
	titleshower.innerText = task.title;
	const deletebutton = document.createElement("button");
	deletebutton.className = "task-delete";
	deletebutton.innerText = "delete";
	outerdiv.appendChild(checkbox);
	outerdiv.appendChild(titleshower);
	outerdiv.appendChild(deletebutton);

	deletebutton.onclick = function () {
		outerdiv.remove();
		tasks = tasks.filter((t) => t.id !== task.id);
		saveTasks();
	};

	checkbox.addEventListener("click",function () {
		task.done = checkbox.checked;
		titleshower.classList.toggle("strike-through");
		saveTasks();
	});

	return outerdiv;
}


function saveTasks() {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}


window.onload = function () {
	tasks.forEach(function (task) {
		const taskEntryElement = createTaskEntryElement(task);
		tasksContainer.appendChild(taskEntryElement);
	});
};
