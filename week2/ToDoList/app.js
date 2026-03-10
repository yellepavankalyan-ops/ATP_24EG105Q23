import { addTask, getAllTasks, completeTask } from "./task.js";
addTask("Eating", "high", "2026-12-02")
addTask("Gym", "medium", "2026-10-01")
console.log("All Tasks:");
console.log(getAllTasks())
completeTask(1)
console.log("After Completing:");
console.log(getAllTasks())
