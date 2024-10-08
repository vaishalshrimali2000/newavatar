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
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
} from '@coreui/react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import ItemsCrudOperations from './CreateUpdateItem'; // Ensure this path is correct
import { toast } from 'react-toastify';

const EmployeesTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [showDeleteErrorModal, setShowDeleteErrorModal] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');
  const apiUrl = 'http://192.168.168.133:90/mst/getemaillist'; // New API URL

  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(apiUrl)
      .then((response) => {
        if (response.headers['content-type'].includes('application/json')) {
          setData(response.data);
        } else {
          throw new Error('Unexpected response format');
        }
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
    setSelectedItem(item);
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    axios
      .delete(`${apiUrl}/${selectedItem.ID}`)
      .then(() => {
        setShowDeleteConfirm(false);
        setShowDeleteSuccessModal(true);
        fetchData();
      })
      .catch((error) => {
        setDeleteErrorMessage(error.message);
        setShowDeleteErrorModal(true);
      });
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
      item.ID.toString().includes(searchTerm) ||
      item.EmpName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentEntries = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <CCard style={{ margin: '0', padding: '0' }}>
      {showForm ? (
        <ItemsCrudOperations
          isEditMode={isEditMode}
          itemDetails={selectedItem || { ColorName: '', Description: '', SortOrder: '' }}
          onClose={handleCloseForm}
          onRefresh={fetchData}
          onSuccess={() => setShowSuccessModal(true)}
        />
      ) : (
        <>
          <CCardHeader
            className="d-flex justify-content-between align-items-center"
            style={{ backgroundColor: '#040430', color: 'white' }}
          >
            <strong>List Employees</strong>
            <div className="d-flex align-items-center">
              <label htmlFor="search-bar" style={{ marginRight: '10px', color: 'white' }}>
                Search:
              </label>
              <input
                id="search-bar"
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by Email or Name"
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
                onClick={() => handleOpenForm()}
                style={{ fontSize: '0.80rem', height: '32px', display: 'flex', alignItems: 'center', padding: '0 10px' }}
              >
                <FaPlus style={{ marginRight: '5px' }} />
                Add Employee
              </CButton>
            </div>
          </CCardHeader>
          <CCard>
            <CTable>
              <CTableHead style={{ backgroundColor: '#DEDDF7' }}>
                <CTableRow>
                  <CTableHeaderCell style={{ textAlign: 'start' }}>ID</CTableHeaderCell>
                  <CTableHeaderCell style={{ textAlign: 'start' }}>Employee Name</CTableHeaderCell>
                  <CTableHeaderCell style={{ textAlign: 'start' }}>Email</CTableHeaderCell>
                  <CTableHeaderCell style={{ textAlign: 'start' }}>Department</CTableHeaderCell>
                  <CTableHeaderCell style={{ textAlign: 'start' }}>Is Active</CTableHeaderCell>
                  <CTableHeaderCell style={{ textAlign: 'start' }}>Inserted On</CTableHeaderCell>
                  <CTableHeaderCell style={{ textAlign: 'start' }}>Inserted By</CTableHeaderCell>
                  <CTableHeaderCell style={{ textAlign: 'start' }}>Updated On</CTableHeaderCell>
                  <CTableHeaderCell style={{ textAlign: 'start' }}>Updated By</CTableHeaderCell>
                  <CTableHeaderCell style={{ textAlign: 'start' }}>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentEntries.map((item) => (
                  <CTableRow key={item.ID}>
                    <CTableDataCell style={{ textAlign: 'start' }}>{item.ID}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'start' }}>{item.EmpName}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'start' }}>{item.Email}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'start' }}>{item.Department}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'start' }}>{item.IsActive ? 'Yes' : 'No'}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'start' }}>{item.InsertedOn}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'start' }}>{item.InsertedBy}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'start' }}>{item.UpdatedOn}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'start' }}>{item.UpdatedBy}</CTableDataCell>
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

            <CButton color="secondary" size="sm" className="current-page mx-1" disabled>
              {currentPage}
            </CButton>

            <CButton
              color="primary"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              size="sm"
            >
              Next
            </CButton>
          </div>

          {/* Delete Confirmation Modal */}
          <CModal visible={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)}>
            <CModalHeader>
              <CModalTitle>Confirm Deletion</CModalTitle>
            </CModalHeader>
            <CModalBody>
              Are you sure you want to delete the employee <strong>{selectedItem?.EmpName}</strong>?
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </CButton>
              <CButton color="danger" onClick={handleDelete}>
                Delete
              </CButton>
            </CModalFooter>
          </CModal>

          {/* Success Modal */}
          <CModal visible={showDeleteSuccessModal} onClose={() => setShowDeleteSuccessModal(false)}>
            <CModalHeader>
              <CModalTitle>Success</CModalTitle>
            </CModalHeader>
            <CModalBody>Employee deleted successfully!</CModalBody>
            <CModalFooter>
              <CButton color="primary" onClick={() => setShowDeleteSuccessModal(false)}>
                Close
              </CButton>
            </CModalFooter>
          </CModal>

          {/* Error Modal */}
          <CModal visible={showDeleteErrorModal} onClose={() => setShowDeleteErrorModal(false)}>
            <CModalHeader>
              <CModalTitle>Error</CModalTitle>
            </CModalHeader>
            <CModalBody>{deleteErrorMessage}</CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setShowDeleteErrorModal(false)}>
                Close
              </CButton>
            </CModalFooter>
          </CModal>

          {/* Success Modal for form submission */}
          <CModal visible={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
            <CModalHeader>
              <CModalTitle>Success</CModalTitle>
            </CModalHeader>
            <CModalBody>Employee data saved successfully!</CModalBody>
            <CModalFooter>
              <CButton color="primary" onClick={() => setShowSuccessModal(false)}>
                Close
              </CButton>
            </CModalFooter>
          </CModal>
        </>
      )}
    </CCard>
  );
};

export default EmployeesTable;
