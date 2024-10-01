'use client'
import React, { useState } from 'react';
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
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody
} from '@coreui/react';

const FormField = ({ type = 'text', name, placeholder, label, isRequired = false, onChange }) => (
  <CCol md={6} className="mb-3">
    <CFormLabel style={{ fontSize: '0.80rem' }}>
      {label} {isRequired && <span style={{ color: 'red' }}>*</span>}
    </CFormLabel>
    {type === 'select' ? (
      <CFormSelect name={name} onChange={onChange} style={{ fontSize: '0.80rem' }}>
        <option>Select {label}</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </CFormSelect>
    ) : (
      <CFormInput
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        style={{ fontSize: '0.80rem' }}
      />
    )}
  </CCol>
);

const sections = [
  {
    title: 'Item Details',
    fields: [
      { name: 'itemOrg', label: 'Item Org.', type: 'select', isRequired: true },
      { name: 'itemCategory', label: 'Item Category', type: 'select', isRequired: true },
      { name: 'itemCollection', label: 'Item Collection', type: 'text', placeholder: 'Item Collection', isRequired: true },
      { name: 'itemType', label: 'Item Type', type: 'select', isRequired: true },
      { name: 'itemCode', label: 'Item Code', type: 'text', placeholder: 'Item Code', isRequired: true },
      { name: 'itemName', label: 'Item Name', type: 'text', placeholder: 'Item Name', isRequired: true }
    ]
  },
  {
    title: 'Pricing Details',
    fields: [
      { name: 'itemMRP', label: 'Item MRP', type: 'text', placeholder: 'Item MRP' },
      { name: 'retailerPrice', label: 'Retailer Price', type: 'text', placeholder: 'Retailer Price', isRequired: true },
      { name: 'distributorPrice', label: 'Distributor Price', type: 'text', placeholder: 'Distributor Price', isRequired: true }
    ]
  },
  {
    title: 'Stone Details',
    fields: [
      { name: 'itemStoneQuality', label: 'Item Stone Quality', type: 'select', isRequired: true },
      { name: 'itemStoneColor', label: 'Item Stone Color', type: 'select', isRequired: true },
      { name: 'itemStoneShape', label: 'Item Stone Shape', type: 'select', isRequired: true }
    ]
  },
  {
    title: 'Weight Details',
    fields: [
      { name: 'itemMetalWt', label: 'Item MetalWt', type: 'text', placeholder: 'Item MetalWt' },
      { name: 'itemStoneWt', label: 'Item StoneWt', type: 'text', placeholder: 'Item StoneWt' },
      { name: 'itemStoneQty', label: 'Item StoneQty', type: 'text', placeholder: 'Item StoneQty' }
    ]
  },
  {
    title: 'EMR Order Bridge',
    fields: [
      { name: 'orderSuffix', label: 'Order Suffix', type: 'text', placeholder: 'Order Suffix' },
      { name: 'odIdNo', label: 'OdIdNo', type: 'text', placeholder: 'OdIdNo' },
      { name: 'kt', label: 'KT', type: 'text', placeholder: 'KT' }
    ]
  }
];

const AddItemForm = ({ onClose }) => {
  const [formValues, setFormValues] = useState({
    itemOrg: '',
    itemCategory: '',
    itemCollection: '',
    itemType: '',
    itemCode: '',
    itemName: '',
    itemMRP: '',
    retailerPrice: '',
    distributorPrice: '',
    itemStoneQuality: '',
    itemStoneColor: '',
    itemStoneShape: '',
    itemMetalWt: '',
    itemStoneWt: '',
    itemStoneQty: '',
    orderSuffix: '',
    odIdNo: '',
    kt: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    onClose(); // Close modal after submit
  };

  return (
    <CCol xs="12">
      <CCard>
        <CCardHeader style={{ backgroundColor: "#040430", color: 'white' }}>
          <strong>Add Item</strong>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <CAccordion alwaysOpen>
              {sections.map((section, index) => (
                <CAccordionItem itemKey={index} key={index}>
                  <CAccordionHeader style={{ fontSize: '0.80rem' }}>
                    {section.title}
                  </CAccordionHeader>
                  <CAccordionBody>
                    <CRow className="mb-3">
                      {section.fields.map((field, idx) => (
                        <FormField
                          key={idx}
                          name={field.name}
                          label={field.label}
                          type={field.type}
                          placeholder={field.placeholder}
                          isRequired={field.isRequired}
                          onChange={handleChange}
                        />
                      ))}
                    </CRow>
                  </CAccordionBody>
                </CAccordionItem>
              ))}
            </CAccordion>
            <CCol xs={12} className="text-start mt-3">
              <CButton
                type="submit"
                style={{ backgroundColor: '#040430', borderColor: '#040430', color: 'white', fontSize: '0.80rem', padding: '0.25rem 0.5rem' }}
              >
                Submit
              </CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  );
};

export default AddItemForm;