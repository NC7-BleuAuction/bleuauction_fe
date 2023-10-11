import React from 'react';

function Button({ onClick, buttonText }) {
  return (
    <button style={buttonStyle} onClick={onClick}>
      {buttonText}
    </button>
  );
}

const buttonStyle = {
  backgroundColor: '#02298A',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  width: '70%',
  margin: '0 auto',
};

export default Button;
