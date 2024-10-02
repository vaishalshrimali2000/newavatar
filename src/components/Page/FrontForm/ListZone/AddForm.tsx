'use client'
import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import './App.css'; // Ensure your CSS file is correctly imported
import Config from '../../../../../config/config.json';
import { toast } from 'react-toastify';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormLabel,
  CFormInput,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell
} from '@coreui/react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';

export default function ItemsTable() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemDetails, setItemDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  // const apiUrl = Config._SERVER_URL+'getzones'; // Ensure this URL is correct

  const fetchData = () => {
    setLoading(true);
    axios.get(`${apiUrl}/getzones`)
      .then(response => {
        if (response.headers['content-type'].includes('application/json')) {
          setData(response.data);
        } else {
          throw new Error('Unexpected response format');
        }
      })
      .catch(error => {
        console.error('API Error:', error);
        setError('Failed to fetch data');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

//   const navigate = useNavigate();
  const totalEntries = data.length;
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = Array.isArray(data) ? data.slice(indexOfFirstEntry, indexOfLastEntry) : [];
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setItemDetails({ ...item }); // Initialize itemDetails with all fields of the selected item
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setItemDetails({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (selectedItem) {
      axios.post(`${apiUrl}/editzone`, itemDetails)
        .then(() => {
          fetchData(); // Re-fetch data after update
          handleCloseModal();
        })
        .catch(error => {
          console.error('Update Error:', error);
        });
    }
  };

  const handleDelete = (item) => {
    const payload = {
      "ZoneID": item.ZoneID,
      "UpdatedBy": item.UpdatedBy
    };
    console.log(payload);

    axios.post(`${apiUrl}/disablezone`, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        fetchData(); // Re-fetch data after delete
      })
      .catch(error => {
       toast.error('Delete Error:', error.response ? error.response.data : error.message);
      });
  };

  const handleRowSelection = (itemId) => {
    setSelectedRows(prevSelectedRows =>
      prevSelectedRows.includes(itemId)
        ? prevSelectedRows.filter(id => id !== itemId)
        : [...prevSelectedRows, itemId]
    );
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : currentEntries.map(item => item.BrandID));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter(item =>
    item.ZoneID.toString().includes(searchTerm) ||
    item.ZoneName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const columnHeaders = data.length > 0 ? Object.keys(data[0]) : [];
  const columnsToShow = columnHeaders.slice(0, 4);

  return (
    <CCard style={{ padding: '20px', fontSize: '0.80rem' }}>
      <CCardHeader style={{ backgroundColor: '#040430', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', fontSize: '0.80rem' }}>
        <h2 style={{ margin: 0, fontSize: '1rem', alignItems: 'center' }}>Zone Table</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label htmlFor="search-bar" style={{ marginRight: '10px', color: 'white' }}>
            Search:
          </label>
          <input
            id="search-bar"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by ID or Name"
            style={{
              padding: '4px 8px', // Adjust padding to fit within the 32px height
              borderRadius: '4px',
              border: '1px solid #dcdcdc',
              marginRight: '20px',
              fontSize: '0.80rem',
              height: '32px', // Set height of input box to match button
            }}
          />
          <CButton color="primary" onClick={() => navigate('/base/addzone')} style={{ fontSize: '0.80rem', height: '32px', display: 'flex', alignItems: 'center', padding: '0 10px' }}>
            <FaPlus style={{ marginRight: '5px' }} />
            Add Zone
          </CButton>
        </div>
      </CCardHeader>

      <CCard style={{ overflowX: 'auto', fontSize: '1rem', fontFamily: 'verdana' }}>
        <CTable hover bordered >
          <CTableHead color="primary">
            <CTableRow>
              <CTableHeaderCell className="table-header-cell">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </CTableHeaderCell>
              {columnsToShow.map((header) => (
                <CTableHeaderCell key={header} className="centered-cell table-header-cell">
                  {header}
                </CTableHeaderCell>
              ))}
              <CTableHeaderCell className="centered-cell table-header-cell">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredEntries.map((item, index) => (
              <CTableRow
                key={index}
                className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}
                style={{ alignItems: 'center' }}
              >
                <CTableDataCell className="centered-cell table-cell">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item.BrandID)}
                    onChange={() => handleRowSelection(item.BrandID)}
                  />
                </CTableDataCell>
                {columnsToShow.map((header) => (
                  <CTableDataCell className="centered-cell table-cell" key={header}>
                    {item[header]}
                  </CTableDataCell>
                ))}
                <CTableDataCell className="centered-cell table-cell" >
                  <CButton
                    className="btn-info-custom m-2"
                    onClick={() => handleOpenModal(item)}
                  >
                    <FaEdit style={{ fontSize: '1rem', color: 'black' }} />
                  </CButton>
                  <CButton
                    className="btn-danger-custom"
                    onClick={() => handleDelete(item)}
                  >
                    <FaTrash style={{ fontSize: '1rem', color: 'black' }} />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCard>
      <CCardBody style={{ fontSize: '0.80rem' }}>
        <CButton color="primary" onClick={goToPreviousPage} disabled={currentPage === 1} size="sm">
          Previous
        </CButton>
        {[...Array(totalPages).keys()].map((number) => (
          <CButton
            key={number + 1}
            color={currentPage === number + 1 ? 'primary' : 'secondary'}
            onClick={() => handlePageClick(number + 1)}
            size="sm"
            className="mx-1"
          >
            {number + 1}
          </CButton>
        ))}
        <CButton color="primary" onClick={goToNextPage} disabled={currentPage === totalPages} size="sm">
          Next
        </CButton>
      </CCardBody>
      <CModal visible={showModal} onClose={handleCloseModal}>
        <CModalHeader>
          <CModalTitle>Edit Zone</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.80rem' }}>
            <CFormLabel htmlFor="ZoneID">Zone ID</CFormLabel>
            <CFormInput
              id="ZoneID"
              name="ZoneID"
              value={itemDetails.ZoneID || ''}
              onChange={handleChange}
              disabled
            />
            <CFormLabel htmlFor="ZoneName">Zone Name</CFormLabel>
            <CFormInput
              id="ZoneName"
              name="ZoneName"
              value={itemDetails.ZoneName || ''}
              onChange={handleChange}
            />
            {/* Add more fields as needed */}
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleCloseModal}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleSubmit}>
            Save Changes
          </CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  );
}