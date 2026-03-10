import {validateTitle,validatePriority,validateDueDate} from "./validator.js";
const tasks = [];

function addTask(title, priority, dueDate) {
  let titleCheck = validateTitle(title);
  let priorityCheck = validatePriority(priority);
  let dateCheck = validateDueDate(dueDate);

  if (titleCheck !== true)
    return titleCheck;
  if (priorityCheck !== true)
    return priorityCheck;
  if (dateCheck !== true)
     return dateCheck;

  const newTask = {
    id: tasks.length + 1,
    title,
    priority: priority.toLowerCase(),
    dueDate,
    completed: false
  };

  tasks.push(newTask);

  return "Task added successfully";
}


function getAllTasks() {
  return tasks;
}

function completeTask(taskId) {
  for(let task of tasks){
    if(task.id==taskId)
      return console.log("Task found:",task)
  }
  return console.log("task not found")
}

export { addTask, getAllTasks, completeTask };