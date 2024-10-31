import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Card from './Card';
import { FaPlus } from 'react-icons/fa'; 
import './css/cards.css';  

const Cards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:8080/cards');
        setCards(response.data);
        console.log(response);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchCards();
  }, []);


  const handleAddCard = async () => {
    const newCard = {
      text: 'New Card', 
      backgroundColor: 'black', 
    };

    try {
      const response = await axios.post('http://localhost:8080/cards', newCard);
      setCards((prevCards) => [...prevCards, response.data]);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="cards-container">
    <div className="add-card-btn" onClick={handleAddCard}>
      <FaPlus />
    </div>
    <div className="cards-grid">
      {cards.length > 0 ? (
        cards.map((card, index) => (
          <Card key={index}  card={card}  />
        ))
      ) : (
        <p className="no-cards-msg">No cards found.</p>
      )}
    </div>
  </div>
  );
};

export default Cards;
