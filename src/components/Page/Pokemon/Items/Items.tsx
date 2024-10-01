'use client';
import React, { useState, useEffect } from 'react';
import Axios from '../../../Axios/Axios';
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
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import ItemsCrudOperations from './CreateUpdateItem'; // Ensure this component is implemented
import AddItemForm from './AddItemForm';

export const initialItemValues: any = {
  itemOrg: "",
  itemCategory: "",
  itemCollection: "",
  itemType: "",
  ItemCode: "",
  ItemName: "",
  ItemMRP: "",
  ItemRPrice: "",
  ItemDPrice: "",
  ItemStoneQty: "",
  ItemStoneColorCommonID: "",
  ItemStoneShapeCommonID: "",
  ItemMetalWt: "",
  ItemStoneWt: "",
  orderSuffix: "",
  odIdNo: "",
  kt: "",
};

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
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [showDeleteErrorModal, setShowDeleteErrorModal] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
    getStoneQualityList();
    getItemDaysList();
    getSubCategoryList();
    getCartDaysList();
    getUOMList();
    getMetalList();
    getStoneList();
    getStoneColorList();
    getStoneShapesList();
    getPPTagList();
    getStarColorList();
  }, []);

  const fetchData = () => {
    setLoading(true);
    Axios
      .get('/msts/getitem')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  };

  // GET STONE QUALITY DROPDOWN DATA
  const [stoneQualityList, setStoneQualityList] = useState([]);
  const getStoneQualityList = () => {
    Axios
      .get('/mst/getstonequality')
      .then((response) => {
        setStoneQualityList(response.data);
      })
      .catch((error) => {
        setError(error);
      })
  }
  
  // GET ITEM DAYS DROPDOWN DATA
  const [itemDaysList, setItemDaysList] = useState([]);
  const getItemDaysList = () => {
    Axios
      .get('/mst/getitemdays')
      .then((response) => {
        setItemDaysList(response.data);
      })
      .catch((error) => {
        setError(error);
      })
  }

  // GET SUBCATEGORY LIST DROPDOWN DATA
  const [subCategoryList, setSubCategoryList] = useState([]);
  const getSubCategoryList = () => {
    Axios
      .get('/mst/getsubcategories')
      .then((response) => {
        setSubCategoryList(response.data);
      })
      .catch((error) => {
        setError(error);
      })
  }

  // GET SUBCATEGORY LIST DROPDOWN DATA
  const [cartDaysList, setCartDaysList] = useState([]);
  const getCartDaysList = () => {
    Axios
      .get('/mst/getcartdays')
      .then((response) => {
        setCartDaysList(response.data);
      })
      .catch((error) => {
        setError(error);
      })
  }

  // GET UOM LIST DROPDOWN DATA
  const [uomList, setUOMList] = useState([]);
  const getUOMList = () => {
    Axios
      .get('/mst/getuom')
      .then((response) => {
        setUOMList(response.data);
      })
      .catch((error) => {
        setError(error);
      })
  }

  // GET METALS LIST DROPDOWN DATA
  const [metalList, setMetalList] = useState([]);
  const getMetalList = () => {
    Axios
      .get('/mst/getmetals')
      .then((response) => {
        setMetalList(response.data);
      })
      .catch((error) => {
        setError(error);
      })
  }

  // GET STONE LIST DROPDOWN DATA
  const [stoneList, setStoneList] = useState([]);
  const getStoneList = () => {
    Axios
      .get('/mst/getstones')
      .then((response) => {
        setStoneList(response.data);
      })
      .catch((error) => {
        setError(error);
      })
  }

  // GET STONE COLOR LIST DROPDOWN DATA
  const [stoneColorList, setStoneColorList] = useState([]);
  const getStoneColorList = () => {
    Axios
      .get('/mst/getstonecolors')
      .then((response) => {
        setStoneColorList(response.data);
      })
      .catch((error) => {
        setError(error);
      })
  }

  // GET STONE SHAP LIST DROPDOWN DATA
  const [stoneShapesList, setStoneShapesList] = useState([]);
  const getStoneShapesList = () => {
    Axios
      .get('/mst/getstoneshapes')
      .then((response) => {
        setStoneShapesList(response.data);
      })
      .catch((error) => {
        setError(error);
      })
  }

  // GET STONE SHAP LIST DROPDOWN DATA
  const [pptagList, setPPTagList] = useState([]);
  const getPPTagList = () => {
    Axios
      .get('/mst/getpptags')
      .then((response) => {
        setPPTagList(response.data);
      })
      .catch((error) => {
        setError(error);
      })
  }

  // GET STONE SHAP LIST DROPDOWN DATA
  const [starColorList, setStarColorList] = useState([]);
  const getStarColorList = () => {
    Axios
      .get('/mst/getstarcolors')
      .then((response) => {
        setStarColorList(response.data);
      })
      .catch((error) => {
        setError(error);
      })
  }

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
    Axios
      .post('/disableitem', {
        BrandID: itemToDelete.ItemID,
        UpdatedBy: itemToDelete.UpdatedBy,
      })
      .then(() => {
        fetchData();
        setShowDeleteConfirm(false);
        setShowDeleteSuccessModal(true);
        
        // Close the success modal after 1 second
        setTimeout(() => {
          setShowDeleteSuccessModal(false);
        }, 1000);
      })
      .catch((error) => {
        setDeleteErrorMessage(error.message);
        setShowDeleteErrorModal(true);
      });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSuccess = () => {
    setShowSuccessModal(true);
  };

  // Pagination logic
  const totalPages = Math.ceil(data.length / entriesPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filter data based on search term
  const filteredData = data.filter(
    (item) =>
      item?.ItemCode?.toString()?.includes(searchTerm) ||
      item?.ItemName?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  const currentEntries = filteredData.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <CCard style={{ margin: '0', padding: '0' }}>
      {showForm ? (
        // <ItemsCrudOperations
        //   isEditMode={isEditMode}
        //   itemDetails={selectedItem || { BrandName: '', Description: '', SortOrder: '' }}
        //   onClose={handleCloseForm}
        //   onRefresh={fetchData}
        //   onSuccess={handleSuccess}
        // />
        <AddItemForm
          isEditMode={isEditMode}
          itemDetails={selectedItem || initialItemValues}
          onClose={handleCloseForm}
          onRefresh={fetchData}
          onSuccess={handleSuccess}
        />
      ) : (
        <>
          <CCardHeader
            className="d-flex justify-content-between align-items-center"
            style={{ backgroundColor: '#040430', color: 'white' }}
          >
            <strong>List Items</strong>
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
                onClick={() => handleOpenForm()} // Assuming you're opening the form here
                style={{ fontSize: '0.80rem', height: '32px', display: 'flex', alignItems: 'center', padding: '0 10px' }}
              >
                <FaPlus style={{ marginRight: '5px' }} />
                Add Item
              </CButton>
            </div>
          </CCardHeader>
          <CCard>
            <CTable>
              <CTableHead style={{ backgroundColor: '#DEDDF7' }}>
                <CTableRow>
                  <CTableHeaderCell style={{ textAlign: 'start' }}>ID</CTableHeaderCell>
                  <CTableHeaderCell style={{ textAlign: 'start' }}>Item Name</CTableHeaderCell>
                  <CTableHeaderCell style={{ textAlign: 'start' }}>Item Code</CTableHeaderCell>
                  <CTableHeaderCell style={{ textAlign: 'start' }}>Description</CTableHeaderCell>
                  <CTableHeaderCell style={{ textAlign: 'start' }}>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentEntries.map((item) => (
                  <CTableRow key={item.BrandID}>
                    <CTableDataCell style={{ textAlign: 'start' }}>{item.ItemID}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'start' }}>{item.ItemName}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'start' }}>{item.ItemCode}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'start' }}>{item.ItemDesc}</CTableDataCell>
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

      {/* Confirmation and Success Modals */}
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

      {/* Success Modal for Delete */}
      <CModal visible={showDeleteSuccessModal} onClose={() => setShowDeleteSuccessModal(false)}>
        <CModalHeader onClose={() => setShowDeleteSuccessModal(false)}>
          <CModalTitle>Success</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Item deleted successfully!</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setShowDeleteSuccessModal(false)}>
            OK
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Error Modal for Delete */}
      <CModal visible={showDeleteErrorModal} onClose={() => setShowDeleteErrorModal(false)}>
        <CModalHeader onClose={() => setShowDeleteErrorModal(false)}>
          <CModalTitle>Error</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>{deleteErrorMessage}</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setShowDeleteErrorModal(false)}>
            OK
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Success Modal for Item Creation/Update */}
      <CModal visible={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <CModalHeader onClose={() => setShowSuccessModal(false)}>
          <CModalTitle>Success</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {isEditMode ? 'Item successfully updated!' : 'Item successfully created!'}
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setShowSuccessModal(false)}>
            OK
          </CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  );
};

export default ItemsTable;
