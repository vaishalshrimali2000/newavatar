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
const FormField = ({ id, label, type = 'text', options = [], value, onChange, required, placeholder }) => (
  <CCol md={6} className="mb-3">
    <CRow className="align-items-center">
      <CCol md={4}>
        <CFormLabel htmlFor={id}>
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
          />
        ) : type === 'select' ? (
          <CFormSelect id={id} value={value} onChange={onChange}>
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
          />
        )}
      </CCol>
    </CRow>
  </CCol>
);

const FormWithoutAccordion = () => {
  const [formData, setFormData] = useState({
    Diamondfield: '',
    Diamondvalue: '',
    Status: ''
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
    console.log(JSON.stringify(formData, null, 2));
    // You can send formData to a server or perform other actions here
  };

  return (
    <CRow>
      <CCol xs={12}>
        {/* <CCard className="mb-4">
          <CCardHeader style={{backgroundColor:"#040430", color:'white'}}>
            <strong>Add New Diamond Master</strong>
          </CCardHeader> */}
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow>
                {[
                  {
                    id: 'Diamondfield',
                    label: 'Diamond Field',
                    required: true,
                    placeholder: 'Diamond Field'
                  },
                  {
                    id: 'Diamondvalue',
                    label: 'Diamond Value',
                    required: true,
                    placeholder: 'Diamond Value'
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
                ].map((field, index) => (
                  <FormField
                    key={index}
                    id={field.id}
                    label={field.label}
                    type={field.type || 'text'}
                    options={field.options || []}
                    value={formData[field.id]}
                    onChange={handleChange}
                    required={field.required || false}
                    placeholder={field.placeholder || ''}
                  />
                ))}
              </CRow>
              <CCol xs={12} className="text-start mt-3">
                  <CButton type="submit" style={{ backgroundColor: '#040430', borderColor: '#040430',color:'white',padding: '0.25rem 0.5rem' }}>Submit</CButton>
                </CCol>
            </CForm>
          </CCardBody>
        {/* </CCard> */}
      </CCol>
    </CRow>
  );
};

export default FormWithoutAccordion;