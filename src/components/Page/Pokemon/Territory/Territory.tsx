'use client'
import React, { useState, useEffect } from 'react';
import {
  CCard, CCardBody, CCardHeader, CCol, CRow, CForm, CFormSelect, CFormLabel, CFormCheck, CFormInput, CButton
} from '@coreui/react';
import './CitySelector.css'; // Import custom CSS

const allCities = [
  "D-1", "D-2", "D-3", "D-4", "D-5", "D-6", "D-7", "D-8", "D-9", "D-10",
  "D-10A", "D-10B", "D-11", "D-11A", "D-11B", "D-11C", "D-12", "D-12A", "D-13", "D-13A",
  // Add more cities if needed
];

const stateCities = {
  "agustyamuni": ["Port Blair", "Diglipur", "Rangat"],
  "Balrampur": ["Vijayawada", "Visakhapatnam", "Guntur"],
  "Bighapur": ["Itanagar", "Tawang", "Ziro"],
  "Bilgram": ["Guwahati", "Dibrugarh", "Silchar"],
  "Chaubepur": ["Patna", "Gaya", "Bhagalpur"],
  // Add more states and cities if needed
};

const CitySelector = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectAllCities, setSelectAllCities] = useState(false);
  const [removeAllCities, setRemoveAllCities] = useState(false);
  const [stateCitiesChecked, setStateCitiesChecked] = useState({});
  const [allCitiesChecked, setAllCitiesChecked] = useState({});
  const [searchAllCities, setSearchAllCities] = useState('');
  const [searchStateCities, setSearchStateCities] = useState('');

  useEffect(() => {
    if (removeAllCities && selectedState) {
      // Select all cities of the selected state when "Remove All Cities" is checked
      const cities = stateCities[selectedState] || [];
      const updatedCheckedCities = cities.reduce((acc, city) => {
        acc[city] = true;
        return acc;
      }, {});
      setStateCitiesChecked(updatedCheckedCities);
    } else if (!removeAllCities && selectedState) {
      // Reset state cities only if "Remove All Cities" is not checked
      const cities = stateCities[selectedState] || [];
      const updatedCheckedCities = cities.reduce((acc, city) => {
        if (stateCitiesChecked[city]) {
          acc[city] = stateCitiesChecked[city];
        }
        return acc;
      }, {});
      setStateCitiesChecked(updatedCheckedCities);
    }
  }, [removeAllCities, selectedState]);

  const handleStateChange = (event) => {
    const newState = event.target.value;
    setSelectedState(newState);
    setRemoveAllCities(false); // Reset remove all cities checkbox when state changes
    setSelectAllCities(false); // Reset select all cities checkbox
    setStateCitiesChecked({});
    setSearchAllCities(''); // Reset search input for all cities
    setSearchStateCities(''); // Reset search input for state cities
  };

  const handleSelectAllCitiesChange = (event) => {
    const isChecked = event.target.checked;
    setSelectAllCities(isChecked);
    if (isChecked) {
      const updatedCheckedCities = allCities.reduce((acc, city) => {
        acc[city] = true;
        return acc;
      }, {});
      setAllCitiesChecked(updatedCheckedCities);
    } else {
      setAllCitiesChecked({});
    }
  };

  const handleRemoveAllCitiesChange = (event) => {
    const isChecked = event.target.checked;
    setRemoveAllCities(isChecked);
    if (!isChecked) {
      // Deselect all cities in the state when "Remove All Cities" is unchecked
      const cities = stateCities[selectedState] || [];
      const updatedCheckedCities = cities.reduce((acc, city) => {
        if (stateCitiesChecked[city]) {
          acc[city] = false;
        }
        return acc;
      }, {});
      setStateCitiesChecked(updatedCheckedCities);
    }
  };

  const handleStateCityCheckboxChange = (city) => {
    setStateCitiesChecked((prev) => ({
      ...prev,
      [city]: !prev[city],
    }));
  };

  const handleAllCityCheckboxChange = (city) => {
    setAllCitiesChecked((prev) => ({
      ...prev,
      [city]: !prev[city],
    }));
  };

  const handleAddCities = () => {
    // Handle adding selected cities logic here
    console.log('Add Cities:', Object.keys(allCitiesChecked).filter(city => allCitiesChecked[city]));
  };

  const handleDeleteCities = () => {
    // Handle deleting selected cities logic here
    console.log('Delete Cities:', Object.keys(stateCitiesChecked).filter(city => stateCitiesChecked[city]));
  };

  const showStateCities = Boolean(stateCities[selectedState]);
  const showAllCities = Boolean(selectedState); // Show all cities when a state is selected

  // Filtered city lists based on search input
  const filteredAllCities = allCities.filter(city => city.toLowerCase().includes(searchAllCities.toLowerCase()));
  const filteredStateCities = stateCities[selectedState]?.filter(city => city.toLowerCase().includes(searchStateCities.toLowerCase())) || [];

  return (
    <CRow>
      <CCol xs={12}>
        {/* <CCard className="mb-4">
          <CCardHeader>
            <strong>City Territory</strong>
          </CCardHeader> */}
          <CCardBody>
            <CForm>
              <CRow className="mb-4">
                <CCol md={12}>
                  <div className="form-group">
                    <CFormLabel htmlFor="stateSelect" className="form-label">Select Territory:</CFormLabel>
                    <CFormSelect
                      id="stateSelect"
                      onChange={handleStateChange}
                      className="styled-select"
                    >
                      <option value="">Select Territory</option>
                      {Object.keys(stateCities).map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </CFormSelect>
                  </div>
                </CCol>
              </CRow>

              <CRow>
                {/* All Cities Section */}
                {showAllCities && (
                  <CCol md={6}>
                    <div className="city-item" style={{ height: '50px', backgroundColor: 'rgb(233, 236, 239)', margin: '5px 0', borderRadius: '5px', display: 'flex', alignItems: 'center' }}>
                      <div className="form-group mb-4" style={{ marginTop: '30px' }}>
                        <CFormCheck
                          type="checkbox"
                          id="selectAllCities"
                          checked={selectAllCities}
                          onChange={handleSelectAllCitiesChange}
                          className="form-check-input rounded-checkbox"
                        />
                        <CFormLabel htmlFor="selectAllCities" className="form-check-label">Select All Territories</CFormLabel>
                      </div>
                    </div>
                    <CFormInput
                      type="text"
                      id="searchAllCities"
                      placeholder="Search for Territories"
                      value={searchAllCities}
                      onChange={(e) => setSearchAllCities(e.target.value)}
                      className="mb-4"
                    />
                    <h3 className="section-title">All Indian Cities</h3>
                    <div className="city-list">
                      {filteredAllCities.map((city) => (
                        <div key={city} className="city-item" style={{ height: '50px', backgroundColor: 'rgb(233, 236, 239)', margin: '5px 0', borderRadius: '5px', display: 'flex', alignItems: 'center' }}>
                          <CFormCheck
                            type="checkbox"
                            id={city}
                            checked={allCitiesChecked[city] || false}
                            onChange={() => handleAllCityCheckboxChange(city)}
                            className="form-check-input rounded-checkbox"
                          />
                          <CFormLabel htmlFor={city} className="form-check-label" style={{ marginLeft: '10px' }}>{city}</CFormLabel>
                        </div>
                      ))}
                    </div>
                  </CCol>
                )}

                {/* State Cities Section */}
                {showStateCities && (
                  <CCol md={6}>
                    <div className="city-item" style={{ height: '50px', backgroundColor: 'rgb(233, 236, 239)', margin: '5px 0', borderRadius: '5px', display: 'flex', alignItems: 'center' }}>
                      <div className="form-group mb-4" style={{ marginTop: '30px' }}>
                        <CFormCheck
                          type="checkbox"
                          id="removeAllCities"
                          checked={removeAllCities}
                          onChange={handleRemoveAllCitiesChange}
                          className="form-check-input rounded-checkbox"
                        />
                        <CFormLabel htmlFor="removeAllCities" className="form-check-label">Remove All Territories</CFormLabel>
                      </div>
                    </div>
                    <CFormInput
                      type="text"
                      id="searchStateCities"
                      placeholder="Search for Territories"
                      value={searchStateCities}
                      onChange={(e) => setSearchStateCities(e.target.value)}
                      className="mb-4"
                    />
                    <h3 className="section-title">Cities in {selectedState}</h3>
                    <div className="city-list">
                      {filteredStateCities.map((city) => (
                        <div key={city} className="city-item" style={{ height: '50px', backgroundColor: '#e9ecef', margin: '5px 0', borderRadius: '5px', display: 'flex', alignItems: 'center' }}>
                          <CFormCheck
                            type="checkbox"
                            id={city}
                            checked={removeAllCities ? true : stateCitiesChecked[city] || false}
                            onChange={() => handleStateCityCheckboxChange(city)}
                            className="form-check-input rounded-checkbox"
                          />
                          <CFormLabel htmlFor={city} className="form-check-label" style={{ marginLeft: '10px' }}>{city}</CFormLabel>
                        </div>
                      ))}
                    </div>
                  </CCol>
                )}
              </CRow>

              <CRow className="mt-4">
                <CCol md={6} className="text-left">
                  <CButton color="primary" onClick={handleAddCities}>Add </CButton>
                </CCol>
                <CCol md={6} className="text-right">
                  <CButton color="danger" onClick={handleDeleteCities}>Delete </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        {/* </CCard> */}
      </CCol>
    </CRow>
  );
};

export default CitySelector;