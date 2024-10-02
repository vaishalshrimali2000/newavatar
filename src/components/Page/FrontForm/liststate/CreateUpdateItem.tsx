import React, { useState, useEffect } from 'react';
import { CButton, CFormLabel, CFormInput, CCard, CCardBody, CCardHeader, CModal, CModalBody, CModalHeader, CModalTitle, CModalFooter, CFormTextarea, CRow, CCol, CFormSelect } from '@coreui/react';
import axios from 'axios';
import { toast } from 'react-toastify';
const ItemsCrudOperations = ({ isEditMode, itemDetails, onClose, onRefresh,rowData}) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formDetails, setFormDetails] = useState(itemDetails);
  const [regions, setRegions] = useState([]); // State to hold dropdown options
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return formDetails.StateName && formDetails.Description && formDetails.SortOrder && formDetails.RegionID;
  };

  // const handleSubmit = async () => {
  //   if (validateForm()) {
  //     const url = isEditMode
  //       ? 'http://192.168.168.133:90/mst/editstate'
  //       : 'http://192.168.168.133:90/mst/addstate';

  //     try {
  //       const response = await axios.post(url, formDetails, {
  //         headers: { 'Content-Type': 'application/json' },
  //       });

  //       if (response.status >= 200 && response.status < 300) {
  //         setShowSuccessModal(true);
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
  //     setErrorMessage('Please fill all fields,, including Region.');
  //     setShowErrorModal(true);
  //   }
  // };
  const handleSubmit = async () => {
    if (validateForm()) {
      const url = isEditMode
        ? `${apiUrl}/editstate`
        : `${apiUrl}/addstate`;

      try {
        if (!Array.isArray(rowData)) {
          console.error("rowData is not an array or is undefined", rowData);
          toast.error("Row data is not available.");
          return; // Exit early if rowData is undefined or not an array
        }
        let isDuplicate = 0;
        if (isEditMode) {
          const tmpEditData = rowData.filter((itm) => {
            return itm.ZoneID !== itemDetails.StateID && itm.StateName === formDetails.StateName
          });
          isDuplicate = tmpEditData?.length > 0 ? 1 : 0;
        } else {
          const tmpData = rowData.filter((itm) => {
            return itm.StateName === formDetails.StateName
          });
          isDuplicate = tmpData?.length > 0 ? 1 : 0;
        }
        if (isDuplicate === 1) {
          toast.error("state name already exists!");
        } else {
          const response = await axios.post(url, formDetails, {
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.status >= 200 && response.status < 300) {
            // setShowSuccessModal(true);
            toast.success(isEditMode ? 'state successfully updated!' : 'state successfully created!');
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
        var url = `${apiUrl}/searchstate/` + itemDetails.StateID;
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
    // else
    // {
    //   fetchZones();
    // }
  }, [isEditMode]);


  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get(`${apiUrl}/getregions`); // Replace with your API endpoint
        setRegions(response.data); // Assuming response.data is an array of regions
      } catch (error) {
        setErrorMessage('Failed to fetch regions');
        setShowErrorModal(true);
      }
    };
    // if (isEditMode) {
      fetchRegions();
    // }
  }, []);

  // useEffect(() => {
  //   const fetchZones = async () => {
  //     try {
  //       var url = 'http://192.168.168.133:90/mst/searchstate/' + itemDetails.StateID;
  //       const response = await axios.get(url); // Replace with your API endpoint
      
  //       setFormDetails(response.data[0]); // Assuming response.data is an array of zones
        
  //     } catch (error) {
  //       setErrorMessage('Failed to fetch zones');
  //       setFormDetails(itemDetails);
  //     }
  //   };

  //   fetchZones();
  // }, [isEditMode]);

  return (
    <CCard>
      <CCardHeader style={{ backgroundColor: '#040430', color: 'white' }}>
        <h5>{isEditMode ? 'Edit State' : 'Add State'}</h5>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel htmlFor="StateName">State Name:</CFormLabel>
            <CFormInput
              type="text"
              id="StateName"
              name="StateName"
              value={formDetails.StateName || ''}
              onChange={handleChange}
              placeholder="Enter state name"
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
            <CFormLabel htmlFor="RegionID">Region:</CFormLabel>
            <CFormSelect
              id="RegionID"
              name="RegionID"
              value={formDetails.RegionID || ''}
              onChange={handleChange}
            >
              <option value="">Select a region</option>
              {regions.map((region) => (
                <option key={region.RegionID} value={region.RegionID}>
                  {region.RegionName}
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
