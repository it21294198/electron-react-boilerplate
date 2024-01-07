import React,{useState} from 'react'

const BillExtraItem = ({ isOpen, onClose, onAddItem }) => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemCount, setItemCount] = useState('');

  const handleAddItem = () => {
    // Validate form fields as needed
    if (!itemName || !itemDescription || !itemPrice || !itemCount) {
      alert('Please fill in all fields.');
      return;
    }

    // Create a new item object
    const newItem = {
      itemId: new Date().getTime(), // You may want to use a better unique identifier
      itemName,
      itemDescription,
      itemPrice: parseFloat(itemPrice),
      itemCount: parseInt(itemCount),
    };

    // Call the onAddItem function passed from the parent component
    onAddItem(newItem);

    // Reset form fields
    setItemName('');
    setItemDescription('');
    setItemPrice('');
    setItemCount('');
  };

  return (
    <dialog open={isOpen}>
      <form className='dialog-form'>
        <label>
          Item Name:
          <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
        </label>
        <label>
          Item Description:
          <input type="text" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} required />
        </label>
        <label>
          Price:
          <input type="number" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} required />
        </label>
        <label>
          Count:
          <input type="number" value={itemCount} onChange={(e) => setItemCount(e.target.value)} required />
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

export default BillExtraItem;