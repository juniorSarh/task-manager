let sqlite3 = require("sqlite3");
let process = require("process");

// INITIALISATION
let taskdb = "task.db";
const db = new sqlite3.Database(taskdb);

let args = process.argv;
let arg1 = args[2];
let arg2 = args[3];
let arg3 = args[4];

// CREATE TABLE
function createTable() {
  let tableQuery = `
    CREATE TABLE IF NOT EXISTS Tasks(
    id INTEGER PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT
     );
`;
  db.run(tableQuery, (err) => {
    if (err) console.error("Table creation failed:", err);
    else console.log("Table created succesfully");
  });
}

// CREATE TASK
function createTask(title, description) {
  let insertQuery = `
INSERT INTO Tasks (title, description, status)
VALUES (?, ?, ?);
`;
  db.run(insertQuery, [title, description, false], (err) => {
    if (err) console.error("Task creation failed:", err);
    else console.log("Task created succesfully");
  });
}

// READ TASK
function readTasks() {
  let selectQuery = `SELECT * FROM Tasks`;
  db.all(selectQuery, [], (err, rows) => {
    if (err) {
      console.error("Select failed:", err);
    } else {
      console.log("Tasks retrieved:");
      if (rows.length === 0) {
        console.log("No tasks found.");
      }
      rows.forEach((row) => {
        console.log(
          `- ${row.id}: ${row.title} → ${row.description} [${row.status}]`
        );
      });
    }
  });
}

// UPDATE TASK
function updateTask(id, args) {
  let argsList = args.split(",");
  argsList.forEach((arg) => {
    arg.trim();
    let splitArg = arg.split("=");
    let key = splitArg[0].trim();
    let value = splitArg[1].trim();
    let updateQuery;
    switch (key) {
      case "title":
        updateQuery = `
                UPDATE Tasks SET title = ? WHERE id = ?;
                `;
        break;
      case "description":
        updateQuery = `
                UPDATE Tasks SET description = ? WHERE id = ?;
                `;
        break;
      case "status":
        updateQuery = `
                UPDATE Tasks SET status = ? WHERE id = ?;
                `;
        break;
    }
    db.run(updateQuery, [value, id], (err) => {
      if (err) {
        console.error("Task Update failed:", err);
      } else {
        console.log("Task updated succcesfully");
      }
    });
  });
}

// DELETE TASK
function deleteTask(id) {
  let query = `DELETE FROM Tasks
WHERE id = ${id};`;
  db.run(query, (err) => {
    if (err) {
      console.log(`Task not deleted ,${err}`);
    } else {
      console.log("Task deleted successfuly!!");
    }
  });
}

db.serialize(() => {
  //createTable();
  switch (arg1) {
    case "create":
      createTask(arg2, arg3);
      break;
    case "read":
      readTasks();
      break;
    case "update":
      updateTask(arg2, arg3);
      break;
    case "delete":
      deleteTask(arg2);
      break;
    default:
      console.log("Invalid CRUD operator");
  }
//Use this method when running with node file 👍
  //readTasks();
  // updateTask(1, "title=task 1, status=1");
  // createTask("Task2", "This is a task description2.....");
  // deleteTask(2)
});

db.close();
