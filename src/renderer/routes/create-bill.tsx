import { useEffect } from "react";


function CreateBill() {
    useEffect(() => {
        // window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']); 
        window.electron.ipcRenderer.sendMessage('test', ['ping']); 
        window.electron.ipcRenderer.once('test', (arg) => {
            // eslint-disable-next-line no-console
            console.log(arg);
          });
    }, []);
    return ( <div>
        fsfsf
    </div> );
}

export default CreateBill;