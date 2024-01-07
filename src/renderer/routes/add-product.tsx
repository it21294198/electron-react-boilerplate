// import { useEffect, useState } from "react";

// function AddProduct() {

//     const [person, setPerson] = useState(null);
//     const [personId, setPersonId] = useState(null);

//     const findUser = async () => {
//         if(personId){
//             console.log(personId)
//             const result = await window.electron.ipcRenderer.invoke('getauser',personId)
//             console.log(result)
//             setPerson(result)
//         }
//     }

//     useEffect(() => {
//         window.electron.ipcRenderer.sendMessage('test','hello')
//         window.electron.ipcRenderer.once('test',(event,rows)=>{
//             console.log(rows)
//         })
//     }, [])
    
//     return ( 
//     <div>
//         <input type="number" onChange={(e)=> setPersonId(parseInt(e.target.value))}/>
//         <button onClick={findUser}>Find user</button>
//         {person && person.length > 0 && (
//             <div>
//                 <h3>{person[0].username}</h3>
//             </div>
//         )}
//     </div> 
//     );
// }

// export default AddProduct;

import React from 'react'

export default function AddProduct() {
  return (
    <div>AddProduct</div>
  )
}
