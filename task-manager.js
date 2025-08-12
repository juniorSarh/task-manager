let process = require('process') ; //import the process.argv[]
let nextID = 1;
let taskArray =[];

function createTask(id,name){
 const task = {
   id:id,
    name: name,
 };
 taskArray.push(task);
 return task;
}
function readTask(){
 return taskArray
}
// Adding tasks
createTask('id1','task1 created');
createTask('id2','task2 created');

// Reading tasks
console.log(readTask());

console.log(process.argv[4]);

// console.log("welcome to task manager😁😁");
// let tasks = ["soccer","wash dishes","write homework"];


// console.log(tasks[1]);

// tasks.forEach(task => {
//     console.log(task);
// });
// for (task of tasks) // for displaying elements
// {
//     console.log(task);
// }
// for (task in tasks) { //for displaying indexes
//   console.log(task);
// }


// function sayHi(name, lastname){ //parameters in a bracket that takes the argument
//     console.log("hi " + name + " your lastname is: " + lastname);
// }
// sayHi("Sabelo", "Gumede"); //the argument that the parameters relay on
