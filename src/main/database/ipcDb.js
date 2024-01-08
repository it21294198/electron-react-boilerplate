const setupIpcHandlers = (ipcMain, databaseManager) => {
    ipcMain.handle("get-user", async (event, id) => {
      try {
        await databaseManager.createDatabase();
        await databaseManager.createUsersTable();
        await databaseManager.addSampleUser("hello", "world");
        console.log("get-user ran");
        return id;
      } catch (error) {
        console.error("Error fetching user:", error);
        throw error; // Rethrow the error for the renderer process to handle
      }
    });
  };
  
  export default setupIpcHandlers;