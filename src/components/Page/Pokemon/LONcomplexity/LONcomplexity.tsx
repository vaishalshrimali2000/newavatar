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
  CFormSelect,
  CFormCheck,
} from '@coreui/react';

// Options for select fields
const userOptions = [
  'Abhinav Enterprises', 'B P S M Jewellers', 'Balaji Jwellers', 'Divine Jewles.',
  'Franchiseguestlogin', 'H K Jewels Private Limited-Noida', 'H K Jewels Private Limited-Preet Vihar',
  'H K Jewels Private Limited-Alambagh Lucknow', 'H K Jewels Private Limited-kabirnagar',
  'H K Jewels Private Limited-Franchise Prediction', 'Harsh Shah', 'HESTIN Engineering Private Limited',
  'HK-SHOWROOM(Franchise-HO) ORO KRAFT', 'J C Diamonds', 'Khushaal Shah Amar Nath Jewellers',
  'Kisna Franchise', 'Kundalam Jewels LLP', 'M R Jewellers', 'M/S Sudarshan Tradepoint Pvt. Ltd.',
  'New Ansar Jewellers', 'Nikhil Pastagia', 'P.N. Jewellers-Chapra', 'Parth Jewellers',
  'Punjab Jewellers-Raipur', 'Rama Kisna Jewellers', 'Sachdeva Diamonds LLP',
  'Saksham Trading Co Private Limited', 'Skill Promoters Pvt Ltd', 'Suraksha Enterprises',
  'SVR Diamonds & Jewels', 'Swarnakamal Jewellers'
];

const complexityOptions = [
  '2 FINGER', '2 HEADED', '2 LINE', '2 VATI', 'ANTIQUE', 'BABY', 'BABY BRACELET', 
  'BABY PRODUCT', 'BACK CHAIN', 'BALI', 'BAND', 'BANDS', 'BANGLE KADA', 'BOLO', 
  'BOX CHAIN', 'BRACELET', 'BROAD', 'BROAD BAND', 'CALCUTI', 'CALCUTTI', 'CARTIER', 
  'CASTING', 'Casting Exclusive', 'CASUAL', 'CHAIN', 'CHAMS', 'CHANDAN', 'CHOCO',
  'CLASSIC', 'CLOSE SETTING', 'CNC', 'COCKTAIL', 'COIMBATORE', 'COINS', 'COUPLE',
  'CROSSOVER', 'CUBAN', 'DAHISAR', 'DANGLER', 'DETACHABLE', 'DIAMOND KANTHI', 
  'DOUBLE HEADED', 'DROPS', 'DUAL SHANK', 'DUBAI', 'EARCUFFS', 'ELECTRIC FORMING',
  'ELECTROFORMING', 'ETERNITY', 'EXCLUSIVE CASTING', 'EXCLUSIVE FANCY', 'EXLUSIVE TAASH POLISH',
  'EXCLUSIVE TURKISH', 'FANCY', 'FANCY DAHISAR', 'FANCY/CNC', 'FASHION', 'FEXIBLE', 'FUSION',
  'GANPATI', 'GOD', 'HALF ROUND', 'HAND MADE', 'HAND MANGALSUTRA', 'HAND MANGALSUTRA BRC',
  'HOLLOW', 'HOLLOW BRACLETE', 'HOLLOW CHAIN', 'HOOPS', 'IMPORTED', 'INDO ITALIAN', 'INITIAL',
  'ITALIAN', 'ITALIAN HOLLOW', 'ITALIAN/HOLLOW', 'JBACKS', 'JBALI', 'KADA', 'KIDS', 'LARIATS',
  'LASER', 'LINK', 'LOOSE', 'LOOSE BRACLETE', 'MACHINE', 'MACHINE CHAIN', 'MACHINE CHAIN EXCLUSIVE',
  'MACHINE CHAIN REGULAR', 'MANGALSUTRA', 'MOHAN MALA', 'MUGGAPU', 'MULTI LAYER', 'NAVABI', 'OM',
  'OVAL', 'PATTI', 'PEARL', 'PEAR-FUSION', 'PIN', 'PIPE', 'PONCHA', 'PROMISE', 'REGULAR', 'RING',
  'ROUND', 'RUBBER BRACLETE', 'RUDRAKSH MALA', 'RUDRAKSH BRACLETE', 'SARDAR KADA', 'SARDAR KADA EXCLUSIVE',
  'SARDAR KADA FANCY', 'SARDAR KADA REGULAR', 'SAVITRI', 'SECOND STUDS', 'SHANKHA POLA', 'SHORT NECKLACE',
  'SOLITAIRE', 'SPLIT SHANK', 'SPRING', 'STACKABLE', 'STATION', 'STUDS', 'SUI DHAGA', 'SWARAIN', 'TAAS',
  'TAASH', 'TAASH POLISH', 'TEMPLE', 'TENNIS', 'TODA', 'TULSI', 'TUTKLITE', 'VANKY', 'VERTICAL', 'WATCH',
  'WATCH CHARMS', 'WRAP RING', 'YELLOW'
];

