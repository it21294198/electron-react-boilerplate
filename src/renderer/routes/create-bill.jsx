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

//!###################################
// import React,{useState,useEffect} from 'react'

// export default function CreateBill() {

//   const [search, setSearch] = useState('');
//   const [itemDescription, setItemDescription] = useState({
//     itemName:'',
//     itemPrice:0,
//     itmeCount:0,
//   });
//   const [itmes, setItems] = useState([]);

//   useEffect(()=>{
//     const initialItems = [
//       {
//         itemId: 1,
//         itemName: 'item1',
//         itemDescription:'best',
//         itemPrice: 250,
//         itemCount: 5,
//       },
//       {
//         itemId: 2,
//         itemName: 'item2',
//         itemDescription:'good',
//         itemPrice: 251,
//         itemCount: 3,
//       },
//     ];
//     setItems(initialItems);
//   },[])

//   const addNonExistinItem = () => {

//   }
//   return (
//     <div>
//       <div className="reminder-input">
//       <input
//           type="text"
//           name="itemDescription"
//           className='search-input'
//           placeholder='Add new Reminder'
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <button className='add-item-button' onClick={addNonExistinItem}>Add Extra</button>
//       </div>
//     </div>
//   )
// }
import React, { useState, useEffect } from 'react';
import BillExtraItem from '../components/BillExtraItem';

const CreateBill = () => {

  const [billTotal, setBillTotal] = useState(0);
  const [isAddItemDialogOpen, setAddItemDialogOpen] = useState(false);
  const [billItemList, setBillItemList] = useState([]);
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([
    {
      itemId: 1,
      itemName: 'item1',
      itemDescription: 'best fsf',
      itemPrice: 250,
      itemCount: 5,
    },
    {
      itemId: 2,
      itemName: 'item2',
      itemDescription: 'good',
      itemPrice: 251,
      itemCount: 3,
    },
  ]);

  const calculateTotal = () => {
    // Use reduce to iterate through billItemList and calculate the total
    const total = billItemList.reduce((acc, item) => {
      // Multiply itemCount and itemPrice for each item and add to the accumulator
      return acc + item.itemCount * item.itemPrice;
    }, 0);
  
    return total;
  };  
  
  const filteredItems = items.filter(
    (item) =>
      item.itemName.toLowerCase().includes(search.toLowerCase()) ||
      item.itemDescription.toLowerCase().includes(search.toLowerCase())
  );

  const handleItemClick = (selectedItem) => {
    // Check if the item is already in billItemList
    const itemExists = billItemList.some((item) => item.itemId === selectedItem.itemId);
  
    // If the item does not exist, add it to billItemList
    if (!itemExists) {
      // Create a new object with itemCount set to 1
      const newItem = { ...selectedItem, itemCount: 1 };
  
      // Update billItemList by adding the new item
      setBillItemList([newItem, ...billItemList]);
  
      // Reset the search term
      setSearch('');
  
      console.log('Selected item added:', newItem);
    } else {
      // Handle the case when the item already exists in the list
      console.log('Selected item already exists:', selectedItem);
    }
  };  

const renderSearchResults = () => {
    if (search.trim() === '') {
      return null;
    }

    if (filteredItems.length === 0) {
      return <div>No results found</div>;
    }

    return (
      <ul className="search-results">
        {filteredItems.map((item) => (
          <li key={item.itemId} onClick={() => handleItemClick(item)}>
            <span>{item.itemName}</span>
            <span>{item.itemDescription.length > 20 ? `${item.itemDescription.substring(0, 20)}...` : item.itemDescription}</span>
            <span>LKR {item.itemPrice}</span>
            <span>#{item.itemCount}</span>
          </li>
        ))}
      </ul>
    );
  };

  const handlePriceChange = (itemId, e) => {
    const updatedItems = billItemList.map((item) =>
      item.itemId === itemId ? { ...item, itemPrice: e.target.value } : item
    );
    setBillItemList(updatedItems);
    // setBillTotal(calculateTotal)
  };  

  const handleCountChange = (itemId, e) => {
    const updatedItems = billItemList.map((item) =>
      item.itemId === itemId ? { ...item, itemCount: e.target.value } : item
    );
    setBillItemList(updatedItems);
    // setBillTotal(calculateTotal)
  };  

  const removeItemFromBill = (itemId,e) => {
    const updatedItems = billItemList.map((item) => {
      if (item.itemId === itemId) {
        // Check if the new item count is greater than 0
        const newCount = parseInt(e.target.value, 10);
        if (newCount > 0) {
          return { ...item, itemCount: newCount };
        } else {
          // If the new count is 0 or negative, remove the item
          return null;
        }
      } else {
        return item;
      }
    });
  
    // Filter out null values (removed items)
    const filteredItems = updatedItems.filter((item) => item !== null);
  
    setBillItemList(filteredItems);

  }

  const billedItemList = () => {
  
    return (
      <div>
        <table className="bill-item-table">
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Item Name</th>
              <th>Item Description</th>
              <th>Price</th>
              <th>Count</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {billItemList.map((item) => (
              <tr key={item.itemId}>
                <td>{item.itemId}</td>
                <td>{item.itemName}</td>
                <td>{item.itemDescription}</td>
                <td>
                  <span>LKR <input min="0" type='number' onChange={(e) => handlePriceChange(item.itemId, e)} value={item.itemPrice} style={{ width: '75px' }} />
                  </span>
                </td>
                <td>
                  <input min="0" type='number' onChange={(e) => handleCountChange(item.itemId, e)} value={item.itemCount} style={{ width: '50px' }} />
                </td>
                <td>LKR {item.itemCount*item.itemPrice}</td>
                <td><button className="add-item-button" onClick={(e)=>{removeItemFromBill(item.itemId,e)}}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };


  const openAddItemDialog = () => {
    setAddItemDialogOpen(true);
  };

  const closeAddItemDialog = () => {
    setAddItemDialogOpen(false);
  };

  const handleAddItem = (newItem) => {
    setBillItemList([...billItemList, newItem]);
    // setBillTotal(calculateTotal)
    closeAddItemDialog();
  };

  const createBill = () => {

  }

  return (
    <div>
      <BillExtraItem         
        isOpen={isAddItemDialogOpen}
        onClose={closeAddItemDialog}
        onAddItem={handleAddItem}
      />
      <div className="reminder-input">
        <input
          type="text"
          name="itemDescription"
          className="search-input"
          placeholder="Search Item..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="add-item-button" onClick={openAddItemDialog}>Add Extra</button>
      </div>
      {renderSearchResults()}
      {billedItemList()}

      <span className="total-container" >
      <span className="total-label" >
        Total Amount
      </span>
      <span className="total-amount">
        LKR {calculateTotal()}
      </span>
    </span>
    {calculateTotal()>0? (<button className="add-item-button" onClick={createBill}>Create Bill</button>):<></>}
    </div>
  );
};

export default CreateBill;
