'use client'
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
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

// Sample data and columns for the table
const data = [
  { id: 1, name: 'AKHILESH KUMAR', position: 'END USER / CONSUMER' },
  { id: 2, name: 'Akram Khan', position: 'END USER / CONSUMER' },
  // Add more sample data as needed
];

const columns = [
  { name: 'Name', selector: row => row.name, sortable: true },
  { name: 'Position', selector: row => row.position, sortable: true },
];

const customStyles = {
  headCells: {
    style: { fontWeight: 'bold', fontSize: '0.80rem' }, // Adjust font size here
  },
  cells: {
    style: { fontSize: '0.80rem' }, // Adjust font size for table cells
  },
};

// NotificationForm Component
const NotificationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    iconImage: null,
    noticeType: 'Product',
    validStatus: 'Y',
    scheduleDate: '',
    selectedUsers: '',
  });

  const [formErrors, setFormErrors] = useState({
    title: '',
    text: '',
    iconImage: '',
    noticeType: '',
    validStatus: '',
    scheduleDate: '',
    selectedUsers: '',
  });

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    const errors = {};
    let hasError = false;

    if (!formData.title) {
      errors.title = 'Notification Title is required';
      hasError = true;
    }
    if (!formData.text) {
      errors.text = 'Notification Text is required';
      hasError = true;
    }

    // File validation
    if (!formData.iconImage) {
      errors.iconImage = 'Icon Image is required';
      hasError = true;
    } else {
      const file = formData.iconImage;
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!allowedTypes.includes(file.type)) {
        errors.iconImage = 'Only JPEG, PNG, and GIF files are allowed';
        hasError = true;
      } else if (file.size > maxSize) {
        errors.iconImage = 'File size should not exceed 2MB';
        hasError = true;
      }
    }

    if (!formData.noticeType) {
      errors.noticeType = 'Notice Type is required';
      hasError = true;
    }
    if (!formData.validStatus) {
      errors.validStatus = 'Valid Status is required';
      hasError = true;
    }
    if (!formData.scheduleDate) {
      errors.scheduleDate = 'Notification Schedule Date is required';
      hasError = true;
    }
    if (!formData.selectedUsers) {
      errors.selectedUsers = 'Selected Users is required';
      hasError = true;
    }

    setFormErrors(errors);

    if (!hasError) {
      const { iconImage, ...rest } = formData;
      const submitData = new FormData();
      Object.keys(rest).forEach(key => submitData.append(key, rest[key]));
      if (iconImage) submitData.append('iconImage', iconImage);
      onSubmit(submitData);
    }
  };

  return (
    <CCard className="mb-4 w-100 h-100">
      <CCardHeader style={{backgroundColor:"#040430", color:'white'}}> <strong>Notification Form</strong> </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit} style={{ fontSize: '0.80rem' }}>
          <CRow className="mb-4">
            {[
              { id: 'title', label: 'Notification Title', type: 'text', placeholder: 'Notification title', required: true },
              { id: 'text', label: 'Notification Text', type: 'textarea', placeholder: 'Notification text', required: true },
              { id: 'iconImage', label: 'Icon Image', type: 'file', accept: 'image/*', required: true },
              { id: 'noticeType', label: 'Notice Type', type: 'select', options: ['Product', 'Product list', 'File', 'URL', 'Menu', 'Banner', 'Order', 'Category', 'Collection'], placeholder: 'Select notice type', required: true },
              { id: 'validStatus', label: 'Valid Status', type: 'select', options:['Y', 'N'], placeholder: 'Select status', required: true },
              { id: 'scheduleDate', label: 'Notification Schedule Date', type: 'date', required: true },
              { id: 'selectedUsers', label: 'Selected Users', type: 'textarea', placeholder: 'Selected users', required: true },
            ].map(({ id, label, type, options, accept, placeholder, required }) => (
              <CCol md={6} key={id} className="mb-3">
                <CFormLabel htmlFor={id}>
                  {label} {required && <span style={{ color: 'red' }}>*</span>}
                </CFormLabel>
                {type === 'select' ? (
                  <CFormSelect 
                    id={id} 
                    value={formData[id]} 
                    onChange={handleChange} 
                    style={{ fontSize: '0.80rem', padding: '0.25rem 0.5rem' }}>
                    <option value="">{placeholder || 'Select...'}</option>
                    {options.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </CFormSelect>
                ) : type === 'textarea' ? (
                  <CFormInput id={id} as="textarea" rows="4" value={formData[id]} onChange={handleChange} placeholder={placeholder} style={{ fontSize: '0.80rem', padding: '0.25rem 0.5rem' }} />
                ) : (
                  <CFormInput id={id} type={type} accept={accept} onChange={handleChange} placeholder={placeholder} style={{ fontSize: '0.80rem', padding: '0.25rem 0.5rem' }} />
                )}
                {formErrors[id] && <div style={{ color: 'red', marginTop: '0.25rem' }}>{formErrors[id]}</div>}
              </CCol>
            ))}
          </CRow>
          <CCol xs={12} className="text-start mt-3">
            <CButton type="submit" style={{ fontSize: '0.80rem', backgroundColor: '#040430', borderColor: '#040430', color: 'white', padding: '0.25rem 0.5rem' }}>
              Submit
            </CButton>
          </CCol>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

// Combined Component
const CombinedComponent = () => {
  const [filteredData, setFilteredData] = useState(data);
  const [search, setSearch] = useState('');

  const handleFormSubmit = (formData) => {
    console.log('Form Submitted:', formData);
    // Perform form submission logic
  };

  useEffect(() => {
    const result = data.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(result);
  }, [search]);

  return (
    <CRow className="g-0" style={{ height: '100%' }}>
      <CCol md={6} className="d-flex">
        <NotificationForm onSubmit={handleFormSubmit} />
      </CCol>

      <CCol md={6} className="d-flex">
        <CCard className="mb-4 w-100 h-100">
          <CCardHeader style={{backgroundColor:"#040430", color:'white'}}> <strong>Data Table</strong> </CCardHeader>
          <CCardBody>
            <div className="mb-4">
              <CFormLabel htmlFor="search" style={{ fontSize: '0.80rem' }}>Search:</CFormLabel>
              <CFormInput id="search" type="text" value={search} onChange={(e) => setSearch(e.target.value)} style={{ fontSize: '0.80rem', padding: '0.25rem 0.5rem' }} />
            </div>
            <DataTable
              columns={columns}
              data={filteredData}
              pagination
              customStyles={customStyles}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default CombinedComponent;