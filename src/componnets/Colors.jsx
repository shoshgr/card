import React from 'react';

const Colors = ({ colors, setNewColor,handleColorChange }) => {
  return (
    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
      {colors.map((color, colorIndex) => (
        <div
          key={colorIndex}
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: color,
            cursor: 'pointer',
            border: '2px solid black'
          }}
          onClick={() => {
            setNewColor(color);
            
            handleColorChange();
          }}
        />
      ))}
    </div>
  ); 
};

export default Colors;
