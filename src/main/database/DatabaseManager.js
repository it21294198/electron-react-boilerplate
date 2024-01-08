import path from 'path'
import fs from 'fs'
import sqlite3 from 'sqlite3'

class DatabaseManager {
  constructor(app) {
    this.app = app;
  }

  async createDatabase() {
    return new Promise((resolve, reject) => {
      const databasePath = path.join(
        this.app.getPath("documents"),
        "database.db"
      );
      if (!fs.existsSync(databasePath)) {
        fs.writeFile(databasePath, "", (err) => {
          if (err) {
            reject(err);
          } else {
            console.log("Created database.db on the desktop.");
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }

  async createUsersTable() {
    return new Promise((resolve, reject) => {
      const databasePath = path.join(
        this.app.getPath("documents"),
        "database.db"
      );
      const db = new sqlite3.Database(databasePath);

      db.serialize(() => {
        db.run(
          `
          CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            email TEXT
          )
        `,
          (err) => {
            db.close();
            if (err) {
              reject(err);
            } else {
              console.log("Created the users table.");
              resolve();
            }
          }
        );
      });
    });
  }

  async addSampleUser(username, email) {
    return new Promise((resolve, reject) => {
      const databasePath = path.join(
        this.app.getPath("documents"),
        "database.db"
      );
      const db = new sqlite3.Database(databasePath);

      db.serialize(() => {
        const stmt = db.prepare(
          "INSERT INTO users (username, email) VALUES (?, ?)"
        );
        stmt.run(username, email, (err) => {
          stmt.finalize();
          db.close();
          if (err) {
            reject(err);
          } else {
            console.log(`Added user: ${username}, ${email}`);
            resolve();
          }
        });
      });
    });
  }
}

export default DatabaseManager;