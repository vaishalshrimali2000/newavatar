import React, { useState, useEffect } from 'react';
import { CButton, CFormLabel, CFormInput, CCard, CCardBody, CCardHeader, CModal, CModalBody, CModalHeader, CModalTitle, CModalFooter, CFormTextarea, CRow, CCol, CFormSelect } from '@coreui/react';
import axios from 'axios';

const ItemsCrudOperations = ({ isEditMode, itemDetails, onClose, onRefresh }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formDetails, setFormDetails] = useState(itemDetails);
  const [districts, setDistricts] = useState([]); // State to hold district options

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return formDetails.TalukaName && formDetails.Description && formDetails.SortOrder && formDetails.DistrictID;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const url = isEditMode
        ? 'http://192.168.168.133:90/mst/edittaluka'
        : 'http://192.168.168.133:90/mst/addtaluka';

      try {
        const response = await axios.post(url, formDetails, {
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.status >= 200 && response.status < 300) {
          setShowSuccessModal(true);
          setTimeout(() => {
            onRefresh();
            onClose();
          }, 1000);
        } else {
          throw new Error('Failed to submit');
        }
      } catch (error) {
        setErrorMessage(error.response?.data?.message || error.message);
        setShowErrorModal(true);
      }
    } else {
      setErrorMessage('Please fill all fields, including District.');
      setShowErrorModal(true);
    }
  };

  // Fetch districts on component mount
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get('http://192.168.168.133:90/mst/getdistrict'); // Replace with your actual API endpoint
        setDistricts(response.data); // Assuming response.data is an array of districts
      } catch (error) {
        setErrorMessage('Failed to fetch districts');
        setShowErrorModal(true);
      }
    };
    if (isEditMode) {
      fetchDistricts();
    }
  }, []);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        var url = 'http://192.168.168.133:90/mst/searchtaluka/' + itemDetails.TalukaID;
        const response = await axios.get(url); // Replace with your API endpoint
      
        setFormDetails(response.data); // Assuming response.data is an array of zones
        
      } catch (error) {
        setErrorMessage('Failed to fetch zones');
        setFormDetails(itemDetails);
      }
    };

    fetchZones();
  }, [isEditMode]);

  return (
    <CCard>
      <CCardHeader style={{ backgroundColor: '#040430', color: 'white' }}>
        <h5>{isEditMode ? 'Edit Taluka' : 'Add Taluka'}</h5>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel htmlFor="TalukaName">Taluka Name:</CFormLabel>
            <CFormInput
              type="text"
              id="TalukaName"
              name="TalukaName"
              value={formDetails.TalukaName || ''}
              onChange={handleChange}
              placeholder="Enter taluka name"
            />
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="SortOrder">Sort Order:</CFormLabel>
            <CFormInput
              type="number"
              id="SortOrder"
              name="SortOrder"
              value={formDetails.SortOrder || ''}
              onChange={handleChange}
              placeholder="Enter sort order"
            />
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel htmlFor="Description">Description:</CFormLabel>
            <CFormTextarea
              id="Description"
              name="Description"
              value={formDetails.Description || ''}
              onChange={handleChange}
              placeholder="Enter description"
            />
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="DistrictID">District:</CFormLabel>
            <CFormSelect
              id="DistrictID"
              name="DistrictID"
              value={formDetails.DistrictID || ''}
              onChange={handleChange}
            >
              <option value="">Select a district</option>
              {districts.map((district) => (
                <option key={district.DistrictID} value={district.DistrictID}>
                  {district.DistrictName}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CRow>

        <div className="d-flex justify-content-end">
          <CButton color="secondary" className="me-2" onClick={onClose}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleSubmit}>
            {isEditMode ? 'Save Changes' : 'Save'}
          </CButton>
        </div>
      </CCardBody>

      {/* Success Modal */}
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

      {/* Error Modal */}
      <CModal visible={showErrorModal} onClose={() => setShowErrorModal(false)}>
        <CModalHeader onClose={() => setShowErrorModal(false)}>
          <CModalTitle>Error</CModalTitle>
        </CModalHeader>
        <CModalBody>{errorMessage}</CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => setShowErrorModal(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  );
};

export default ItemsCrudOperations;
