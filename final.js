/**
 * create an array for tasks
 * define a class for task
 * select relevant elements from DOM
 * add event listener for add button and enter key
 * add event listener for input field, to disable button when input is empty
 *
 */

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

class Task {
	constructor(title) {
		this.title = title;
		this.done = false;
		this.id = Date.now();
	}
}

const tasksContainer = document.querySelector(".tasks-container");
const taskInputContainer = document.querySelector(".task-input-container");
const taskAddButton = document.querySelector(".task-add-button");
const taskTitleInput = document.querySelector(".task-title-input");

function taskAddHandler() {
	const title = taskTitleInput.value;
	resetInputTaker()
	const task = new Task(title);
	console.log(task)
	appendNewTask(task);
}

function resetInputTaker()
{
	taskTitleInput.value = "";
	taskAddButton.disabled=true;
}

taskAddButton.addEventListener("click", taskAddHandler);

taskTitleInput.addEventListener("keyup", function (e) {
	//cannot use keypress as it does not work for backspace
	if (taskTitleInput.value === "") {
		taskAddButton.disabled = true;
	} else {
		taskAddButton.disabled = false;
	}
});

taskTitleInput.addEventListener("keydown",function(){
	if (e.key === "Enter") {
		taskAddHandler();
	}
})

/**
 * Add the task object to tasks array, save it, and render it on the dom
 * @param {Task} task The task object
 */
function appendNewTask(task) {
	tasks.push(task);
	saveTasks();
	const taskEntryElement = createTaskEntryElement(task);
	tasksContainer.appendChild(taskEntryElement);
}

/**
 * should be called each time there is a change in the tasks array or its elements
 */
function saveTasks() {
	localStorage.setItem("tasks", JSON.stringify(tasks));
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

	checkbox.onclick = function () {
		task.done = checkbox.checked;
		titleshower.classList.toggle("strike-through");
		saveTasks();
	};

	return outerdiv;
}

//when page loads, populate the task list from local storage
window.onload = function () {
	tasks.forEach(function (task) {
		const taskEntryElement = createTaskEntryElement(task);
		tasksContainer.appendChild(taskEntryElement);
	});
};
