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
  CFormSelect,
  CFormTextarea
} from '@coreui/react';

// Unified FormField component for input, textarea, and select
const FormField = ({ id, label, type = 'text', options = [], value, onChange, placeholder = '', required = false, message = '' }) => (
  <CCol md={6} className="mb-3">
    <CRow className="align-items-center">
      <CCol md={4}>
        <CFormLabel htmlFor={id} style={{ fontSize: '0.80rem' }}>
          {label} {required && <span style={{ color: 'red' }}>*</span>}
        </CFormLabel>
      </CCol>
      <CCol md={8}>
        {type === 'textarea' ? (
          <CFormTextarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={{ fontSize: '0.80rem' }}
          />
        ) : type === 'select' ? (
          <CFormSelect
            id={id}
            value={value}
            onChange={onChange}
            style={{ fontSize: '0.80rem' }}
          >
            <option value="">Select {label}</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </CFormSelect>
        ) : type === 'file' ? (
          <CFormInput
            type="file"
            id={id}
            onChange={onChange}
            style={{ fontSize: '0.80rem' }}
          />
        ) : (
          <CFormInput
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={{ fontSize: '0.80rem' }}
          />
        )}
        {message && <div style={{ color: 'red', marginTop: '0.25rem', fontSize: '0.80rem' }}>{message}</div>}
      </CCol>
    </CRow>
  </CCol>
);


const FormScreenSaver = () => {
  const [formData, setFormData] = useState({
    name: '',
    selectfiletype: '',
    selecttype: '',
    imagevideo: null,
    remarks: '',
    screentype: ''
  });

  const [formMessages, setFormMessages] = useState({
    selectfiletype: '',
    selecttype: '',
    imagevideo: '',
    remarks: '',
    screentype: ''
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

    if (!formData.selectfiletype) {
      newMessages.selectfiletype = 'Select File Type is required';
      hasError = true;
    }
    if (!formData.selecttype) {
      newMessages.selecttype = 'Select Type is required';
      hasError = true;
    }
    if (!formData.imagevideo) {
      newMessages.imagevideo = 'Upload Image/Video is required';
      hasError = true;
    }
    if (!formData.screentype) {
      newMessages.screentype = 'Screen Type is required';
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
        <CCard className="mb-4">
          <CCardHeader style={{backgroundColor:"#040430", color:'white'}}>
            <strong>Add Screen Saver</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow>
                {[
                  { id: 'name', label: 'Name', placeholder: 'Enter Name', required: true},
                  { id: 'selectfiletype', label: 'Select File Type', type: 'select', options: [
                    { value: 'pdf', label: 'PDF' },
                    { value: 'image', label: 'Image' }
                  ], required: true, message: formMessages.selectfiletype },
                  { id: 'selecttype', label: 'Select Type', type: 'select', options: [
                    { value: 'type1', label: 'Type 1' },
                    { value: 'type2', label: 'Type 2' }
                  ], required: true, message: formMessages.selecttype },
                  { id: 'imagevideo', label: 'Upload Image/Video', type: 'file', required: true, message: formMessages.imagevideo },
                  { id: 'remarks', label: 'Remarks', type: 'textarea', placeholder: 'Enter Remarks' },
                  { id: 'screentype', label: 'Screen Type', placeholder: 'Enter Screen Type', required: true, message: formMessages.screentype }
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
              <CButton type="submit" style={{ backgroundColor: '#040430', borderColor: '#040430', color: 'white', fontSize: '0.80rem',padding: '0.25rem 0.5rem' }}>Submit</CButton>
                </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default FormScreenSaver;
