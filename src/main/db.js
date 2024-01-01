// // db.js

// const { app, ipcMain } = require('electron');
// const sqlite3 = require('sqlite3');

// let db;

// function initDatabase() {
//   db = new sqlite3.Database('database.db', (err) => {
//     if (err) {
//       console.error('Database initialization error:', err.message);
//     } else {
//       console.log('Connected to the SQLite database');
//       createTable(); // Create 'todos' table if not exists
//     }
//   });
// }

// ipcMain.on('test', () => {
//     console.log('$$$$$$$$$$$$$$$ test $$$$$$$$$$$$$$$');
//     console.error('$$$$$$$$$$$$ test $$$$$$$$$$$$$$$$');
//   });

// function createTable() {
//   db.run(`
//     CREATE TABLE IF NOT EXISTS todos (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       title TEXT,
//       completed INTEGER
//     )
//   `);
// }

// ipcMain.on('get-todos', (event) => {
//   // Handle IPC request to retrieve TODOs from the database
//   db.all('SELECT * FROM todos', (err, rows) => {
//     if (err) {
//       console.error('Error fetching TODOs:', err.message);
//     } else {
//       event.reply('todos', rows); // Send TODOs back to the renderer process
//     }
//   });
// });

// ipcMain.on('add-todo', (event, title) => {
//   // Handle IPC request to add a TODO to the database
//   db.run('INSERT INTO todos (title, completed) VALUES (?, 0)', [title], (err) => {
//     if (err) {
//       console.error('Error adding TODO:', err.message);
//     } else {
//       event.reply('todo-added');
//     }
//   });
// });

// ipcMain.on('update-todo', (event, id, completed) => {
//   // Handle IPC request to update the completion status of a TODO
//   db.run('UPDATE todos SET completed = ? WHERE id = ?', [completed, id], (err) => {
//     if (err) {
//       console.error('Error updating TODO:', err.message);
//     } else {
//       event.reply('todo-updated');
//     }
//   });
// });

// ipcMain.on('delete-todo', (event, id) => {
//   // Handle IPC request to delete a TODO from the database
//   db.run('DELETE FROM todos WHERE id = ?', [id], (err) => {
//     if (err) {
//       console.error('Error deleting TODO:', err.message);
//     } else {
//       event.reply('todo-deleted');
//     }
//   });
// });

// // module.exports = { initDatabase };

// export default initDatabase;

// database.js
const sqlite3 = require('sqlite3').verbose();

class Database {
  constructor(databasePath) {
    this.db = new sqlite3.Database(databasePath, (err) => {
      if (err) {
        console.error('Error opening database:', err.message);
      } else {
        console.log('Connected to the database');
      }
    });
  }

  getAllUsers(callback) {
    this.db.all('SELECT * FROM users', [], (err, rows) => {
      if (err) {
        console.error('Error selecting data:', err.message);
      } else {
        console.log('Selected data:', rows);
        callback(rows);
      }
    });
  }

  close() {
    this.db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      } else {
        console.log('Database connection closed');
      }
    });
  }
}

module.exports = Database;
