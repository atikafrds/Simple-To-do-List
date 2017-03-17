var addButton = document.getElementById("addListButton");
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

var titleInput = document.getElementById("titleInput");
var descInput = document.getElementById("descInput");
var startDateInput = document.getElementById("startDateInput");
var endDateInput = document.getElementById("endDateInput");
var prioInput = document.getElementById("prioInput");

var modal = document.getElementById('addListModal');
var showModalBtn = document.getElementById("showModal");
var closeModalBtn = document.getElementsByClassName("closeButton")[0];

var taskData = (localStorage.getItem("taskData")) ? JSON.parse(localStorage.getItem("taskData")):{
  incomplete: [],
  completed: []
}

loadTaskData();

var findIndex = function(list, title) {
  var idx = 0;
  var found = false;
  do {
    console.log("cek idx");
    console.log(idx);
    console.log(list[idx][0]);
    if (list[idx][0] == title) {
      console.log("equal");
      found = true;
    } else {
      idx++;
    }
  } while ((idx < list.length) && (!found));
  console.log("idx");
  if (found) {
    console.log(idx);
    return idx;
  } else {
    console.log(-1);
    return -1;
  }
}

function saveTaskData() {
  localStorage.setItem("taskData", JSON.stringify(taskData));
  console.log(taskData);
}

function createNewTaskElement (taskTitle, taskDesc, taskStartDate, taskEndDate, taskPrio, isCompleted) {
  var item = document.createElement("li");
  var checkBox = document.createElement("input");
  var titleLabel = document.createElement("label");
  var titleInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  var desc = document.createElement("label");
  var descLabel = document.createElement("label");
  var descInput = document.createElement("input");
  var startDate = document.createElement("label");
  var startDateLabel = document.createElement("label");
  var startDateInput = document.createElement("input");
  var endDate = document.createElement("label");
  var endDateLabel = document.createElement("label");
  var endDateInput = document.createElement("input");
  var prio = document.createElement("label");
  var prioLabel = document.createElement("label");
  var prioInput = document.createElement("select");
  
  checkBox.type = "checkbox";
  titleLabel.className = "taskTitle";
  titleInput.type = "text";
  titleInput.className = "taskTitle";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  descLabel.className = "detailLabel";
  descInput.type = "text";
  startDateLabel.className = "detailLabel";
  startDateInput.type = "date";
  endDateLabel.className = "detailLabel";
  endDateInput.type = "date";
  prioLabel.className = "detailLabel";
  var opt = document.createElement('option');
  opt.value = "Low";
  opt.innerHTML = "Low";
  prioInput.appendChild(opt);
  var opt2 = document.createElement('option');
  opt2.value = "Medium";
  opt2.innerHTML = "Medium";
  prioInput.appendChild(opt2);
  var opt3 = document.createElement('option');
  opt3.value = "High";
  opt3.innerHTML = "High";
  prioInput.appendChild(opt3);
  
  titleLabel.innerText = taskTitle;
  desc.innerText = "Description: ";
  descLabel.innerText = taskDesc;
  startDate.innerText = "Start Date: ";
  startDateLabel.innerText = taskStartDate;
  endDate.innerText = "End Date: ";
  endDateLabel.innerText = taskEndDate;
  prio.innerText = "Priority: ";
  prioLabel.innerText = taskPrio;
  
  item.appendChild(checkBox);
  item.appendChild(titleLabel);
  item.appendChild(titleInput);
  item.appendChild(editButton);
  item.appendChild(deleteButton);
  item.appendChild(desc);
  item.appendChild(descLabel);
  item.appendChild(descInput);
  item.appendChild(startDate);
  item.appendChild(startDateLabel);
  item.appendChild(startDateInput);
  item.appendChild(endDate);
  item.appendChild(endDateLabel);
  item.appendChild(endDateInput);
  item.appendChild(prio);
  item.appendChild(prioLabel);
  item.appendChild(prioInput);

  if (isCompleted == true) {
    completedTasksHolder.appendChild(item);
    bindTaskEvents(item, taskIncomplete);
  } else {
    incompleteTasksHolder.appendChild(item);
    bindTaskEvents(item, taskCompleted);
  }
}

