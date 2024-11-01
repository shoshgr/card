import React, { useState } from 'react';
import { FaTrash, FaPaintBrush } from 'react-icons/fa';
import axios from 'axios';
import './css/card.css'; 
import Colors from './Colors';

const Card = ({  card,cards, setCards }) => {
  const url = "http://localhost:8080/cards";
  const [newText, setNewText] = useState(card.text);
  const [newColor, setNewColor] = useState(card.backgroundColor);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const handleInputChange = (event) => {
    setNewText(event.target.value);
  };

  const handleUpdateClick = async () => {
    try {
      const response = await axios.put(`${url}/${card.id}`, {
        text: newText,
        backgroundColor: newColor,
      });

      if (response.status !== 200) {
        throw new Error('Failed to update the card');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await axios.delete(`${url}/${id}`);

      if (response.status !== 200) {
        throw new Error('Failed to delete the card');
      }

      const updatedCards = cards.filter(card => card.id !== id);
      setCards(updatedCards);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div
      className="card" 
      key={card.id}
      style={{ backgroundColor: newColor, color: 'white', position: 'relative' }}
    >
      <input
        type="text"
        value={newText}
        onChange={handleInputChange}
        onBlur={handleUpdateClick} 
        style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10 }}
      />

      <FaTrash 
        className="delete-icon" 
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteClick(card.id);
        }} 
      />

      <FaPaintBrush 
        style={{ color: 'white' }}
        onClick={(e) => {
          e.stopPropagation();
          setIsColorPickerOpen(!isColorPickerOpen);
        }} 
      />

      {isColorPickerOpen && (
        <Colors 
          colors={['blue', 'pink', 'red', 'green']} 
          setNewColor={setNewColor} 
          handleColorChange={handleUpdateClick}
        />
      )}
    </div>
  );
};

export default Card;
