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
import { useItemHooks } from "./useItemHooks";
import { toast } from "react-toastify";

const FormField = ({
  id = "",
  type = "text",
  name = "",
  placeholder = "",
  label = "",
  isRequired = false,
  onChange,
  value = "",
  optionList = [],
  optlbl = "",
}) => (
  <CCol md={4} className="mb-3">
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
        {optionList.map((opt) => {
          return (
            <>
              <option key={opt[id]} selected={opt[id]}>
                {opt[optlbl]}
              </option>
            </>
          );
        })}
      </CFormSelect>
    ) : (
      <CFormInput
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        style={{ fontSize: "0.80rem" }}
        value={value}
      />
    )}
  </CCol>
);

const sections = [
  {
    title: "Item Details",
    fields: [
      {
        name: "ItemCtgCommonID",
        label: "Item Category",
        type: "select",
        isRequired: true,
        value: "ItemCtgCommonID",
        id: "SubCategoryID",
        optlbl: "SubCategoryName",
        placeholder: "",
      },
      {
        name: "ItemCollection",
        label: "Item Collection",
        type: "text",
        placeholder: "Item Collection",
        isRequired: true,
        value: "ItemCollection",
        id: "",
        optlbl: "",
      },
      {
        name: "ItemCode",
        label: "Item Code",
        type: "text",
        placeholder: "Item Code",
        isRequired: true,
        value: "ItemCode",
        id: "",
        optlbl: "",
      },
      {
        name: "ItemName",
        label: "Item Name",
        type: "text",
        placeholder: "Item Name",
        isRequired: true,
        value: "ItemName",
        id: "",
        optlbl: "",
      },
      {
        name: "ItemDesc",
        label: "Item Description",
        type: "text",
        placeholder: "Item Description",
        isRequired: true,
        value: "ItemDesc",
        id: "",
        optlbl: "",
      },
      {
        name: "ItemUOMID",
        label: "Item UOM",
        type: "select",
        isRequired: true,
        value: "ItemUOMID",
        id: "UomID",
        optlbl: "Uom",
        placeholder: "",
      },
      {
        name: "ItemSKU",
        label: "Item SKU",
        type: "text",
        placeholder: "Item SKU",
        isRequired: true,
        value: "ItemSKU",
        id: "",
        optlbl: "",
      },
      {
        name: "ItemMainSts",
        label: "Item Main",
        type: "select",
        isRequired: true,
        value: "ItemMainSts",
        id: "value",
        optlbl: "label",
        placeholder: "",
      },
      {
        name: "ItemPlainGold",
        label: "Item Plain Gold",
        type: "select",
        isRequired: true,
        value: "ItemPlainGold",
        id: "value",
        optlbl: "label",
        placeholder: "",
      },
      {
        name: "ItemFranchiseSts",
        label: "Item Franchise Status",
        type: "select",
        isRequired: true,
        value: "ItemFranchiseSts",
        id: "value",
        optlbl: "label",
        placeholder: "",
      },
      {
        name: "ItemComplexity",
        label: "Item Complexity",
        type: "select",
        value: "ItemComplexity",
        id: "value",
        optlbl: "label",
        placeholder: "",
      },
      {
        name: "ItemPPTag",
        label: "Item PPTag",
        type: "select",
        isRequired: true,
        value: "ItemPPTag",
        id: "PPTagID",
        optlbl: "PPTag",
        placeholder: "",
      },
      {
        name: "ItemColor",
        label: "Item Color",
        type: "select",
        value: "ItemColor",
        id: "ColorID",
        optlbl: "ColorName",
        placeholder: "",
      },
      {
        name: "ItemSoliterSts",
        label: "Soliter Status",
        type: "select",
        isRequired: true,
        value: "ItemSoliterSts",
        id: "value",
        optlbl: "label",
        placeholder: "",
      },
      {
        name: "itemSubComplexity",
        label: "Item Sub Complexity",
        type: "select",
        value: "ItemSubComplexity",
        id: "value",
        optlbl: "label",
        placeholder: "",
      },
      {
        name: "ItemStarNo",
        label: "Item Star",
        type: "select",
        isRequired: true,
        value: "ItemStarNo",
        id: "StarColorID",
        optlbl: "StarName",
        placeholder: "",
      },
      {
        name: "ItemBrandCommonID",
        label: "Item Brand",
        type: "select",
        isRequired: true,
        value: "ItemBrandCommonID",
        id: "BrandID",
        optlbl: "BrandName",
        placeholder: "",
      },
      {
        name: "ItemGenderCommonID",
        label: "Item Gender",
        type: "select",
        isRequired: true,
        value: "ItemGenderCommonID",
        id: "value",
        optlbl: "label",
        placeholder: "",
      },
      {
        name: "ItemDesignerCommonID",
        label: "Item Designer",
        type: "select",
        isRequired: true,
        value: "ItemDesignerCommonID",
        id: "DsgID",
        optlbl: "DsgName",
        placeholder: "",
      },
      {
        name: "ItemCadDesignerCommonID",
        label: "Item CAD Designer",
        type: "select",
        isRequired: true,
        value: "ItemCadDesignerCommonID",
        id: "value",
        optlbl: "label",
        placeholder: "",
      },
      {
        name: "ItemNosePinScrewSts",
        label: "Nose Pins Screw",
        type: "select",
        isRequired: true,
        value: "ItemNosePinScrewSts",
        id: "value",
        optlbl: "label",
        placeholder: "",
      },
      {
        name: "ItemDAproxDayCommonID",
        label: "Item Approx days",
        type: "select",
        isRequired: true,
        value: "ItemDAproxDayCommonID",
        id: "DaysID",
        optlbl: "DaysName",
        placeholder: "",
      },
      {
        name: "ItemAproxDayCommonID",
        label: "Approx Delivery days",
        type: "select",
        isRequired: true,
        value: "ItemAproxDayCommonID",
        id: "DaysID",
        optlbl: "DaysName",
        placeholder: "",
      },
    ],
  },
  {
    title: "Pricing Details",
    fields: [
      {
        name: "ItemMRP",
        label: "Item MRP",
        type: "text",
        placeholder: "Item MRP",
        isRequired: true,
        value: "ItemMRP",
        id: "",
        optlbl: "",
      },
      {
        name: "ItemRPrice",
        label: "Retailer Price",
        type: "text",
        placeholder: "Retailer Price",
        isRequired: true,
        value: "ItemRPrice",
        id: "",
        optlbl: "",
      },
      {
        name: "ItemDPrice",
        label: "Distributor Price",
        type: "text",
        placeholder: "Distributor Price",
        isRequired: true,
        value: "ItemDPrice",
        id: "",
        optlbl: "",
      },
      {
        name: "ItemGoldLabourper",
        label: "Item Gold Labour Per",
        type: "text",
        placeholder: "Item Gold Labour Per",
        value: "ItemGoldLabourper",
        id: "",
        optlbl: "",
      },
      {
        name: "ItemFixLabourSts",
        label: "Item Fix Labour",
        type: "select",
        isRequired: true,
        value: "ItemFixLabourSts",
        id: "value",
        optlbl: "label",
        placeholder: "",
      },
      {
        name: "ItemFixLabourValue",
        label: "Item Fix Labour Value",
        type: "text",
        placeholder: "Item Fix Labour Value",
        isRequired: true,
        value: "ItemFixLabourValue",
        id: "",
        optlbl: "",
      },
    ],
  },
  {
    title: "Stone Details",
    fields: [
      {
        name: "ItemMetalCommonID",
        label: "Item Metal",
        type: "select",
        isRequired: true,
        value: "ItemMetalCommonID",
        id: "MetalID",
        optlbl: "MetalName",
        placeholder: "",
      },
      {
        name: "ItemStoneCommonID",
        label: "Item Stone",
        type: "select",
        isRequired: true,
        value: "ItemStoneCommonID",
        id: "StoneID",
        optlbl: "StoneName",
        placeholder: "",
      },
      {
        name: "ItemStoneQltyCommonID",
        label: "Item Stone Quality",
        type: "select",
        isRequired: true,
        value: "ItemStoneQltyCommonID",
        id: "StoneQualityID",
        optlbl: "StoneQuality",
        placeholder: "",
      },
      {
        name: "ItemStoneColor",
        label: "Item Stone Color",
        type: "select",
        isRequired: true,
        value: "ItemStoneColor",
        id: "SColorID",
        optlbl: "StoneColor",
        placeholder: "",
      },
      {
        name: "ItemStoneShape",
        label: "Item Stone Shape",
        type: "select",
        isRequired: true,
        value: "ItemStoneShape",
        id: "ShapeID",
        optlbl: "StoneShape",
        placeholder: "",
      },
    ],
  },
  {
    title: "Weight Details",
    fields: [
      {
        name: "ItemMetalWt",
        label: "Item MetalWt",
        type: "text",
        placeholder: "Item MetalWt",
        value: "ItemMetalWt",
        id: "",
        optlbl: "",
      },
      {
        name: "ItemStoneWt",
        label: "Item StoneWt",
        type: "text",
        placeholder: "Item StoneWt",
        value: "ItemStoneWt",
        id: "",
        optlbl: "",
      },
      {
        name: "ItemStoneQty",
        label: "Item StoneQty",
        type: "text",
        placeholder: "Item StoneQty",
        value: "ItemStoneQty",
        id: "",
        optlbl: "",
      },
      {
        name: "ItemGrossWt",
        label: "Item GrossWt",
        type: "text",
        placeholder: "Item GrossWt",
        value: "ItemGrossWt",
        id: "",
        optlbl: "",
      },
      {
        name: "ItemOtherWt",
        label: "Item OtherWt",
        type: "text",
        placeholder: "Item OtherWt",
        value: "ItemOtherWt",
        id: "",
        optlbl: "",
      },
    ],
  },
  {
    title: "EMR Order Bridge",
    fields: [
      {
        name: "ItemOdDmCd",
        label: "Design Code",
        type: "text",
        placeholder: "Design Code",
        value: "ItemOdDmCd",
        id: "",
        optlbl: "",
      },
      {
        name: "ItemOdSfx",
        label: "Order Suffix",
        type: "text",
        placeholder: "Order Suffix",
        value: "ItemOdSfx",
        id: "",
        optlbl: "",
      },
      {
        name: "ItemOdIdNo",
        label: "OdIdNo",
        type: "text",
        placeholder: "OdIdNo",
        value: "ItemOdIdNo",
        id: "",
        optlbl: "",
      },
      {
        name: "ItemOdKt",
        label: "KT",
        type: "text",
        placeholder: "KT",
        value: "ItemOdKt",
        id: "",
        optlbl: "",
      },
      {
        name: "ItemOdDmCol",
        label: "Design Color",
        type: "select",
        isRequired: true,
        value: "ItemOdDmCol",
        id: "value",
        optlbl: "label",
        placeholder: "",
      },
    ],
  },
];

