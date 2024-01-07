import React, { useState,useEffect } from 'react';
import Loading from './Loading';

const EditItemDialog = ({ isOpen, onClose, item }) => {
  
  const [editedItem, setEditedItem] = useState({
    itemId: 0,
    itemName: '',
    itemDescription:'',
    itemPrice: 0,
    itemCount: 0,
  });
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  useEffect(() => {
    setIsLoading(true);
  
    const intervalId = setInterval(() => {
      const initialItems = {
        itemId: 1,
        itemName: 'item1',
        itemDescription: 'best',
        itemPrice: 250,
        itemCount: 5,
      };
      setEditedItem(initialItems);
      setIsLoading(false);
      clearInterval(intervalId); // Stop the interval after the delay
    }, 2000); // Set the delay time in milliseconds (e.g., 2000ms for 2 seconds)
    console.log("Selected item for edit is : ",item)
    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [item]);
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    setIsLoading(true)
    setIsLoading(false)
    onClose()
  };

  const handleDelete = () => {
    setIsLoading(true)
    setIsLoading(false)
    onClose()
  }

  return (
    <dialog open={isOpen}>
      {isLoading ? (<Loading/>):(
        <form className='dialog-form'>
        <label>
          Item ID:
          <input
            type="text"
            name="itemId"
            value={editedItem.itemId}
            onChange={handleChange}
            readOnly
            />
        </label>

        <label>
          Item Name:
          <input
            type="text"
            name="itemName"
            value={editedItem.itemName}
            onChange={handleChange}
            />
        </label>

        <label>
          Item Description:
          <input
            type="text"
            name="itemDescription"
            value={editedItem.itemDescription}
            onChange={handleChange}
            />
        </label>

        <label>
          Price:
          <input
            type="number"
            name="itemPrice"
            value={editedItem.itemPrice}
            onChange={handleChange}
            />
        </label>

        <label>
          Count:
          <input
            type="number"
            name="itemCount"
            value={editedItem.itemCount}
            onChange={handleChange}
            />
        </label>

        <button type="button" onClick={handleUpdate}>
          Update
        </button>
        <button type="button" onClick={handleDelete}>
          Delete Item
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    )}
    </dialog>
  );
};

export default EditItemDialog;