// import React, { useEffect, useState } from "react";

// function CreateBill() {
//   const [users, setUsers] = useState<any>(null);

//   useEffect(() => {
//     window.electron.ipcRenderer.sendMessage('test', ['ping']); 
//     window.electron.ipcRenderer.once('test', (arg) => {
//       console.log(arg);
//       setUsers(arg);
//     });
//   }, []);

//   return ( 
//     <div>
//       {users && (
//         <ul>
//           {users.map((element, index) => (
//             // Use a unique key for each list item (e.g., index)
//             <li key={index}>{element.username}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default CreateBill;

import React from 'react'

export default function CreateBill() {
  return (
    <div>CreateBill</div>
  )
}
