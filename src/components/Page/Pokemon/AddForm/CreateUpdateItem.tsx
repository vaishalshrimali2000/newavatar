import React, { useEffect, useState } from 'react';
import { CButton, CFormLabel, CFormInput, CCard, CCardBody, CCardHeader, CModal, CModalBody, CModalHeader, CModalTitle, CModalFooter, CFormTextarea, CRow, CCol } from '@coreui/react';
import axios from 'axios';

const ItemsCrudOperations = ({ isEditMode, itemDetails, onClose, onRefresh }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formDetails, setFormDetails] = useState(itemDetails);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return formDetails.DsgName && formDetails.Remarks && formDetails.SortOrder;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const url = isEditMode
        ? 'http://192.168.168.133:90/mst/editdesigner'
        : 'http://192.168.168.133:90/mst/adddesigner';

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
      setErrorMessage('Please fill all fields');
      setShowErrorModal(true);
    }
  };

  useEffect(() => {
    const fetchZones = async () => {
      try {
        var url = 'http://192.168.168.133:90/mst/searchdesigner' + itemDetails.DsgID;
        const response = await axios.get(url); // Replace with your API endpoint
      
        setFormDetails(response.data[0]); // Assuming response.data is an array of zones
        
      } catch (error) {
        setErrorMessage('Failed to fetch zones');
        setFormDetails(itemDetails);
      }
    };
    if (isEditMode) {
      fetchZones();
    }
  }, [isEditMode]);

  return (
    <CCard>
      <CCardHeader style={{ backgroundColor: '#040430', color: 'white' }}>
        <h5>{isEditMode ? 'Edit Designer' : 'Add Designer'}</h5>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel htmlFor="DsgName">Designer Name:</CFormLabel>
            <CFormInput
              type="text"
              id="DsgName"
              name="DsgName"
              value={formDetails.DsgName || ''}
              onChange={handleChange}
              placeholder="Enter designer name"
            />
          </CCol>
          {/* <CCol md={6}>
            <CFormLabel htmlFor="SortOrder">Sort Order:</CFormLabel>
            <CFormInput
              type="number"
              id="SortOrder"
              name="SortOrder"
              value={formDetails.SortOrder || ''}
              onChange={handleChange}
              placeholder="Enter sort order"
            />
          </CCol> */}
        </CRow>

        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel htmlFor="Remarks">Remarks:</CFormLabel>
            <CFormTextarea
              id="Remarks"
              name="Remarks"
              value={formDetails.Remarks || ''}
              onChange={handleChange}
              placeholder="Enter Remarks"
              
            />
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
