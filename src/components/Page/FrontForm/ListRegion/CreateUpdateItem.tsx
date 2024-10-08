import React, { useState, useEffect } from 'react';
import { CButton, CFormLabel, CFormInput, CCard, CCardBody, CCardHeader, CModal, CModalBody, CModalHeader, CModalTitle, CModalFooter, CFormTextarea, CRow, CCol, CFormSelect } from '@coreui/react';
import axios from 'axios';
import { toast } from 'react-toastify';
const ItemsCrudOperations = ({ isEditMode, itemDetails, onClose, onRefresh,rowData }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formDetails, setFormDetails] = useState(itemDetails);
  const [zones, setZones] = useState([]); // State to hold dropdown options
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return formDetails.RegionName && formDetails.Description && formDetails.SortOrder && formDetails.ZoneID ;
  };

  // const handleSubmit = async () => {
  //   if (validateForm()) {
  //     const url = isEditMode
  //       ? `${apiUrl}/editregion`
  //       : `${apiUrl}/addregion`;

  //     try {
  //       const response = await axios.post(url, formDetails, {
  //         headers: { 'Content-Type': 'application/json' },
  //       });

  //       if (response.status >= 200 && response.status < 300) {
  //         setShowSuccessModal(true);
  //         toast.success(isEditMode ? 'region successfully updated!' : 'region successfully created!');
           
  //         setTimeout(() => {
  //           onRefresh();
  //           onClose();
  //         }, 1000);
  //       } else {
  //         throw new Error('Failed to submit');
  //       }
  //     } catch (error) {
  //       setErrorMessage(error.response?.data?.message || error.message);
  //       setShowErrorModal(true);
  //     }
  //   } else {
  //     setErrorMessage('Please fill all fields, including Zone.');
  //     setShowErrorModal(true);
  //   }
  // };
  const handleSubmit = async () => {
    if (validateForm()) {
      const url = isEditMode
        ? `${apiUrl}/editregion`
        : `${apiUrl}/addregion`;

      try {
        let isDuplicate = 0;
        if (isEditMode) {
          const tmpEditData = rowData.filter((itm) => {
            return itm.RegionID !== itemDetails.RegionID && itm.RegionName === formDetails.RegionName
          });
          isDuplicate = tmpEditData?.length > 0 ? 1 : 0;
        } else {
          const tmpData = rowData.filter((itm) => {
            return itm.RegionName === formDetails.RegionName
          });
          isDuplicate = tmpData?.length > 0 ? 1 : 0;
        }
        if (isDuplicate === 1) {
          toast.error("Region name already exists!");
        } else {
          const response = await axios.post(url, formDetails, {
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.status >= 200 && response.status < 300) {
            // setShowSuccessModal(true);
            toast.success(isEditMode ? 'Region successfully updated!' : 'Region successfully created!');
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
    if (isEditMode) {
      const fetchZones = async () => {
        try {
          const response = await axios.get(`${apiUrl}/getzones`);
          setZones(response.data);
        } catch (error) {
          toast.error('Failed to fetch zones');
          setShowErrorModal(true);
        }
      };
  
      const fetchRegionDetails = async () => {
        try {
          const url = `${apiUrl}/searchregion/${itemDetails.RegionID}`;
          const response = await axios.get(url);
          setFormDetails(response.data[0]);
        } catch (error) {
          setErrorMessage('Failed to fetch region details');
          setFormDetails(itemDetails);
        }
      };
  
      fetchZones();
      fetchRegionDetails();
    } else {
      // Fetch zones when adding new region (not in edit mode)
      const fetchZones = async () => {
        try {
          const response = await axios.get(`${apiUrl}/getzones`);
          setZones(response.data);
        } catch (error) {
          toast.error('Failed to fetch zones');
          setShowErrorModal(true);
        }
      };
      fetchZones();
    }
  }, [isEditMode]);
  

  return (
    <CCard>
      <CCardHeader style={{ backgroundColor: '#040430', color: 'white' }}>
        <h5>{isEditMode ? 'Edit Region' : 'Add Region'}</h5>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel htmlFor="RegionName">Region Name:</CFormLabel>
            <CFormInput
              type="text"
              id="RegionName"
              name="RegionName"
              value={formDetails.RegionName || ''}
              onChange={handleChange}
              placeholder="Enter region name"
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
          {/* <CFormLabel htmlFor="DistrictID">Taluka:</CFormLabel>
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
              ))} */}
            <CFormLabel htmlFor="ZoneID">Zone:</CFormLabel>
            <CFormSelect
              id="ZoneID"
              name="ZoneID"
              value={formDetails.ZoneID || ''}
              onChange={handleChange}
            >
              <option value="">Select a zone</option>
              {zones.map((zone) => (
                <option key={zone.ZoneID} value={zone.ZoneID}>
                  {zone.ZoneName}
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
      {/* <CModal visible={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <CModalHeader onClose={() => setShowSuccessModal(false)}>
          <CModalTitle>Success</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {isEditMode ? 'Item successfully updated!' : 'Item successfully created!'}
        </CModalBody>
        <CModalFooter>
          <CButton color="primary"  onClick={() => setShowSuccessModal(false)}>
            OK
          </CButton>
        </CModalFooter>
      </CModal> */}

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
