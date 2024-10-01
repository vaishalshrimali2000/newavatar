'use client'
import React, { useState, useCallback } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CFormSelect
} from '@coreui/react';

// Unified FormField component for input, textarea, and select
const FormField = ({ id, label, type = 'text', options = [], value, placeholder, onChange, required = false, message = '' }) => (
  <CCol md={6} className="mb-3">
    <CRow className="align-items-center">
      <CCol md={4}>
        <CFormLabel htmlFor={id} style={{ fontSize: '0.80rem' }}>
          {label} {required && <span style={{ color: 'red' }}>*</span>}
        </CFormLabel>
      </CCol>
      <CCol md={8}>
        {type === 'textarea' ? (
          <textarea 
            id={id} 
            value={value} 
            onChange={onChange} 
            placeholder={placeholder} 
            className="form-control" 
            style={{ fontSize: '0.80rem', padding: '0.4rem' }} 
          />
        ) : type === 'select' ? (
          <CFormSelect 
            id={id} 
            value={value} 
            onChange={onChange} 
            style={{ fontSize: '0.80rem', padding: '0.4rem' }}
          >
            <option value="">Select {label}</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </CFormSelect>
        ) : (
          <CFormInput 
            type={type} 
            id={id} 
            value={value} 
            onChange={onChange} 
            placeholder={placeholder} 
            style={{ fontSize: '0.80rem', padding: '0.4rem' }}
          />
        )}
        {message && <div style={{ color: 'red', marginTop: '0.25rem', fontSize: '0.70rem' }}>{message}</div>}
      </CCol>
    </CRow>
  </CCol>
);

const FormWithoutAccordion = () => {
  const [formData, setFormData] = useState({
    user: '',
    parcelDate: '',
    parcelNo: '',
    parcelStatus: '',
    parcelValidStatus: '',
    remarks: ''
  });

  const [formMessages, setFormMessages] = useState({
    user: '',
    parcelDate: '',
    parcelNo: '',
    parcelStatus: '',
    parcelValidStatus: '',
    remarks: ''
  });

  const handleChange = useCallback((e) => {
    const { id, value, type, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: type === 'file' ? files[0] : value
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMessages = {};
    let hasError = false;

    if (!formData.user) {
      newMessages.user = 'User selection is required';
      hasError = true;
    }
    if (!formData.parcelDate) {
      newMessages.parcelDate = 'Parcel Date is required';
      hasError = true;
    }
    if (!formData.parcelNo) {
      newMessages.parcelNo = 'Parcel No is required';
      hasError = true;
    }
    if (!formData.parcelStatus) {
      newMessages.parcelStatus = 'Parcel Status is required';
      hasError = true;
    }
    if (!formData.parcelValidStatus) {
      newMessages.parcelValidStatus = 'Parcel Valid Status is required';
      hasError = true;
    }

    setFormMessages(newMessages);

    if (!hasError) {
      console.log(JSON.stringify(formData, null, 2));
      // You can send formData to a server or perform other actions here
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        {/* <CCard className="mb-4">
          <CCardHeader style={{backgroundColor:"#040430", color:'white'}}>
            <strong>Add Parcel</strong>
          </CCardHeader> */}
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow>
                {[
                  {
                    id: 'user',
                    label: 'User',
                    type: 'select',
                    options: [
                      { value: 'yes', label: 'Yes' },
                      { value: 'no', label: 'No' }
                    ],
                    placeholder: 'Select User',
                    required: true,
                    message: formMessages.user
                  },
                  {
                    id: 'parcelDate',
                    label: 'Parcel Date',
                    type: 'date',
                    required: true,
                    message: formMessages.parcelDate
                  },
                  {
                    id: 'parcelNo',
                    label: 'Parcel No',
                    placeholder: 'Parcel No',
                    required: true,
                    message: formMessages.parcelNo
                  },
                  {
                    id: 'parcelStatus',
                    label: 'Parcel Status',
                    type: 'select',
                    options: [
                      { value: 'open', label: 'Open' },
                      { value: 'close', label: 'Close' }
                    ],
                    placeholder: 'Select Parcel Status',
                    required: true,
                    message: formMessages.parcelStatus
                  },
                  {
                    id: 'parcelValidStatus',
                    label: 'Parcel Valid Status',
                    type: 'select',
                    options: [
                      { value: 'yes', label: 'Yes' },
                      { value: 'no', label: 'No' }
                    ],
                    placeholder: 'Select Parcel Valid Status',
                    required: true,
                    message: formMessages.parcelValidStatus
                  },
                  {
                    id: 'remarks',
                    label: 'Remarks',
                    type: 'textarea',
                    placeholder: 'Any remarks',
                    message: formMessages.remarks
                  }
                ].map((field, index) => (
                  <FormField
                    key={index}
                    id={field.id}
                    label={field.label}
                    type={field.type || 'text'}
                    options={field.options || []}
                    value={formData[field.id]}
                    onChange={handleChange}
                    placeholder={field.placeholder || ''}
                    required={field.required || false}
                    message={field.message || ''}
                  />
                ))}
              </CRow>
              <CCol xs={12} className="text-start mt-3">
                <CButton 
                  type="submit" 
                  style={{ 
                    backgroundColor: '#040430', 
                    borderColor: '#040430', 
                    color: 'white', 
                    fontSize: '0.80rem', 
                    padding: '0.25rem 0.5rem' 
                  }}>
                  Submit
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        {/* </CCard> */}
      </CCol>
    </CRow>
  );
};

export default FormWithoutAccordion;