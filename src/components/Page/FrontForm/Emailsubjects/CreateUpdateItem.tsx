import React, { useState, useEffect, useCallback } from 'react';
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
} from '@coreui/react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EmailSubjectForm = ({ isEditMode, itemDetails, onClose, onRefresh, rowData }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formDetails, setFormDetails] = useState(itemDetails);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validateForm = () => {
    if (!formDetails.SubjectName || !formDetails.Description || !formDetails.SortOrder) {
      toast.error('Please fill all required fields.');
      return false;
    }
    return true;
  };

  const handleSubmit = useCallback(async () => {
    if (validateForm()) {
      const url = isEditMode ? `${apiUrl}/editemailsubjects` : `${apiUrl}/addemailsubjects`;

      try {
        const isDuplicate = rowData.some((itm) =>
          isEditMode
            ? itm.SubjectID !== itemDetails.SubjectID && itm.SubjectName === formDetails.SubjectName
            : itm.SubjectName === formDetails.SubjectName
        );

        if (isDuplicate) {
          toast.error("Subject name already exists!");
        } else {
          const response = await axios.post(url, formDetails, {
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.status >= 200 && response.status < 300) {
            toast.success(isEditMode ? 'Email subject successfully updated!' : 'Email subject successfully created!');
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
      setShowErrorModal(true);
    }
  }, [formDetails, isEditMode, itemDetails, rowData, apiUrl, onClose, onRefresh]);

  useEffect(() => {
    if (isEditMode) {
      setFormDetails(itemDetails);
    }
  }, [isEditMode, itemDetails]);

  return (
    <CCard>
      <CCardHeader style={{ backgroundColor: '#040430', color: 'white' }}>
        <h5>{isEditMode ? 'Edit Subject' : 'Add Subject'}</h5>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel htmlFor="SubjectName">Subject Name:</CFormLabel>
            <CFormInput
              type="text"
              id="SubjectName"
              name="SubjectName"
              value={formDetails.SubjectName || ''}
              onChange={handleChange}
              placeholder="Enter subject name"
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
          <CCol md={12}>
            <CFormLabel htmlFor="Description">Description:</CFormLabel>
            <CFormTextarea
              id="Description"
              name="Description"
              value={formDetails.Description || ''}
              onChange={handleChange}
              placeholder="Enter description"
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
      {/* <CModal visible={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
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
      </CModal> */}

      {/* Error Modal */}
      {/* <CModal visible={showErrorModal} onClose={() => setShowErrorModal(false)}>
        <CModalHeader onClose={() => setShowErrorModal(false)}>
          <CModalTitle>Error</CModalTitle>
        </CModalHeader>
        <CModalBody>{errorMessage}</CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => setShowErrorModal(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal> */}
    </CCard>
  );
};

export default EmailSubjectForm;
