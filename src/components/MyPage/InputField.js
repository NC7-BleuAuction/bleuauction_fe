import React from 'react';
import './InputField.css';

const InputField = ({ name, value, onChange, style, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      name={name}
      style={style}
      onChange={onChange}
      placeholder={placeholder}
      className='inputField'
    />
  );
};


export default InputField;
