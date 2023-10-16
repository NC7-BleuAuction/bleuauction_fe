import React from 'react';
import './InputField.css';

const InputField = ({ value, onChange, style, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      style={style}
      onChange={onChange}
      placeholder={placeholder}
      className='inputField'
    />
  );
};


export default InputField;