const AddItemForm = ({ isEditMode, itemDetails, onClose, onRefresh, rowData }) => {
  const {
    stoneQualityList,
    itemDaysList,
    subCategoryList,
    cartDaysList,
    uomList,
    metalList,
    stoneList,
    stoneColorList,
    stoneShapesList,
    pptagList,
    starColorList,
    commonOptList,
    colorList,
    brandList,
    designerList,
    caddesignerList,
  } = useItemHooks();

  const [formValues, setFormValues] = useState(itemDetails);
  console.log("formValues:", formValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  /*
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    onClose(); // Close modal after submit
  };
  */
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // if (validateForm()) {
      try {
        let isDuplicate = 0;
        if (isEditMode) {
          const tmpEditData = rowData.filter((itm: any) => {
            return (
              itm.ItemID !== itemDetails.ItemID &&
              itm.ItemCode === formValues.ItemCode
            );
          });
          isDuplicate = tmpEditData?.length > 0 ? 1 : 0;
        } else {
          const tmpData = rowData.filter((itm: any) => {
            return itm.ItemCode === formValues.ItemCode;
          });
          isDuplicate = tmpData?.length > 0 ? 1 : 0;
        }
        if (isDuplicate === 1) {
          toast.error("Item already exists!");
        } else {
          console.log("formValues:", formValues);
          const response = await Axios.post("/mst/additem", formValues, {
            headers: { "Content-Type": "application/json" },
          });
          console.log("response:", response);

          if (response.status >= 200 && response.status < 300) {
            // setShowSuccessModal(true);
            toast.success(
              isEditMode
                ? "Item successfully updated!"
                : "Item successfully created!"
            );
            // setTimeout(() => {
            //   onRefresh();
            //   onClose();
            // }, 1000);
          } else {
            throw new Error("Failed to submit");
          }
        }
      } catch (error) {
        console.log("error:", error);
        // @ts-ignore
        toast.error(error.response?.data?.message || error.message);
      }
    // } else {
    //   toast.error("Please fill all required field!");
    //   // setErrorMessage('Please fill all fields');
    //   // setShowErrorModal(true);
    // }
  };

  const getOptionListByField = (fieldname: string) => {
    let optList: any = [];
    if (fieldname === "ItemCtgCommonID") {
      optList = subCategoryList;
    } else if (fieldname === "ItemStoneQltyCommonID") {
      optList = stoneQualityList;
    } else if (fieldname === "ItemStoneColor") {
      optList = stoneColorList;
    } else if (fieldname === "ItemStoneShape") {
      optList = stoneShapesList;
    } else if (fieldname === "ItemUOMID") {
      optList = uomList;
    } else if (fieldname === "ItemMainSts") {
      optList = commonOptList;
    } else if (fieldname === "ItemPlainGold") {
      optList = commonOptList;
    } else if (fieldname === "ItemFranchiseSts") {
      optList = commonOptList;
    } else if (fieldname === "ItemPPTag") {
      optList = pptagList;
    } else if (fieldname === "ItemSoliterSts") {
      optList = commonOptList;
    } else if (fieldname === "ItemFixLabourSts") {
      optList = commonOptList;
    } else if (fieldname === "ItemStarNo") {
      optList = starColorList;
    } else if (fieldname === "ItemNosePinScrewSts") {
      optList = commonOptList;
    } else if (fieldname === "ItemAproxDayCommonID") {
      optList = itemDaysList;
    } else if (fieldname === "ItemDAproxDayCommonID") {
      optList = cartDaysList;
    } else if (fieldname === "ItemMetalCommonID") {
      optList = metalList;
    } else if (fieldname === "ItemStoneCommonID") {
      optList = stoneList;
    } else if (fieldname === "ItemColor") {
      optList = colorList;
    } else if (fieldname === "ItemBrandCommonID") {
      optList = brandList;
    } else if (fieldname === "ItemDesignerCommonID") {
      optList = designerList;
    } else if (fieldname === "ItemCadDesignerCommonID") {
      optList = caddesignerList;
    }
    return optList;
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
                        // console.log("section:", formValues[field.value]);
                        return (
                          <FormField
                            key={idx}
                            name={field.name}
                            label={field.label}
                            type={field.type}
                            placeholder={field.placeholder}
                            isRequired={field.isRequired}
                            onChange={handleChange}
                            value={formValues[field.value]}
                            optionList={getOptionListByField(field.name)}
                            id={field.id}
                            optlbl={field.optlbl}
                          />
                        );
                      })}
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
