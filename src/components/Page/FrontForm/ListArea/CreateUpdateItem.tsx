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
import PropTypes from 'prop-types';

const ItemsCrudOperations = ({ isEditMode, itemDetails, onClose, onRefresh, rowData}) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formDetails, setFormDetails] = useState({ AreaName: '', Description: '', SortOrder: '', CityID: '' });
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return formDetails.AreaName && formDetails.Description && formDetails.SortOrder && formDetails.CityID;
  };

  
  const handleSubmit = async () => {
    if (validateForm()) {
      const url = isEditMode
        ? `${apiUrl}/editarea`
        : `${apiUrl}/addarea`;

      try {
        let isDuplicate = 0;
        if (isEditMode) {
          const tmpEditData = rowData.filter((itm) => {
            return itm.AreaID !== itemDetails.AreaID && itm.AreaName === formDetails.AreaName
            
          });
          isDuplicate = tmpEditData?.length > 0 ? 1 : 0;
        } else {
          const tmpData = rowData.filter((itm) => {
            return itm.AreaName === formDetails.AreaName
          });
          isDuplicate = tmpData?.length > 0 ? 1 : 0;
        }
        if (isDuplicate === 1) {
          toast.error("Area name already exists!");
        } else {
          const response = await axios.post(url, formDetails, {
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.status >= 200 && response.status < 300) {
            // setShowSuccessModal(true);
            toast.success(isEditMode ? 'Area successfully updated!' : 'Area successfully created!');
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
    // console.log(rowData);
  };
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${apiUrl}/getCity`); // Use apiUrl for fetching cities
        setCities(response.data);
      } catch (error) {
        setErrorMessage('Failed to fetch cities');
        setShowErrorModal(true);
      }
    };
<<<<<<< HEAD
    fetchCities();
  }, [apiUrl]);
=======
 
      fetchCities();
    
  }, []);
>>>>>>> development

  useEffect(() => {
    if (isEditMode) {
      const fetchZones = async () => {
        try {
          const url = `${apiUrl}/searcharea/${itemDetails.AreaID}`;
          const response = await axios.get(url);
          setFormDetails(response.data[0]);
        } catch (error) {
          setErrorMessage('Failed to fetch zones');
          setFormDetails(itemDetails);
        }
      };
      fetchZones();
    }
  }, [isEditMode, itemDetails, apiUrl]);

  return (
    <CCard>
      <CCardHeader style={{ backgroundColor: '#040430', color: 'white' }}>
        <h5>{isEditMode ? 'Edit Area' : 'Add Area'}</h5>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel htmlFor="AreaName">Area Name:</CFormLabel>
            <CFormInput
              type="text"
              id="AreaName"
              name="AreaName"
              value={formDetails.AreaName || ''}
              onChange={handleChange}
              placeholder="Enter area name"
              disabled={loading} // Disable input while loading
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
              disabled={loading} // Disable input while loading
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
              disabled={loading} // Disable input while loading
            />
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="CityID">City:</CFormLabel>
            <CFormSelect
              id="CityID"
              name="CityID"
              value={formDetails.CityID || ''}
              onChange={handleChange}
              disabled={loading} // Disable select while loading
            >
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city.CityID} value={city.CityID}>
                  {city.CityName}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CRow>

        <div className="d-flex justify-content-end">
          <CButton color="secondary" className="me-2" onClick={onClose} disabled={loading}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleSubmit} disabled={loading}>
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
