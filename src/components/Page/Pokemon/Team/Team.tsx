'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCard,
  CCardHeader,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter
} from '@coreui/react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import ItemsCrudOperations from './CreateUpdateItem'; // Ensure this component is implemented
import { toast } from 'react-toastify'; // Import toast

const ItemsTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // const apiUrl = 'http://192.168.168.133:90/mst/getdistrict'; // Your API URL
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`${apiUrl}/getdistrict`)
      .then((response) => {
        if (response.headers['content-type'].includes('application/json')) {
          setData(response.data);
        } else {
          throw new Error('Unexpected response format');
        }
      })
      .catch((error) => {
        setError(error);
        toast.error('Error fetching data: ' + error.message); // Error toast
      })
      .finally(() => setLoading(false));
  };

  const handleOpenForm = (item = null) => {
    setIsEditMode(!!item);
    setSelectedItem(item);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedItem(null);
  };

  const handleDeleteConfirm = (item) => {
    setItemToDelete(item);
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    axios
      .post(`${apiUrl}/disabledistrict`, {
        DistrictID: itemToDelete.DistrictID,
        UpdatedBy: itemToDelete.UpdatedBy,
      })
      .then(() => {
        fetchData();
        setShowDeleteConfirm(false);
        toast.success('Item deleted successfully!'); // Success toast
      })
      .catch((error) => {
        toast.error('Failed to delete item: ' + error.message); // Error toast
      });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Pagination logic
  const totalPages = Math.ceil(data.length / entriesPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Filter data based on search term
  const filteredData = data.filter(
    (item) =>
      item.DistrictID.toString().includes(searchTerm) ||
      item.DistrictName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentEntries = filteredData.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <CCard style={{ margin: '0', padding: '0' }}>
      {showForm ? (
        <ItemsCrudOperations
          isEditMode={isEditMode}
          itemDetails={selectedItem || { DistrictName: '', Description: '', SortOrder: '' }}
          onClose={handleCloseForm}
          onRefresh={fetchData}
          rowData={data}
          onSuccess={() => {
            toast.success(isEditMode ? 'Item successfully updated!' : 'Item successfully created!'); // Success toast
          }}
        />
      ) : (
        <>
          <CCardHeader
            className="d-flex justify-content-between align-items-center"
            style={{ backgroundColor: '#040430', color: 'white' }}
          >
            <strong>List District</strong>
            <div className="d-flex align-items-center">
              <label htmlFor="search-bar" style={{ marginRight: '10px', color: 'white' }}>
                Search:
              </label>
              <input
                id="search-bar"
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by Code or Name"
                style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  border: '1px solid #dcdcdc',
                  marginRight: '20px',
                  fontSize: '0.80rem',
                  height: '32px',
                }}
              />
              <CButton
                color="primary"
                onClick={() => handleOpenForm()} // Open the form
                style={{ fontSize: '0.80rem', height: '32px', display: 'flex', alignItems: 'center', padding: '0 10px' }}
              >
                <FaPlus style={{ marginRight: '5px' }} />
                Add District
              </CButton>
            </div>
          </CCardHeader>
          <CCard>
            <CTable>
              <CTableHead style={{ backgroundColor: '#DEDDF7' }}>
                <CTableRow>
                  <CTableHeaderCell style={{ textAlign: 'start' }}>ID</CTableHeaderCell>
                  <CTableHeaderCell style={{ textAlign: 'start' }}>District Name</CTableHeaderCell>
                  <CTableHeaderCell style={{ textAlign: 'start' }}>Description</CTableHeaderCell>
                  <CTableHeaderCell style={{ textAlign: 'start' }}>Sort Order</CTableHeaderCell>
                  <CTableHeaderCell style={{ textAlign: 'start' }}>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentEntries.map((item) => (
                  <CTableRow key={item.DistrictID}>
                    <CTableDataCell style={{ textAlign: 'start' }}>{item.DistrictID}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'start' }}>{item.DistrictName}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'start' }}>{item.Description}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'start' }}>{item.SortOrder}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'start' }}>
                      <CButton color="black" onClick={() => handleOpenForm(item)}>
                        <FaEdit />
                      </CButton>
                      <CButton color="black" onClick={() => handleDeleteConfirm(item)}>
                        <FaTrash />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCard>

          <div className="pagination mt-3 d-flex align-items-center justify-content-center">
            <CButton
              color="primary"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              size="sm"
              className="me-2"
            >
              Previous
            </CButton>

            <CButton
              color="secondary"
              size="sm"
              className="current-page mx-1"
              disabled
            >
              {currentPage}
            </CButton>

            <CButton
              color="primary"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              size="sm"
              className="ms-2"
            >
              Next
            </CButton>
          </div>
        </>
      )}

      {/* Confirmation Dialog */}
      <CModal visible={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)}>
        <CModalHeader onClose={() => setShowDeleteConfirm(false)}>
          <CModalTitle>Confirm Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Are you sure you want to delete this item?</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={handleDelete}>
            Delete
          </CButton>
          <CButton color="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  );
};

export default ItemsTable;
