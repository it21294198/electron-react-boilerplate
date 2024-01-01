import { useEffect, useState } from "react";

function BillHistory() {

  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState(null);

  const view = () => {
    const handleFileResponse = (event, content) => {
      console.log('Received data:',content );
      // if (data && data.content) {
      //   setImageSrc(`data:image/png;base64,${data.content}`);
      //   setError(null);
      // } else {
      //   setError('Invalid data structure received');
      // }
    };
    

    const handleFileError = (event, errorMessage) => {
      setError(errorMessage);
      setImageSrc(null);
    };

    // Listen for the response or error from the main process
    window.electron.ipcRenderer.on('read-file-response', handleFileResponse);
    window.electron.ipcRenderer.once('read-file-error', handleFileError);

    // Cleanup listeners when the component unmounts
  }

  const handleReadFile = () => {
    // Send 'read-file' event to the main process
    // window.electron.ipcRenderer.sendMessage('read-file', 'dummy-argument');
    view()
    console.log('ran')
  };
    // useEffect(() => {
    //     window.electron.ipcRenderer.sendMessage('test', ['ping']); 
    //     window.electron.ipcRenderer.once('test', (arg) => {
    //         console.log(arg);
    //       });
    // }, []);

    return (
        <div>
              <div>
      <button onClick={handleReadFile}>Read File</button>

      {/* Display the image if it exists */}
      {imageSrc && <img src={imageSrc} alt="Read File" />}

      {/* Display error message if any */}
      {error && <p>Error: {error}</p>}
    </div>
        </div>
      );
}

export default BillHistory;