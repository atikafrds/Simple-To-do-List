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

var createNewTaskElement = function(taskTitle, taskDesc, taskStartDate, taskEndDate, taskPrio) {
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

  return item;
}

var addTask = function() {
  var listItem = createNewTaskElement(titleInput.value, descInput.value, startDateInput.value,
    endDateInput.value, prioInput.value);
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);  
  
  titleInput.value = "";
  descInput.value = "";
  startDateInput.value = "2017-01-01";
  endDateInput.value = "2017-12-31";
  prioInput.value = "Low";

  modal.style.display = "none";  
}

var editTask = function() {
  var listItem = this.parentNode;
  var editInput = listItem.querySelectorAll("input[type=text]");
  var label = listItem.querySelectorAll("label");
  var editDate = listItem.querySelectorAll("input[type=date]");
  var editPrio = listItem.querySelector("select");
  
  var containsClass = listItem.classList.contains("editMode");
  if (containsClass) {
    label[0].innerText = editInput[0].value;
    if (label.length > 2) {
      label[2].innerText = editInput[1].value;
      label[4].innerText = editDate[0].value;
      label[6].innerText = editDate[1].value;
      label[8].innerText = editPrio.value;
    }
  } else {
    editInput[0].value = label[0].innerText;
    if (label.length > 2) {
      editInput[1].value = label[2].innerText;
      editDate[0].value = label[4].innerText;
      editDate[1].value = label[6].innerText;
      editPrio.value = label[8].innerText;
    }
  }
  
  listItem.classList.toggle("editMode"); 
}


// Delete an existing task
var deleteTask = function() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  
  ul.removeChild(listItem);
}

// Mark a task as complete 
var taskCompleted = function() {
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

// Mark a task as incomplete
var taskIncomplete = function() {
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

var ajaxRequest = function() {
  console.log("AJAX Request");
}

addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

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