const FormField = ({ id, label, type = 'text', options = [], value, onChange, required, placeholder }) => (
  <CRow className="align-items-center mb-3" style={{ fontSize: '0.80rem' }}>
    <CCol md={3}>
      {type === 'checkbox' ? (
        <CFormCheck id={id} label={label} checked={value} onChange={onChange} />
      ) : (
        <CFormLabel htmlFor={id}>
          {label}
          {required && <span style={{ color: 'red' }}> *</span>}
        </CFormLabel>
      )}
    </CCol>
    <CCol md={9}>
      {type === 'select' ? (
        <CFormSelect id={id} value={value} onChange={onChange} style={{ fontSize: '0.80rem' }}>
          <option value="">{`Select ${label}`}</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </CFormSelect>
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
    </CCol>
  </CRow>
);

const FormExample = () => {
  const [formData, setFormData] = useState({
    user: '',
    category: '',
    complexity: '',
    labourPercentage: '',
    allUsers: false,
    allCategories: false,
    allComplexities: false,
  });

  const handleChange = useCallback((e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData, null, 2));
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader style={{backgroundColor:"#040430", color:'white'}}>
            <strong>Franchise Labour On Complexity</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              {[
                { id: 'allUsers', label: 'All Users', type: 'checkbox' },
                { id: 'user', label: 'User', type: 'select', options: userOptions },
                { id: 'allCategories', label: 'All Categories', type: 'checkbox' },
                { id: 'category', label: 'Category', type: 'select', options: [
                  'RINGS', 'BRACELETS', 'EARRINGS', 'PENDANTS', 'BANGLES', 'NECKLACE', 'NOSE PINS', 
                  'TIKO', 'SET', 'MANGALSUTRA', 'CHAIN', 'KADA', 'CUFFLINKS', 'HATH PAN', 'MALA', 
                  'TIKA', 'NOSE RING', 'EAR CHAIN', 'WATCH PIN', 'GOLD WAIST BELT', 'KANGAN'
                ] },
                { id: 'allComplexities', label: 'All Complexities', type: 'checkbox' },
                { id: 'complexity', label: 'Complexity', type: 'select', options: complexityOptions },
                { id: 'labourPercentage', label: 'Final Labour Percentage', placeholder: '0.000' },
              ].map((field) => (
                <FormField
                  key={field.id}
                  id={field.id}
                  label={field.label}
                  type={field.type}
                  options={field.options}
                  value={formData[field.id]}
                  onChange={handleChange}
                  required={field.required}
                  placeholder={field.placeholder}
                />
              ))}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CButton type="submit" color="primary" style={{ fontSize: '0.80rem',padding: '0.25rem 0.5rem' }}>
                  Save Labour
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default FormExample;


