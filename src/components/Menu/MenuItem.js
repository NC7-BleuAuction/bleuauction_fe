import React from 'react';

function MenuItem({ name, sizes, imageUrl }) {
  return (
    <div style={menuItemStyle}>
      <div style={contentStyle}>
        {imageUrl && (
          <img src={imageUrl} alt={name} style={imageStyle} />
        )}
        <div style={textStyle}>
          <span style={nameStyle}>{name}</span>
          <div style={sizesStyle}>
            {sizes.map(size => (
              <div key={size.name} style={sizeStyle}>
                <span>{size.name}</span>
                <span>{size.price}원</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const menuItemStyle = {
  padding: '10px',
  borderBottom: '1px solid #ccc',
  background: 'white', 
  margin: '10px', 
  borderRadius: '8px', 
  boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)', 
  width: '70%',
};

const contentStyle = {
  display: 'flex',
  alignItems: 'center',
  marginTop: '10px',
};

const imageStyle = {
  width: '160px',
  height: '100px',
  objectFit: 'cover',
  marginRight: '30px', 
};

const textStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

const nameStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
};

const sizesStyle = {
  marginTop: '5px',
};

const sizeStyle = {
  margin: '2px 0',
};

export default MenuItem;
