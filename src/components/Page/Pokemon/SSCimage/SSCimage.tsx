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
const FormField = ({ id, label, type = 'text', options = [], value, onChange, placeholder = '', required = false, message = '' }) => (
  <CCol md={6} className="mb-3" style={{ fontSize: '0.80rem' }}>
    <CRow className="align-items-center">
      <CCol md={4}>
        <CFormLabel htmlFor={id} style={{ fontSize: '0.80rem' }}>
          {label} {required && <span style={{ color: 'red' }}>*</span>}
        </CFormLabel>
      </CCol>
      <CCol md={8}>
        {type === 'textarea' ? (
          <textarea id={id} value={value} onChange={onChange} placeholder={placeholder} className="form-control" style={{ fontSize: '0.80rem' }} />
        ) : type === 'select' ? (
          <CFormSelect id={id} value={value} onChange={onChange} style={{ fontSize: '0.80rem' }}>
            <option value="">Select {label}</option>
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
    Day: '',
    image: '',
    Status: ''
  });

  const [formMessages, setFormMessages] = useState({
    Day: '',
    image: '',
    Status: ''
  });

  const handleChange = useCallback((e) => {
    const { id, value, type, files } = e.target;

    if (type === 'file') {
      if (files.length > 0) {
        const file = files[0];
        if (file.size > 3 * 1024 * 1024) { // 3 MB
          setFormMessages(prevMessages => ({
            ...prevMessages,
            [id]: 'Please provide a file smaller than 3 MB'
          }));
          return;
        } else {
          setFormMessages(prevMessages => ({
            ...prevMessages,
            [id]: ''
          }));
        }
        setFormData(prevData => ({
          ...prevData,
          [id]: file
        }));
      }
    } else {
      setFormData(prevData => ({
        ...prevData,
        [id]: value
      }));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMessages = {};
    let hasError = false;

    if (!formData.Day) {
      newMessages.Day = 'Day is required';
      hasError = true;
    }
    if (!formData.image) {
      newMessages.image = 'Image is required';
      hasError = true;
    }
    if (!formData.Status) {
      newMessages.Status = 'Status is required';
      hasError = true;
    }

    setFormMessages(newMessages);

    if (!hasError) {
      // Log form data
      console.log('Form Data:');
      console.log('Day:', formData.Day);
      console.log('Status:', formData.Status);

      // Handle file data (if needed)
      if (formData.image) {
        console.log('Image File:', formData.image);
        // Optional: Display the image preview
        const imageUrl = URL.createObjectURL(formData.image);
        console.log('Image URL:', imageUrl);
      }

      // You can send formData to a server or perform other actions here
    }
  };

  // Generate options for days from 1 to 31
  const dayOptions = Array.from({ length: 31 }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString()
  }));

  return (
    <CRow>
      <CCol xs={12}>
        {/* <CCard className="mb-4">
          <CCardHeader style={{backgroundColor:"#040430", color:'white'}}>
            <strong>Add Place</strong> 
          </CCardHeader> */}
          <CCardBody>
            <CForm onSubmit={handleSubmit} style={{ fontSize: '0.80rem' }}>
              <CRow>
                {[
                  {
                    id: 'Day',
                    label: 'Day',
                    type: 'select',
                    options: dayOptions,
                    required: true,
                    message: formMessages.Day
                  },
                  {
                    id: 'image',
                    label: 'Image',
                    type: 'file',
                    required: true,
                    message: formMessages.image
                  },
                  {
                    id: 'Status',
                    label: 'Status',
                    type: 'select',
                    options: [
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' }
                    ],
                    required: true,
                    message: formMessages.Status
                  }
                ].map((field, index) => (
                  <FormField
                    key={index}
                    id={field.id}
                    label={field.label}
                    type={field.type || 'text'}
                    options={field.options || []}
                    value={field.type === 'file' ? undefined : formData[field.id]} // Avoid setting value for file inputs
                    onChange={handleChange}
                    placeholder={field.placeholder || ''}
                    required={field.required || false}
                    message={field.message || ''}
                  />
                ))}
              </CRow>
              <CCol xs={12} className="text-start mt-3">
                  <CButton type="submit" style={{ backgroundColor: '#040430', borderColor: '#040430',color:'white', fontSize: '0.80rem',padding: '0.25rem 0.5rem' }}>Submit</CButton>
                </CCol>
            </CForm>
          </CCardBody>
        {/* </CCard> */}
      </CCol>
    </CRow>
  );
};

export default FormWithoutAccordion;