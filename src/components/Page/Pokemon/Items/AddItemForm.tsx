"use client";
import React, { useState } from "react";
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
  CAccordionBody,
} from "@coreui/react";

const FormField = ({
  type = "text",
  name,
  placeholder,
  label,
  isRequired = false,
  onChange,
}) => (
  <CCol md={6} className="mb-3">
    <CFormLabel style={{ fontSize: "0.80rem" }}>
      {label} {isRequired && <span style={{ color: "red" }}>*</span>}
    </CFormLabel>
    {type === "select" ? (
      <CFormSelect
        name={name}
        onChange={onChange}
        style={{ fontSize: "0.80rem" }}
      >
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
        style={{ fontSize: "0.80rem" }}
      />
    )}
  </CCol>
);

const sections = [
  {
    title: "Item Details",
    fields: [
      {
        name: "itemCategory",
        label: "Item Category",
        type: "select",
        isRequired: true,
        value: "ItemCategory",
      },
      {
        name: "itemCollection",
        label: "Item Collection",
        type: "text",
        placeholder: "Item Collection",
        isRequired: true,
        value: "ItemCollection",
      },
      {
        name: "itemCode",
        label: "Item Code",
        type: "text",
        placeholder: "Item Code",
        isRequired: true,
        value: "ItemCode"
      },
      {
        name: "itemName",
        label: "Item Name",
        type: "text",
        placeholder: "Item Name",
        isRequired: true,
        value: "ItemName",
      },
    ],
  },
  {
    title: "Pricing Details",
    fields: [
      {
        name: "itemMRP",
        label: "Item MRP",
        type: "text",
        placeholder: "Item MRP",
        value: "ItemMRP",
      },
      {
        name: "retailerPrice",
        label: "Retailer Price",
        type: "text",
        placeholder: "Retailer Price",
        isRequired: true,
        value: "ItemRPrice",
      },
      {
        name: "distributorPrice",
        label: "Distributor Price",
        type: "text",
        placeholder: "Distributor Price",
        isRequired: true,
        value: "ItemDPrice",
      },
    ],
  },
  {
    title: "Stone Details",
    fields: [
      {
        name: "itemStoneQuality",
        label: "Item Stone Quality",
        type: "select",
        isRequired: true,
        value: "ItemStoneQty",
      },
      {
        name: "itemStoneColor",
        label: "Item Stone Color",
        type: "select",
        value: "ItemStoneColor",
      },
      {
        name: "itemStoneShape",
        label: "Item Stone Shape",
        type: "select",
        isRequired: true,
        value: "ItemStoneShape",
      },
    ],
  },
  {
    title: "Weight Details",
    fields: [
      {
        name: "itemMetalWt",
        label: "Item MetalWt",
        type: "text",
        placeholder: "Item MetalWt",
        value: "ItemMetalWt",
      },
      {
        name: "itemStoneWt",
        label: "Item StoneWt",
        type: "text",
        placeholder: "Item StoneWt",
        value: "ItemStoneWt",
      },
      {
        name: "itemStoneQty",
        label: "Item StoneQty",
        type: "text",
        placeholder: "Item StoneQty",
        value: "ItemStoneQty",
      },
    ],
  },
  {
    title: "EMR Order Bridge",
    fields: [
      {
        name: "orderSuffix",
        label: "Order Suffix",
        type: "text",
        placeholder: "Order Suffix",
        value: "orderSuffix",
      },
      { name: "odIdNo", label: "OdIdNo", type: "text", placeholder: "OdIdNo", value: "odIdNo" },
      { name: "kt", label: "KT", type: "text", placeholder: "KT", value: "kt" },
    ],
  },
];

const AddItemForm = ({ isEditMode, itemDetails, onClose }) => {
  const [formValues, setFormValues] = useState(itemDetails);
  console.log("formValues:", formValues)

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
        <CCardHeader style={{ backgroundColor: "#040430", color: "white" }}>
          <strong>Add Item</strong>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <CAccordion alwaysOpen>
              {sections.map((section, index) => (
                <CAccordionItem itemKey={index} key={index}>
                  <CAccordionHeader style={{ fontSize: "0.80rem" }}>
                    {section.title}
                  </CAccordionHeader>
                  <CAccordionBody>
                    <CRow className="mb-3">
                      {section.fields.map((field, idx) => {
                        console.log("section:", formValues[field.value]);
                        return (
                        <FormField
                          key={idx}
                          name={field.name}
                          label={field.label}
                          type={field.type}
                          placeholder={field.placeholder}
                          isRequired={field.isRequired}
                          onChange={handleChange}
                        />
                      )})}
                    </CRow>
                  </CAccordionBody>
                </CAccordionItem>
              ))}
            </CAccordion>
            <CCol xs={12} className="text-start mt-3">
              <div className="d-flex justify-content-end">
                <CButton color="secondary" className="me-2" onClick={onClose}>
                  Close
                </CButton>
                <CButton color="primary" onClick={handleSubmit}>
                  {isEditMode ? "Update" : "Save"}
                </CButton>
              </div>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  );
};

export default AddItemForm;
