import React, { useState, useEffect } from 'react';
import {
  CButton,
  CFormLabel,
  CFormInput,
  CCard,
  CCardBody,
  CCardHeader,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CFormTextarea,
  CRow,
  CCol,
  CFormSelect,
} from '@coreui/react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ItemsCrudOperations = ({ isEditMode, itemDetails, onClose, onRefresh, rowData }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formDetails, setFormDetails] = useState(itemDetails);
  const [talukas, setTalukas] = useState([]); // State for Taluka options
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Initialize formDetails when in edit mode
  useEffect(() => {
    if (isEditMode && itemDetails) {
      setFormDetails(itemDetails);
    }
  }, [isEditMode, itemDetails]);

  // Fetch Taluka options on component mount
  useEffect(() => {
    const fetchTalukas = async () => {
      try {
        const response = await axios.get(`${apiUrl}/getTaluka`); // Adjust the URL as needed
        setTalukas(response.data); // Assuming the response data is an array of Talukas
      } catch (error) {
        // setErrorMessage(error.response?.data?.message || error.message);
        // setShowErrorModal(true);
        toast.error(error.response?.data?.message || error.message);
      }
    };

    fetchTalukas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return formDetails.CityName && formDetails.Description && formDetails.SortOrder && formDetails.DistrictID;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const url = isEditMode
        ? `${apiUrl}/editcity`
        : `${apiUrl}/addcity`;

      try {
        let isDuplicate = 0;
        if (isEditMode) {
          const tmpEditData = rowData.filter((itm) => {
            return itm.CityID !== itemDetails.CityID && itm.CityName === formDetails.CityName
          });
          isDuplicate = tmpEditData?.length > 0 ? 1 : 0;
        } else {
          const tmpData = rowData.filter((itm) => {
            return itm.CityName === formDetails.CityName
          });
          isDuplicate = tmpData?.length > 0 ? 1 : 0;
        }
        if (isDuplicate === 1) {
          toast.error("City name already exists!");
        } else {
          const response = await axios.post(url, formDetails, {
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.status >= 200 && response.status < 300) {
            // setShowSuccessModal(true);
            toast.success(isEditMode ? 'City successfully updated!' : 'City successfully created!');
            setTimeout(() => {
              onRefresh();
              onClose();
            }, 1000);
          } else {
            throw new Error('Failed to submit');
          }
        }
      } catch (error) {
        // setErrorMessage(error.response?.data?.message || error.message);
        // setShowErrorModal(true);
        // @ts-ignore
        toast.error(error.response?.data?.message || error.message);
      }
    } else {
      toast.error("Please fill all required field!");
      // setErrorMessage('Please fill all fields');
      // setShowErrorModal(true);
    }
  };

  useEffect(() => {
    const fetchZones = async () => {
      try {
        var url = `${apiUrl}/searchcity/` + itemDetails.CityID;
        console.log("log : " + url);
        
        const response = await axios.get(url); // Replace with your API endpoint
        console.log("response : " + JSON.stringify(response.data[0]));
        
      
        setFormDetails(response.data[0]); // Assuming response.data is an array of zones
        
      } catch (error) {
        // setErrorMessage('Failed to fetch zones');
        toast.error('Failed to fetch zones');
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
        <h5>{isEditMode ? 'Edit City' : 'Add City'}</h5>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel htmlFor="CityName">City Name:</CFormLabel>
            <CFormInput
              type="text"
              id="CityName"
              name="CityName"
              value={formDetails.CityName || ''}
              onChange={handleChange}
              placeholder="Enter area name"
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
            <CFormLabel htmlFor="DistrictID">Taluka:</CFormLabel>
            <CFormSelect
              id="DistrictID"
              name="DistrictID"
              value={formDetails.DistrictID || ''}
              onChange={handleChange}
              required
            >
              <option value="">Select a taluka</option>
              {talukas.map((taluka) => (
                <option key={taluka.TalukaID} value={taluka.TalukaID}>{taluka.TalukaName}</option>
              ))}
              {/* Ensure that taluka objects have id and name properties */}
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
