// import { useDropzone } from 'react-dropzone';
// import React, { useCallback, useEffect, useState } from 'react';

// function Reminders() {

//   const onDrop = useCallback((acceptedFiles) => {
//     acceptedFiles.forEach((file) => {
//       const reader = new FileReader();

//       reader.onabort = () => console.log('file reading was aborted');
//       reader.onerror = () => console.log('file reading has failed');
//       reader.onload = () => {
//         // Do whatever you want with the file contents
//         const binaryStr = reader.result;
//         console.log(binaryStr);

//         // Send the file content to the main process
//         window.electron.ipcRenderer.sendMessage('save-file', { fileName: file.name, content: binaryStr }); 
//     };
//     reader.readAsArrayBuffer(file);
// });
// }, []);

// const readFile = () => {
//     window.electron.ipcRenderer.sendMessage('read-file', '/Users/rusira/Documents/codes/Electron/your-project-name/src/main/uploads/image.png');

//     window.electron.ipcRenderer.once('read-file-response', (event, data) => {
//       // Handle the file content
//       console.log(data);
//       setFileContent(data.content)
//     });
    
//     window.electron.ipcRenderer.once('read-file-error', (event, errorMessage) => {
//       // Handle the error
//       console.error(errorMessage);
//     });
    
//   };

// const { getRootProps, getInputProps } = useDropzone({ onDrop });

// const [fileContent, setFileContent] = useState(null);
// const [error, setError] = useState<String|null>(null);

// const [imageSrc, setImageSrc] = useState(null);
// // const [error, setError] = useState(null);

// useEffect(() => {
//     // Send request to read the file
//     window.electron.ipcRenderer.sendMessage('read-file', '/Users/rusira/Documents/codes/Electron/your-project-name/src/main/uploads/image.png');

//     // Event listener for successful response
//     const handleFileContent = (event, data) => {
//       setImageSrc(`data:image/png;base64,${data.content}`);
//       setError(null);
//     };

//     // Event listener for error response
//     const handleFileContentError = (event, errorMessage) => {
//       setError(errorMessage);
//       setImageSrc(null);
//     };

//     // Listen for the image content or error from the main process
//     window.electron.ipcRenderer.once('read-file-response', handleFileContent);
//     window.electron.ipcRenderer.once('read-file-error', handleFileContentError);

//   }, []);

//   return (
//     <div>
//       <div {...getRootProps()}>
//         <input {...getInputProps()} />
//         <p>Drag 'n' drop some files here, or click to select files</p>
//       </div>

//       {/* Show files if they exist */}
//       {fileContent && (
//         <div>
//           <h2>File Content:</h2>
//           <pre>{fileContent}</pre>
//         </div>
//       )}

//       {/* Show error if any */}
//       {error && (
//         <div>
//           <h2>Error:</h2>
//           <p>{error}</p>
//         </div>
//       )}

//        {/* Show image if it exists */}
//        {imageSrc && <img src={imageSrc} alt="Uploaded Image" />}

//     <button onClick={readFile}>Read File</button>

//     </div>
//   );
// }

// export default Reminders;

import React, { useEffect,useState } from 'react'

export default function Reminders() {

  const [remiderer, setRemiderer] = useState([])
  const [newReminder, setNewReminder] = useState('');

  useEffect(()=>{
    const currentDate = new Date();
    const formattedDate = `${currentDate.toDateString()} ${currentDate.toLocaleTimeString()}`;

    const remider = [
      {
      remiderId:1,
      remiderTime:formattedDate,
      remiderName:'test'
      },
      {
        remiderId:2,
        remiderTime:formattedDate,
        remiderName:'test2'
      }
    ]
    setRemiderer(remider)
  },[])

  const handleDelete = (e) => {
    alert('Reminde is deleted')
    console.log(e)
  }

  const handleAddReminder = () =>{
    alert('Remider is add')
  }

  return (
    <div className="reminder-container">
    <div className="reminder-input">
      <label>
        <input
          type="text"
          name="itemDescription"
          className='add-input-reminder'
          placeholder='Add new Reminder'
          value={newReminder}
          onChange={(e) => setNewReminder(e.target.value)}
        />
      </label>
      <button className='add-item-button' onClick={handleAddReminder}>Add Reminder</button>
    </div>
    <div>
      <table className="reminder-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Date</th>
            <th>Reminder</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {remiderer.map((remind) => (
            <tr key={remind.remiderId}>
              <td>{remind.remiderId}</td>
              <td>{remind.remiderName}</td>
              <td>{remind.remiderTime}</td>
              <td>
                <button className='delete-item-button' onClick={() => handleDelete(remind.remiderId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

