import React, { useState } from 'react';

const AddItemDialog = ({ isOpen, onClose }) => {
  
  const [item, setItem] = useState({
    itemId: '',
    itemName: '',
    itemDescription: '',
    itemPrice: '',
    itemCount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleAddItem = () => {
    // Validate the input fields if needed

    // Clear the input fields and close the dialog
    setItem({
      itemId: '',
      itemName: '',
      itemDescription: '',
      itemPrice: '',
      itemCount: '',
    });

    onClose();
  };

  return (
    <dialog open={isOpen}>
      <form className="dialog-form">
        <label>
          Item ID:
          <input type="text" name="itemId" value={item.itemId} onChange={handleChange} required />
        </label>

        <label>
          Item Name:
          <input type="text" name="itemName" value={item.itemName} onChange={handleChange} required />
        </label>

        <label>
          Item Description:
          <input type="text" name="itemDescription" value={item.itemDescription} onChange={handleChange} required />
        </label>

        <label>
          Price:
          <input type="number" name="itemPrice" value={item.itemPrice} onChange={handleChange} required />
        </label>

        <label>
          Count:
          <input type="number" name="itemCount" value={item.itemCount} onChange={handleChange} required />
        </label>

        <button type="button" onClick={handleAddItem}>
          Add Item
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </dialog>
  );
};

export default AddItemDialog;
