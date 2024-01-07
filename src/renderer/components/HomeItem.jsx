import React from 'react';

const HomeItem = ({ item , openEditDialog }) => {

  const handleEditClick = () => {
    openEditDialog()
  };

  return (
        <tr onClick={handleEditClick}>
          <td>{item.itemId}</td>
          <td>{item.itemName}</td>
          <td>{item.itemDescription}</td>
          <td>{item.itemPrice}</td>
          <td>{item.itemCount}</td>
        </tr>
  );
};

export default HomeItem;

