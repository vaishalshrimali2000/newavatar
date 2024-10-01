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

// Dropdown options
const SelectTerritory = [
  'D-12A', 'D-17A', 'D-22B', 'D-01', 'D-1A', 'D-1B', 'D-1C', 'D-02', 
  'D-2A', 'D-2B', 'D-2C', 'D-03', 'D-3A', 'D-3B', 'D-3C', 'D-04', 
  'D-4A', 'D-4B', 'D-4C', 'D-05', 'D-5A', 'D-5B', 'D-5C', 'D-5D', 
  'D-06', 'D-61', 'D-6A', 'D-6B', 'D-6C', 'D-07', 'D-7A', 'D-7B', 
  'D-7C', 'D-08', 'D-09', 'D-10B', 'D-10A', 'D-11', 'D-11A', 'D-11B', 
  'D-11C', 'D-12', 'D-13', 'D-13A', 'D-14', 'D-15', 'D-16', 'D-17', 
  'D-17B', 'D-18', 'D-18A', 'D-19', 'D-20', 'D-21', 'D-22', 'D-22A', 
  'D-23', 'D-24', 'D-25', 'D-26', 'D-27', 'D-28', 'D-28A', 'D-29', 
  'D-30', 'D-31', 'D-32', 'D-32A', 'D-33', 'D-33A', 'D-33B', 'D-34', 
  'D-35', 'D-36', 'D-37', 'D-37A', 'D-37B', 'D-38', 'D-39', 'D-40', 
  'D-41', 'D-42', 'D-43', 'D-44', 'D-45', 'D-46', 'D-47', 'D-48', 
  'D-49', 'D-50', 'D-51', 'D-52', 'D-54', 'D-55', 'D-56', 'D-57', 
  'D-58', 'Other', 'D-2D', 'D-62A', 'D-47A', 'D-64', 'D-3D', 'D-37C'
];

const SelectZone = ['ZONE 1', 'ZONE 2', 'ZONE 3', 'ZONE 4', 'ZONE 5', 'ZONE 6', 'ZONE 7', 'ZONE 8', 'ZONE 9', 'ZONE 10', 'ZONE 11', 'NA', 'ZONE 12'];

const SelectCommunity = ['Hinduism', 'Islam', 'Sikhism', 'Buddhism', 'Jainism', 'Christianity', 'Judaism', 'Other'];

const SelectPart = ['P1', 'P2', 'Part-1B', 'Part-2A', 'Part-2B', 'Part-3A', 'Part-3B', 'Part-3C', 'Part-4A', 'Part-4B', 'Part-5A', 'Part-5B', 'Part-5C'];

// Reusable FormField component with side-by-side label and input/select
const FormField = ({ id, label, type = 'text', value, onChange, options, placeholder, required = false, message }) => (
  <CCol md={6} className="mb-2">
    <CRow className="align-items-center">
      <CCol md={4}>
        <CFormLabel htmlFor={id} style={{ fontSize: '0.80rem' }}>
          {label}
          {required && <span style={{ color: 'red' }}> *</span>}
        </CFormLabel>
      </CCol>
      <CCol md={8}>
        {type === 'select' ? (
          <CFormSelect
            id={id}
            value={value}
            onChange={onChange}
            style={{ fontSize: '0.80rem', padding: '0.25rem 0.5rem' }}>
            <option value="">{placeholder || 'Select...'}</option>
            {options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </CFormSelect>
        ) : (
          <CFormInput
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder || ''}
            style={{ fontSize: '0.80rem', padding: '0.25rem 0.5rem' }}
          />
        )}
        {message && <div style={{ color: 'red', marginTop: '0.25rem', fontSize: '0.80rem' }}>{message}</div>}
      </CCol>
    </CRow>
  </CCol>
);

const AddUserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    birthDate: '',
    agreement: '',
    contactName: '',
    contactTitle: '',
    telephoneNo: '',
    email: '',
    gstNo: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    pincode: '',
    deviceSerialNo: '',
    deviceSecurityStatus: '',
    selectTerritoryArea: '',
    selectZone: '',
    latitude: '',
    longitude: '',
    reference: '',
    isStorePerson: '',
    outletCategory: '',
    productType: '',
    kyc: '',
    profileImage: null,
    selectmodel: '',
    selecttype: '',
    desktopImage: null,
    type: '',
    alterTitle: '',
    code: '',
    alterName: '',
    AlterContactNo: '',
    alterEmail: '',
    contact: '',
    remarks: '',
    defaultLanguage: '',
    community: '',
    selectPart: '',
    emrCustCode: '',
    aniversaryDate: '',
    joinDate: ''
  });

  const [formMessages, setFormMessages] = useState({
    name: '',
    SelectOrganization:'',
    Selecttype:'',
    SelectModel:'',
    SelectPrimaryContactName:'',
    selectTerritoryArea:'',
    selectZone:'',
    outletCategory:'',
    productType:''

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

    if (!formData.name) {
      newMessages.name = 'Name is required';
      hasError = true;
    }
    if (!formData.SelectOrganization) {
      newMessages.SelectOrganization = 'Select Organization is required';
      hasError = true;
    }
    if (!formData.Selecttype) {
      newMessages.Selecttype = 'Select type is required';
      hasError = true;
    }
    if (!formData.SelectModel) {
      newMessages.SelectModel = 'Select Model is required';
      hasError = true;
    }
    if (!formData.SelectPrimaryContactName) {
      newMessages.SelectPrimaryContactName = 'Select Primary Contact Name is required';
      hasError = true;
    }
    if (!formData.selectTerritoryArea) {
      newMessages.selectTerritoryArea = 'Select Territory Area is required';
      hasError = true;
    }
    if (!formData.selectZone) {
      newMessages.selectZone = 'Select Zone is required';
      hasError = true;
    }
    if (!formData.isStorePerson) {
      newMessages.isStorePerson = 'Is Store Person is required';
      hasError = true;
    }
    if (!formData.outletCategory) {
      newMessages.outletCategory = 'Outlet Category is required';
      hasError = true;
    }
    if (!formData.productType) {
      newMessages.productType = 'Name is required';
      hasError = true;
    }

    setFormMessages(newMessages);

    if (!hasError) {
      console.log(JSON.stringify(formData, null, 2));
      // You can send formData to a server or perform other actions here
    }
  };

  // Define form sections and fields with placeholders and required prop
  const sections = [
    {
      title: 'Personal Details',
      fields: [
        { id: 'name', label: 'Name',placeholder:'name', required: true, message: formMessages.name },
        { id: 'organization', label: 'Select Organization', type: 'select', options: ['Kisna'], placeholder: 'Select organization', required: true,message: formMessages.SelectOrganization  },
        { id: 'birthDate', label: 'Birthdate', type: 'date' },
        { id: 'agreement', label: 'Agreement', type: 'select', options: ['NO', 'YES'], placeholder: 'Select agreement' },
        { id: 'profileImage', label: 'Profile Image', type: 'file' },
        { id: 'selectmodel', label: 'Select Model', type: 'select', options: ['Franchise', 'Dealer / Distributor'], placeholder: 'Select model', required: true,message: formMessages.SelectModel },
        { id: 'selecttype', label: 'Select type', type: 'select', options: ['ADMIN', 'AREA OPERATION MANAGER (AOM)', 'BDA', 'BDM', 'FRANCHISE', 'FRANCHISE BACK OFFICE', 'FRANCHISE NSM', 'PAM', 'RBM', 'SALES DIRECTOR', 'SALES HEAD'], placeholder: 'Select type', required: true,message: formMessages.Selecttype  },
        { id: 'desktopImage', label: 'Desktop Image', type: 'file' },
        { id: 'type', label: 'Select Title', type: 'select', options: ['Mr.', 'Mrs.', 'Ms.', 'Shri', 'M/S'], placeholder: 'Select title', required: true }
      ],
    },
    {
      title: 'Contact Details',
      fields: [
        { id: 'alterTitle', label: 'Alter Contact Title', type: 'select', options: ['Mr.', 'Mrs.', 'Ms.', 'Shri', 'M/S'], placeholder: 'Select title' },
        { id: 'code', label: 'Alter Contact Code',placeholder:'Alter Contact Code' },
        { id: 'alterName', label: 'Alter Contact Name',placeholder:'Alter Contact Name' },
        { id: 'Alter ContactNo', label: 'Alter Contact Number',placeholder:'Alter Contact Number' },
        { id: 'alterEmail', label: 'AlterEmail Address',placeholder:'AlterEmail Address' },
        { id: 'contact', label: 'Select Primary Contact Name', type: 'select', options: ['Prem Chand'], placeholder: 'Select contact', required: true,message: formMessages.SelectPrimaryContactName },
        { id: 'remarks', label: 'Remarks',placeholder:'Remarks' }
      ]
    },
    {
      title: 'Location Details',
      fields: [
        { id: 'selectTerritoryArea', label: 'Select Territory Area', type: 'select', options: SelectTerritory, placeholder: 'Select territory area', required: true,message: formMessages.selectTerritoryArea},
        { id: 'selectZone', label: 'Select Zone', type: 'select', options: SelectZone, placeholder: 'Select zone', required: true,message: formMessages.selectZone},
       
        { id: 'latitude', label: 'Latitude',placeholder:'Latitude'},
        { id: 'longitude', label: 'Longitude',placeholder:'Longitude'},
        { id: 'reference', label: 'Reference',placeholder:'Reference'},
        { id: 'isStorePerson', label: 'Is Store Person', type: 'select', options: ['NO', 'YES'], placeholder: 'Select option', required: true,message: formMessages.isStorePerson},
        // { id: 'city', label:'city', type:'select', placeholder: 'Select city'},
      ]
    },
    {
      title: 'Additional Details',
      fields: [
        { id: 'outletCategory', label: 'Outlet Category', placeholder: 'Enter outlet category', required: true,message: formMessages.outletCategory},
        { id: 'productType', label: 'Product Type', placeholder: 'Enter product type', required: true,message: formMessages.productType},
        { id: 'kyc', label: 'KYC', type: 'select', options: ['Yes', 'No'], placeholder: 'Select KYC' },
        { id: 'defaultLanguage', label: 'Default Language',placeholder:'Default Language' },
        { id: 'community', label: 'Select Community', type: 'select', options: SelectCommunity, placeholder: 'Select community' },
        { id: 'selectPart', label: 'Select Part', type: 'select', options: SelectPart, placeholder: 'Select part' },
        { id: 'emrCustCode', label: 'EMR Customer Code',placeholder:'EMR Customer Code'},
        { id: 'aniversaryDate', label: 'Anniversary Date', type: 'date' },
        { id: 'joinDate', label: 'Join Date', type: 'date' }
      ]
    }
  ];

  return (
    <CRow>
      <CCol md={12}>
        {/* <CCard>
          <CCardHeader style={{backgroundColor:"#040430", color:'white'}}><strong>Add User</strong></CCardHeader> */}
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              {sections.map((section, index) => (
                <div key={index}>
                  <h5 style={{ marginBottom: '1rem' }}>{section.title}</h5>
                  <CRow>
                    {section.fields.map((field) => (
                      <FormField
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        type={field.type}
                        value={formData[field.id]}
                        onChange={handleChange}
                        options={field.options}
                        placeholder={field.placeholder}
                        required={field.required}
                        message={field.message}
                      />
                    ))}
                  </CRow>
                </div>
              ))}
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

export default AddUserForm;