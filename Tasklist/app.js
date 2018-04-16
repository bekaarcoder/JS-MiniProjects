const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('.list-group');
const filter = document.querySelector('#filter');
const clearTask = document.querySelector('#clearTask');

loadEventListener();

function loadEventListener() {
  taskForm.addEventListener('submit', addTask);
  clearTask.addEventListener('click', removeTasks);
  taskList.addEventListener('click', removeTask);
  filter.addEventListener('keyup', filterTask);
}

function addTask(e) {
  e.preventDefault();
  if(taskInput.value === "") {
    alert("Empty task cannot be added.");
  } else {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    const text = taskInput.value;
    li.appendChild(document.createTextNode(text));
    const link = document.createElement('a');
    // link.setAttribute('href', '#');
    link.className = 'delete-item';
    link.innerHTML = '<i class="fas fa-trash-alt"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
    taskInput.value = "";
  }
}

function removeTasks(e) {
  if(confirm('Are you sure you want to delete all tasks?')) {
    while(taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
}

function removeTask(e) {
  if(e.target.parentElement.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure you want to delete this task?')) {
      e.target.parentElement.parentElement.parentElement.remove();
    }
  }
}

function filterTask(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.list-group-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1) {
      // console.log(item);
      task.setAttribute('style', 'display: block');
    } else {
      console.log(item);
      task.setAttribute('style', 'display: none !important;');
    }
  });
}