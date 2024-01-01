import { useEffect, useState } from "react";

function BillHistory() {
  const [fileNumber, setFileNumber] = useState('');
  const [deleteResponse, setDeleteResponse] = useState(null);

  const deleteFile = () => {
    if (!fileNumber) {
      console.error('Please enter a file number.');
      return;
    }

    window.electron.ipcRenderer.sendMessage('deleteFile', fileNumber);
  };

  window.electron.ipcRenderer.once('deleteFileResponse', (event, response) => {
    setDeleteResponse(response);
  });
    return (
        <div>
              <div>
      <h1>This will delete the images in uploads folder</h1>
      <label>
        Enter File Number:
        <input
          type="text"
          value={fileNumber}
          onChange={(e) => setFileNumber(e.target.value)}
        />
      </label>
      <button onClick={deleteFile}>Delete File</button>
      {deleteResponse && (
        <p>
          {deleteResponse.success
            ? 'File deleted successfully'
            : `Error deleting file: ${deleteResponse.error}`}
        </p>
      )}
    </div>
        </div>
      );
}

export default BillHistory;