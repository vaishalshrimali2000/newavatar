'use client'
import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormSelect,
  CFormLabel,
  CButton,
  CInputGroup,
  CInputGroupText,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormInput
} from '@coreui/react';

// Reusable FormField component for select inputs
const FormField = ({ id, label, options, value, onChange, showCheckbox, onCheckboxChange }) => (
  <CCol md={6} className="mb-3">
    <CInputGroup className="align-items-center" style={{ fontSize: '0.80rem' }}>
      {showCheckbox && (
        <CInputGroupText style={{ fontSize: '0.80rem' }}>
          <input type="checkbox" onChange={onCheckboxChange} style={{ transform: 'scale(0.80)' }} />
        </CInputGroupText>
      )}
      <CFormLabel htmlFor={id} className="me-3 mb-0" style={{ fontSize: '0.80rem' }}>
        {label}
      </CFormLabel>
      <CFormSelect id={id} value={value} onChange={onChange} style={{ fontSize: '0.80rem' }}>
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </CFormSelect>
    </CInputGroup>
  </CCol>
);

const SimpleForm = () => {
  const [formData, setFormData] = useState({
    allUsers: '',
    allComplexities: '',
  });

  const [tableData, setTableData] = useState([
    { id: 1, grams: 500, labourValue: 2000, labourType: 'Manual' },
    { id: 2, grams: 800, labourValue: 6000, labourType: 'Manual' }
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [editLabourValue, setEditLabourValue] = useState('');

  const allUsersOptions = [
    { value: 'user1', label: 'User 1' },
    { value: 'user2', label: 'User 2' },
    { value: 'user3', label: 'User 3' },
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      // Select all values in the dropdown
      const allValues = allUsersOptions.map(option => option.value).join(',');
      setFormData(prevData => ({
        ...prevData,
        allUsers: allValues,
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        allUsers: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Perform further actions like sending data to the server
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditLabourValue(tableData[index].labourValue);
  };

  const handleLabourValueChange = (e) => {
    setEditLabourValue(e.target.value);
  };

  const handleUpdate = () => {
    const updatedTableData = [...tableData];
    updatedTableData[editIndex].labourValue = editLabourValue;
    setTableData(updatedTableData);
    setEditIndex(null);
    setEditLabourValue('');
    alert('Labour Value updated successfully!');
  };

  return (
    <CRow>
      <CCol xs={12}>
        {/* <CCard className="mb-4">
          <CCardHeader style={{backgroundColor:"#040430", color:'white'}}>
            <strong>Frenchise Labour On Coin Complexity</strong>
          </CCardHeader> */}
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow>
                <FormField
                  id="allUsers"
                  label="All Users"
                  value={formData.allUsers}
                  onChange={handleChange}
                  onCheckboxChange={handleCheckboxChange}
                  options={allUsersOptions}
                  showCheckbox={true}
                />
                
                <FormField
                  id="allComplexities"
                  label="All Complexities"
                  value={formData.allComplexities}
                  onChange={handleChange}
                  options={[
                    { value: 'complex1', label: 'Complexity 1' },
                    { value: 'complex2', label: 'Complexity 2' },
                  ]}
                  showCheckbox={false}
                />
              </CRow>
              <CButton type="submit" color="primary" style={{ fontSize: '0.80rem' }}>
                Submit
              </CButton>
            </CForm>
            <CTable className="mt-4">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col" style={{ fontSize: '0.80rem' }}>Sr No.</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ fontSize: '0.80rem' }}>Grams</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ fontSize: '0.80rem' }}>Labour Value (₹)</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ fontSize: '0.80rem' }}>Labour Type</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ fontSize: '0.80rem' }}>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {tableData.map((row, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell style={{ fontSize: '0.80rem' }}>{row.id}</CTableDataCell>
                    <CTableDataCell style={{ fontSize: '0.80rem' }}>{row.grams}</CTableDataCell>
                    <CTableDataCell style={{ fontSize: '0.80rem' }}>
                      {editIndex === index ? (
                        <CFormInput
                          type="number"
                          value={editLabourValue}
                          onChange={handleLabourValueChange}
                          style={{ fontSize: '0.80rem' }}
                        />
                      ) : (
                        `₹${row.labourValue}`
                      )}
                    </CTableDataCell>
                    <CTableDataCell style={{ fontSize: '0.80rem' }}>{row.labourType}</CTableDataCell>
                    <CTableDataCell>
                      {editIndex === index ? (
                        <CButton color="success" onClick={handleUpdate} style={{ fontSize: '0.80rem',padding: '0.25rem 0.5rem' }}>
                          Update
                        </CButton>
                      ) : (
                        <CButton color="warning" onClick={() => handleEditClick(index)} style={{ fontSize: '0.80rem',padding: '0.25rem 0.5rem' }}>
                          Edit
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        {/* </CCard> */}
      </CCol>
    </CRow>
  );
};

export default SimpleForm;