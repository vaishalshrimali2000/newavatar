import React, { useState, useEffect } from 'react';
import {
  CButton,
  CFormLabel,
  CFormInput,
  CCard,
  CCardBody,
  CCardHeader,
  CFormTextarea,
  CRow,
  CCol,
  CFormSelect,
} from '@coreui/react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast

const ItemsCrudOperations = ({ isEditMode, itemDetails, onClose, onRefresh, rowData }) => {
  const [formDetails, setFormDetails] = useState(itemDetails);
  const [states, setStates] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return formDetails.DistrictName && formDetails.Description && formDetails.SortOrder && formDetails.StateID;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const url = isEditMode ? `${apiUrl}/editdistrict` : `${apiUrl}/adddistrict`;

      try {
        let isDuplicate = false;

        if (isEditMode) {
          isDuplicate = rowData.some((itm) => itm.DistrictID !== itemDetails.DistrictID && itm.DistrictName === formDetails.DistrictName);
        } else {
          isDuplicate = rowData.some((itm) => itm.DistrictName === formDetails.DistrictName);
        }

        if (isDuplicate) {
          toast.error("District name already exists!");
        } else {
          const response = await axios.post(url, formDetails, {
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.status >= 200 && response.status < 300) {
            toast.success(isEditMode ? 'District successfully updated!' : 'District successfully created!');
            setTimeout(() => {
              onRefresh();
              onClose();
            }, 1000);
          } else {
            throw new Error('Failed to submit');
          }
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    } else {
      toast.error("Please fill all required fields!");
    }
  };

  // Fetch states on component mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(`${apiUrl}/getstates`); // Update with your actual API endpoint
        setStates(response.data);
      } catch (error) {
        toast.error('Failed to fetch states');
      }
    };

    fetchStates();
  }, [apiUrl]);

  useEffect(() => {
    const fetchZones = async () => {
      if (isEditMode) {
        try {
          const url = `${apiUrl}/searchdistrict/${itemDetails.DistrictID}`;
          const response = await axios.get(url);
          setFormDetails(response.data[0]); // Assuming response.data is an array of zones
        } catch (error) {
          setFormDetails(itemDetails);
        }
      }
    };

    fetchZones();
  }, [isEditMode, apiUrl, itemDetails]);

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
    </CCard>
  );
};

export default ItemsCrudOperations;
