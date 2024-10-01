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
          <textarea id={id} value={value} onChange={onChange} placeholder={placeholder} style={{ fontSize: '0.80rem' }} className="form-control" />
        ) : type === 'select' ? (
          <CFormSelect id={id} value={value} onChange={onChange} style={{ fontSize: '0.80rem' }}>
            <option value="">{`Select ${label}`}</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </CFormSelect>
        ) : type === 'file' ? (
          <CFormInput type={type} id={id} onChange={onChange} style={{ fontSize: '0.80rem' }} />
        ) : (
          <CFormInput type={type} id={id} value={value} onChange={onChange} placeholder={placeholder} style={{ fontSize: '0.80rem' }} />
        )}
        {message && <div style={{ color: 'red', marginTop: '0.25rem', fontSize: '0.80rem' }}>{message}</div>}
      </CCol>
    </CRow>
  </CCol>
);

const FormWithoutAccordion = () => {
  const [formData, setFormData] = useState({
    quizName: '',
    quizDescription: '',
    fromDate: '',
    toDate: '',
    quizMultiAttempt: '',
    validStatus: '',
    uploadFile: null
  });

  const [formMessages, setFormMessages] = useState({
    quizName: '',
    quizDescription: '',
    fromDate: '',
    toDate: '',
    quizMultiAttempt: '',
    validStatus: '',
    uploadFile: ''
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

    // Validate form
    const newMessages = {};
    let hasError = false;

    if (!formData.quizName) {
      newMessages.quizName = 'Quiz Name is required';
      hasError = true;
    }
    if (!formData.quizDescription) {
      newMessages.quizDescription = 'Quiz Description is required';
      hasError = true;
    }
    if (!formData.quizMultiAttempt) {
      newMessages.quizMultiAttempt = 'Quiz Multi Attempt is required';
      hasError = true;
    }
    if (!formData.validStatus) {
      newMessages.validStatus = 'Valid Status is required';
      hasError = true;
    }
    
    // File validation
    if (!formData.uploadFile) {
      newMessages.uploadFile = 'Upload File is required';
      hasError = true;
    } else {
      const file = formData.uploadFile;
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!allowedTypes.includes(file.type)) {
        newMessages.uploadFile = 'Only JPEG, PNG, and GIF files are allowed';
        hasError = true;
      } else if (file.size > maxSize) {
        newMessages.uploadFile = 'File size should not exceed 2MB';
        hasError = true;
      }
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
            <strong>Add New Quiz</strong>
          </CCardHeader> */}
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow>
                {[
                  { id: 'quizName', label: 'Quiz Name', placeholder: 'Quiz Name', required: true, message: formMessages.quizName },
                  { id: 'quizDescription', label: 'Quiz Description', placeholder: 'Quiz Description', type: 'textarea', required: true, message: formMessages.quizDescription },
                  { id: 'fromDate', label: 'From Date', type: 'date', message: formMessages.fromDate },
                  { id: 'toDate', label: 'To Date', type: 'date', message: formMessages.toDate },
                  {
                    id: 'quizMultiAttempt',
                    label: 'Quiz Multi Attempt',
                    type: 'select',
                    options: [
                      { value: 'yes', label: 'Yes' },
                      { value: 'no', label: 'No' }
                    ],
                    required: true,
                    message: formMessages.quizMultiAttempt
                  },
                  {
                    id: 'validStatus',
                    label: 'Valid Status',
                    type: 'select',
                    options: [
                      { value: 'yes', label: 'Yes' },
                      { value: 'no', label: 'No' }
                    ],
                    required: true,
                    message: formMessages.validStatus
                  },
                  { id: 'uploadFile', label: 'Upload File', type: 'file', required: true, message: formMessages.uploadFile }
                ].map((field, index) => (
                  <FormField
                    key={index}
                    id={field.id}
                    label={field.label}
                    type={field.type || 'text'}
                    options={field.options || []}
                    value={field.type === 'file' ? undefined : formData[field.id]}  // Avoid setting value for file inputs
                    onChange={handleChange}
                    required={field.required || false}
                    message={field.message || ''}
                    placeholder={field.placeholder || ''}
                  />
                ))}
              </CRow>
              <CCol xs={12} className="text-start mt-3">
                <CButton type="submit" style={{ backgroundColor: '#040430', borderColor: '#040430',color:'white',fontSize:'0.80rem', padding: '0.25rem 0.5rem' }}>Submit</CButton>
              </CCol>
            </CForm>
          </CCardBody>
        {/* </CCard> */}
      </CCol>
    </CRow>
  );
};

export default FormWithoutAccordion;
