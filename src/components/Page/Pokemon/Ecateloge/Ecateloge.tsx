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
const FormField = ({ id, label, type = 'text', options = [], value, onChange, required, placeholder, message }) => (
  <CCol md={6} className="mb-3">
    <CRow className="align-items-center">
      <CCol md={4}>
        <CFormLabel
          htmlFor={id}
          style={{ fontSize: '0.80rem' }} // Reduce label font size
        >
          {label}
          {required && <span style={{ color: 'red' }}> *</span>}
        </CFormLabel>
      </CCol>
      <CCol md={8}>
        {type === 'textarea' ? (
          <textarea
            id={id}
            value={value}
            onChange={onChange}
            className="form-control"
            placeholder={placeholder}
            style={{ fontSize: '0.80rem', padding: '0.4rem' }} // Reduce textarea font size and padding
          />
        ) : type === 'select' ? (
          <CFormSelect
            id={id}
            value={value}
            onChange={onChange}
            style={{ fontSize: '0.80rem', padding: '0.4rem' }} // Reduce select font size and padding
          >
            <option value="">Select {label}</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </CFormSelect>
        ) : type === 'file' ? (
          <CFormInput
            type={type}
            id={id}
            onChange={onChange}
            style={{ fontSize: '0.80rem', padding: '0.4rem' }} // Reduce file input font size and padding
          />
        ) : (
          <CFormInput
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={{ fontSize: '0.80rem', padding: '0.4rem' }} // Reduce input font size and padding
          />
        )}
        {message && <div style={{ color: 'red', marginTop: '0.25rem', fontSize: '0.75rem' }}>{message}</div>}
      </CCol>
    </CRow>
  </CCol>
);

const FormWithoutAccordion = () => {
  const [formData, setFormData] = useState({
    Catelogename: '',
    Catelogedescription: '',
    Status: '',
    uploadfile: null
  });

  const [formMessages, setFormMessages] = useState({
    Catelogename: '',
    Catelogedescription: '',
    Status: '',
    uploadfile: ''
  });

  const handleChange = useCallback((e) => {
    const { id, value, type, files } = e.target;
    
    setFormData(prevData => ({
      ...prevData,
      [id]: type === 'file' ? (files.length > 0 ? files[0] : null) : value
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMessages = {};
    let hasError = false;

    if (!formData.Catelogename) {
      newMessages.Catelogename = 'Cateloge Name is required';
      hasError = true;
    }
    if (!formData.Catelogedescription) {
      newMessages.Catelogedescription = 'Cateloge Description is required';
      hasError = true;
    }
    if (!formData.uploadfile) {
      newMessages.uploadfile = 'Upload File is required';
      hasError = true;
    } else {
      const file = formData.uploadfile;
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 2 * 1024 * 1024;

      if (!allowedTypes.includes(file.type)) {
        newMessages.uploadfile = 'Only JPEG, PNG, and GIF files are allowed';
        hasError = true;
      } else if (file.size > maxSize) {
        newMessages.uploadfile = 'File size should not exceed 2MB';
        hasError = true;
      }
    }

    setFormMessages(newMessages);

    if (!hasError) {
      console.log(JSON.stringify(formData, null, 2));
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        {/* <CCard className="mb-4">
          <CCardHeader style={{backgroundColor:"#040430", color:'white'}}>
            <strong>Add New Cateloge</strong>
          </CCardHeader> */}
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow>
                {[
                  {
                    id: 'Catelogename',
                    label: 'Cateloge Name',
                    required: true,
                    placeholder: 'Cateloge Name',
                    message: formMessages.Catelogename
                  },
                  {
                    id: 'Catelogedescription',
                    label: 'Cateloge Description',
                    required: true,
                    placeholder: 'Cateloge Description',
                    message: formMessages.Catelogedescription
                  },
                  {
                    id: 'Status',
                    label: 'Valid Status',
                    type: 'select',
                    options: [
                      { value: 'Y', label: 'Y' },
                      { value: 'N', label: 'N' }
                    ]
                  },
                  {
                    id: 'uploadfile',
                    label: 'Upload File',
                    type: 'file',
                    required: true,
                    message: formMessages.uploadfile
                  },
                ].map((field, index) => (
                  <FormField
                    key={index}
                    id={field.id}
                    label={field.label}
                    type={field.type || 'text'}
                    options={field.options || []}
                    value={field.type === 'file' ? undefined : formData[field.id]}
                    onChange={handleChange}
                    required={field.required || false}
                    placeholder={field.placeholder || ''}
                    message={field.message || ''}
                  />
                ))}
              </CRow>
              <CCol xs={12} className="text-start mt-3">
                <CButton type="submit" style={{ backgroundColor: '#040430', borderColor: '#040430', color: 'white', fontSize: '0.80rem', padding: '0.25rem 0.5rem' }}>
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