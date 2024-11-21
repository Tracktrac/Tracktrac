import React from 'react';
import Select from 'react-select';

const YearSelect = ({ years = [], selectedYear, onYearChange }) => {
    const options = years.map((year) => ({
      value: year,
      label: year,
    }));
  
    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          borderRadius: '12px',
          fontSize: '1rem',
          padding: '4px',
          backgroundColor: '#29B967',
        //   border: state.isFocused || state.isHovered ? '2px solid #1E8F51' : '1px solid #1E8F51',
          boxShadow: state.isFocused ? '0 0 8px rgba(46, 204, 113, 0.5)' : 'none',
          color: '#fff',
          transition: 'all 0.3s ease',
        }),
        menu: (provided) => ({
          ...provided,
          borderRadius: '8px',
          fontSize: '1rem',
          backgroundColor: '#29B967',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }),
        menuList: (provided) => ({
          ...provided,
          padding: '0',
          backgroundColor: '#29B967',
        }),
        option: (provided, state) => ({
          ...provided,
          padding: '10px 15px',
          backgroundColor: state.isSelected
            ? '#1E8F51'
            : state.isFocused
            ? '#24A860'
            : '#29B967',
          color: '#fff',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }),
        placeholder: (provided) => ({
            ...provided,
            color: 'rgba(255, 255, 255, 0.6)',
          }),
        
      };
      
  
    return (
      <Select
        options={options}
        value={options.find((option) => option.value === selectedYear) || null}
        onChange={(selectedOption) => onYearChange(selectedOption?.value || null)}
        placeholder="Select a year"
        styles={customStyles}
        isClearable
      />
    );
  };
  

export default YearSelect;
