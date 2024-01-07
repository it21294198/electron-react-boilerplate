// import React, { useState } from 'react';
// import HomeItem from '../components/home-item';
// import '../styles/home-item.css';

// function Home() {
//   const itemsPerPage = 24;
//   const totalItems = 100; // Replace this with the actual total number of items
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');

//   // Calculate the range of items to display based on the current page and search term
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;

//   // Filter items based on the search term
//   const filteredItems = Array.from({ length: totalItems }, (_, index) => (
//     <HomeItem key={index} title={`Item ${index + 1}`} />
//   )).filter((item) => item.props && item.props.title.includes(searchTerm));

//   const items = filteredItems.slice(startIndex, endIndex);

//   const handlePageChange = (newPage:any) => {
//     setCurrentPage(newPage);
//   };

//   const handleSearchChange = (e:any) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1); // Reset to the first page when the search term changes
//   };

//   return (
//     <div className='main-container'>
//       <div>
//         <div>Home view</div>
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />
//       </div>

//       <div className="item-list">{items}</div>

//       <div className="pagination">
//         {/* Render pagination controls */}
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button key={index} onClick={() => handlePageChange(index + 1)}>
//             {index + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;

import React, { useState, useEffect } from 'react';
import HomeItem from '../components/HomeItem';
import AddItemDialog from '../components/AddItem';
import Loading from '../components/Loading';
import EditItemDialog from '../components/EditItem';

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const initialItems = [
      {
        itemId: 1,
        itemName: 'item1',
        itemDescription:'best',
        itemPrice: 250,
        itemCount: 5,
      },
      {
        itemId: 2,
        itemName: 'item2',
        itemDescription:'good',
        itemPrice: 251,
        itemCount: 3,
      },
    ];
    setItems(initialItems);
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddItemDialogOpen, setAddItemDialogOpen] = useState(false);
  const [isEditItemDialogOpen, setEditItemDialogOpen] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const openAddItemDialog = () => {
    setAddItemDialogOpen(true);
  };
  
  const closeAddItemDialog = () => {
    setAddItemDialogOpen(false);
  };
  
  const closeEditItemDialog = () => {
    setEditItemDialogOpen(false)
  }
  
  const openEditDialog = (e) => {
    setEditItemId(e)
    setEditItemDialogOpen(true)
  }

  const filteredItems = items
  .filter((item) =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.itemDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.itemId.toString().includes(searchTerm)
  )
  .map((item) => <HomeItem key={item.itemId} item={item} openEditDialog={() => openEditDialog(item.itemId)} />);

  return (
    <div>
      <div className='home-panal'>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
          />
        <button onClick={openAddItemDialog} className="add-item-button">
          Add Item
        </button>
      </div>
      
      <div>
      <AddItemDialog
        isOpen={isAddItemDialogOpen}
        onClose={closeAddItemDialog}
        />
      </div>

      <EditItemDialog
        isOpen={isEditItemDialogOpen}
        onClose={closeEditItemDialog}
        item={editItemId}
      />

      {/* show table if not loading */}
      {items ? 
      <div className="table-container">
        <table className="table">
        <thead>
        <tr>
          <th>Item ID</th>
          <th>Item Name</th>
          <th>Item Description</th>
          <th>Price (LKR)</th>
          <th>Count</th>
        </tr>
        </thead>
        <tbody>{filteredItems}</tbody>
        </table>
      </div>
      :
    <Loading/>
    }
    
    </div>
  );
}

