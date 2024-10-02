import React, { useState } from 'react';
import { CButton, CFormLabel, CFormInput, CCard, CCardBody, CCardHeader, CModal, CModalBody, CModalHeader, CModalTitle, CModalFooter, CFormTextarea, CRow, CCol } from '@coreui/react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ItemsCrudOperations = ({ isEditMode, itemDetails, onClose, onRefresh, rowData }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formDetails, setFormDetails] = useState(itemDetails);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return formDetails.DsgName && formDetails.Remarks ;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const url = isEditMode
        ? `${apiUrl}/editdesigner`
        : `${apiUrl}/adddesigner`;

      try {
        let isDuplicate = 0;
        if (isEditMode) {
          const tmpEditData = rowData.filter((itm) => {
            console.log("edit mode : " + itm.DsgID !== itemDetails.DsgID && itm.DsgName === formDetails.DsgName);
            
            return itm.DsgID !== itemDetails.DsgID && itm.DsgName === formDetails.DsgName
          });
          isDuplicate = tmpEditData?.length > 0 ? 1 : 0;
        } else {
          const tmpData = rowData.filter((itm) => {
            return itm.DsgName === formDetails.DsgName
          });
          isDuplicate = tmpData?.length > 0 ? 1 : 0;
        }
        if (isDuplicate === 1) {
          toast.error("CAD Designer name already exists!");
        } else {
          const response = await axios.post(url, formDetails, {
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.status >= 200 && response.status < 300) {
            // setShowSuccessModal(true);
            toast.success(isEditMode ? 'CAD Designer successfully updated!' : 'CAD Designer successfully created!');
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