function loadTaskData() {
  console.log("Incomplete task length");
  console.log(taskData.incomplete.length);
  console.log("completed task length");
  console.log(taskData.completed.length);
  if (!taskData.incomplete.length && !taskData.completed.length) {
    return;
  } else {
    for (var i = 0; i < taskData.incomplete.length; i++) {
      var value = taskData.incomplete[i];
      createNewTaskElement(taskData.incomplete[i][0], taskData.incomplete[i][1],
        taskData.incomplete[i][2], taskData.incomplete[i][3], taskData.incomplete[i][4], false);
    }

    for (var i = 0; i < taskData.completed.length; i++) {
      createNewTaskElement(taskData.completed[i][0], taskData.completed[i][1],
        taskData.completed[i][2], taskData.completed[i][3], taskData.completed[i][4], true);
    }
  }
}

var addTask = function() {
  createNewTaskElement(titleInput.value, descInput.value, startDateInput.value,
    endDateInput.value, prioInput.value, false);
  
  var temp = [titleInput.value, descInput.value, startDateInput.value,
  endDateInput.value, prioInput.value]

  taskData.incomplete.push(temp);

  titleInput.value = "";
  descInput.value = "";
  startDateInput.value = "2017-01-01";
  endDateInput.value = "2017-12-31";
  prioInput.value = "Low";

  modal.style.display = "none";  
  saveTaskData();
}

var oldTitle;

var editTask = function() {
  var listItem = this.parentNode;
  var id = listItem.parentNode.id;

  var editInput = listItem.querySelectorAll("input[type=text]");
  var label = listItem.querySelectorAll("label");
  var editDate = listItem.querySelectorAll("input[type=date]");
  var editPrio = listItem.querySelector("select");
  
  var index;

  var containsClass = listItem.classList.contains("editMode");
  if (containsClass) {
    if (id === 'incomplete-tasks') {
      index = findIndex(taskData.incomplete, oldTitle);
      taskData.incomplete[index][0] = editInput[0].value;
      taskData.incomplete[index][1] = editInput[1].value;
      taskData.incomplete[index][2] = editDate[0].value;
      taskData.incomplete[index][3] = editDate[1].value;
      taskData.incomplete[index][4] = editPrio.value;
    } else {
      index = findIndex(taskData.completed, oldTitle);
      taskData.completed[index][0] = editInput[0].value;
      taskData.completed[index][1] = editInput[1].value;
      taskData.completed[index][2] = editDate[0].value;
      taskData.completed[index][3] = editDate[1].value;
      taskData.completed[index][4] = editPrio.value;
    }
    label[0].innerText = editInput[0].value;    
    label[2].innerText = editInput[1].value;
    label[4].innerText = editDate[0].value;
    label[6].innerText = editDate[1].value;
    label[8].innerText = editPrio.value;
  } else {
    editInput[0].value = label[0].innerText;
    editInput[1].value = label[2].innerText;
    editDate[0].value = label[4].innerText;
    editDate[1].value = label[6].innerText;
    editPrio.value = label[8].innerText;
    oldTitle = label[0].innerText;
  }
  saveTaskData();
  listItem.classList.toggle("editMode"); 
}

var deleteTask = function() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  var id = ul.id;
  var label = listItem.querySelector("label");

  if (id === 'incomplete-tasks') {
    taskData.incomplete.splice(findIndex(taskData.incomplete, label.innerText), 1);
  } else {
    taskData.completed.splice(findIndex(taskData.completed, label.innerText), 1);
  }

  ul.removeChild(listItem);
  saveTaskData();
}

var taskCompleted = function() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  var label = listItem.querySelector("label");

  var index = findIndex(taskData.incomplete, label.innerText);
  taskData.completed.push(taskData.incomplete[index]);
  taskData.incomplete.splice(index, 1);

  ul.removeChild(listItem);
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
  saveTaskData();
  console.log(taskData);
}

var taskIncomplete = function() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  var label = listItem.querySelector("label");

  var index = findIndex(taskData.completed, label.innerText);
  taskData.incomplete.push(taskData.completed[index]);
  taskData.completed.splice(index, 1);

  ul.removeChild(listItem);
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  saveTaskData();
  console.log(taskData);
}

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

addButton.addEventListener("click", addTask);

for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete); 
}

showModalBtn.onclick = function() {
    modal.style.display = "block";
}

closeModalBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// function resizeToMinimum(width, height){
//     width = width > window.outerWidth ? width:window.outerWidth;
//     height = height > window.outerHeight ? height:window.outerHeight;
//     window.resizeTo(width, height);
// };
// window.addEventListener('resize', function(){resizeToMinimum(1000,1000)}, false)