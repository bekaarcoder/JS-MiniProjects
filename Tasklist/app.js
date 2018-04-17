const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('.list-group');
const filter = document.querySelector('#filter');
const clearTask = document.querySelector('#clearTask');

loadEventListener();

loadTasks();

function loadEventListener() {
  taskForm.addEventListener('submit', addTask);
  clearTask.addEventListener('click', removeTasks);
  taskList.addEventListener('click', removeTask);
  filter.addEventListener('keyup', filterTask);
  if(localStorage.getItem('tasks') === null) {
    clearTask.setAttribute('style', 'display: none;');
    filter.setAttribute('style', 'display: none;');
  }
}

function loadTasks() {
  if (localStorage.getItem('tasks') === null) {
    document.querySelector('#taskMsg').textContent = 'There is no task to display.';
  } else {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task) => {
      loadTask(task);
    });
  }
}

function addTask(e) {
  e.preventDefault();
  if (taskInput.value === "") {
    alert("Empty task cannot be added.");
  } else {
    const text = taskInput.value;
    loadTask(text);
    taskInput.value = "";
    clearTask.setAttribute('style', 'display: block;');
    filter.setAttribute('style', 'display: block;');
    document.querySelector('#taskMsg').textContent = "";

    storeInLocalStorage(text); //store task in localstorage
  }
}

function removeTasks(e) {
  if (confirm('Are you sure you want to delete all tasks?')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    removeAllTasksFromStorage();
    clearTask.setAttribute('style', 'display: none;');
    filter.setAttribute('style', 'display: none;');
  }
}

function removeTask(e) {
  if (e.target.parentElement.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure you want to delete this task?')) {
      e.target.parentElement.parentElement.parentElement.remove();
      removeTaskFromStorage(e.target.parentElement.parentElement.parentElement);
    }
  }
}

function filterTask(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.list-group-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.setAttribute('style', 'display: block');
    } else {
      task.setAttribute('style', 'display: none !important;');
    }
  });
}

function storeInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// load a single task in the list
function loadTask(task) {
  const li = document.createElement('li');
  li.className = 'list-group-item d-flex justify-content-between align-items-center';
  li.appendChild(document.createTextNode(task));
  const link = document.createElement('a');
  link.className = 'delete-item';
  link.innerHTML = '<i class="fas fa-trash-alt"></i>';
  li.appendChild(link);
  taskList.appendChild(li);
}

function removeTaskFromStorage(taskItem) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach((task, index) => {
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  if(tasks.length == 0) {
    localStorage.removeItem('tasks');
    clearTask.setAttribute('style', 'display: none;');
    filter.setAttribute('style', 'display: none;');
    document.querySelector('#taskMsg').textContent = 'There is no task to display.';
  }
}

function removeAllTasksFromStorage() {
  localStorage.removeItem('tasks');
  document.querySelector('#taskMsg').textContent = 'There is no task to display.';
}