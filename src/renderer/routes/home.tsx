import React, { useState } from 'react';
import HomeItem from '../components/home-item';
import '../styles/home-item.css';

function Home() {
  const itemsPerPage = 24;
  const totalItems = 100; // Replace this with the actual total number of items
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate the range of items to display based on the current page and search term
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filter items based on the search term
  const filteredItems = Array.from({ length: totalItems }, (_, index) => (
    <HomeItem key={index} title={`Item ${index + 1}`} />
  )).filter((item) => item.props && item.props.title.includes(searchTerm));

  const items = filteredItems.slice(startIndex, endIndex);

  const handlePageChange = (newPage:any) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (e:any) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when the search term changes
  };

  return (
    <div className='main-container'>
      <div>
        <div>Home view</div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="item-list">{items}</div>

      <div className="pagination">
        {/* Render pagination controls */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;

