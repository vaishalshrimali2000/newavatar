import React, { useEffect, useState } from 'react';
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
  CRow,
  CCol,
} from '@coreui/react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ItemsCrudOperations = ({ isEditMode, itemDetails, onClose, onRefresh, rowData }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formDetails, setFormDetails] = useState(itemDetails);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return formDetails.EmpName && formDetails.Email && formDetails.Department;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const url = isEditMode
        ? 'http://192.168.168.133:90/mst/editemail'
        : 'http://192.168.168.133:90/mst/addemail';

      try {
        let isDuplicate = 0;
        if (isEditMode) {
          const tmpEditData = rowData.filter((itm) => itm.ID !== itemDetails.ID && itm.Email === formDetails.Email);
          isDuplicate = tmpEditData.length > 0 ? 1 : 0;
        } else {
          const tmpData = rowData.filter((itm) => itm.Email === formDetails.Email);
          isDuplicate = tmpData.length > 0 ? 1 : 0;
        }

        if (isDuplicate === 1) {
          toast.error("Email already exists!");
        } else {
          const response = await axios.post(url, formDetails, {
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.status >= 200 && response.status < 300) {
            toast.success(isEditMode ? 'Email successfully updated!' : 'Email successfully created!');
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

  useEffect(() => {
    const fetchEmailDetails = async () => {
      try {
        const url = 'http://192.168.168.133:90/mst/getemaillist/' + itemDetails.ID;
        const response = await axios.get(url);
        setFormDetails(response.data[0]); // Assuming response.data contains the employee details
      } catch (error) {
        setErrorMessage('Failed to fetch email details');
        setFormDetails(itemDetails);
      }
    };

    if (isEditMode) {
      fetchEmailDetails();
    }
  }, [isEditMode, itemDetails]);

  return (
    <CCard>
      <CCardHeader style={{ backgroundColor: '#040430', color: 'white' }}>
        <h5>{isEditMode ? 'Edit Email' : 'Add Email'}</h5>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel htmlFor="EmpName">Employee Name:</CFormLabel>
            <CFormInput
              type="text"
              id="EmpName"
              name="EmpName"
              value={formDetails.EmpName || ''}
              onChange={handleChange}
              placeholder="Enter employee name"
            />
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="Email">Email:</CFormLabel>
            <CFormInput
              type="email"
              id="Email"
              name="Email"
              value={formDetails.Email || ''}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel htmlFor="Department">Department:</CFormLabel>
            <CFormInput
              type="text"
              id="Department"
              name="Department"
              value={formDetails.Department || ''}
              onChange={handleChange}
              placeholder="Enter department"
            />
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="IsActive">Active Status:</CFormLabel>
            <CFormInput
              type="checkbox"
              id="IsActive"
              name="IsActive"
              checked={formDetails.IsActive || false}
              onChange={(e) => setFormDetails((prev) => ({ ...prev, IsActive: e.target.checked }))}
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
          {isEditMode ? 'Email successfully updated!' : 'Email successfully created!'}
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
