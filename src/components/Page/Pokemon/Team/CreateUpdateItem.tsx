import React, { useState, useEffect } from 'react';
import { CButton, CFormLabel, CFormInput, CCard, CCardBody, CCardHeader, CModal, CModalBody, CModalHeader, CModalTitle, CModalFooter, CFormTextarea, CRow, CCol, CFormSelect } from '@coreui/react';
import axios from 'axios';

const ItemsCrudOperations = ({ isEditMode, itemDetails, onClose, onRefresh }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formDetails, setFormDetails] = useState(itemDetails);
  const [states, setStates] = useState([]); // State to hold states

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return formDetails.DistrictName && formDetails.Description && formDetails.SortOrder && formDetails.StateID;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const url = isEditMode
        ? 'http://192.168.168.133:90/mst/editdistrict'
        : 'http://192.168.168.133:90/mst/adddistrict';

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
      setErrorMessage('Please fill all fields, including State.');
      setShowErrorModal(true);
    }
  };

  // Fetch states on component mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get('http://192.168.168.133:90/mst/getstates'); // Replace with your actual API endpoint
        setStates(response.data); // Assuming response.data is an array of states
      } catch (error) {
        setErrorMessage('Failed to fetch states');
        setShowErrorModal(true);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        var url = 'http://192.168.168.133:90/mst/searchdistrict/' + itemDetails.DistrictID;
        const response = await axios.get(url); // Replace with your API endpoint
      
        setFormDetails(response.data[0]); // Assuming response.data is an array of zones
        
      } catch (error) {
        setErrorMessage('Failed to fetch zones');
        console.log("itemDetailsitemDetailsitemDetails : " + JSON.stringify(itemDetails));
        
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
        <h5>{isEditMode ? 'Edit District' : 'Add District'}</h5>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel htmlFor="DistrictName">District Name:</CFormLabel>
            <CFormInput
              type="text"
              id="DistrictName"
              name="DistrictName"
              value={formDetails.DistrictName || ''}
              onChange={handleChange}
              placeholder="Enter district name"
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
            <CFormLabel htmlFor="StateID">State:</CFormLabel>
            <CFormSelect
              id="StateID"
              name="StateID"
              value={formDetails.StateID || ''}
              onChange={handleChange}
            >
              <option value="">Select a state</option>
              {states.map((state) => (
                <option key={state.StateID} value={state.StateID}>
                  {state.StateName}
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
