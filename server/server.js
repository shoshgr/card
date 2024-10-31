const express = require('express');
const cors = require('cors');

const Card = require('./cards');
const app = express();
const PORT = 8080;

const cardsArray = [];

app.use(express.json(), cors());

app.post("/cards/", (req, res) => {
    const { text, backgroundColor } = req.body;

    if (!text || !backgroundColor) {
        return res.status(400).json({ error: "נדרש טקסט וצבע רקע." });
    }

    const newCard = new Card(text, backgroundColor);
   
    cardsArray.push(newCard);

    res.status(201).json(newCard);
});

app.get('/cards', (req, res) => {
    res.status(200).json(cardsArray.length > 0 ? cardsArray : []);
});

app.delete('/cards/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = cardsArray.findIndex(card => card.id === id);

    if (index === -1) {
        return res.status(400).json({ error: "מזהה כרטיס לא חוקי." });
    }

    const deletedCard = cardsArray.splice(index, 1);
    res.status(200).json({ message: "כרטיס נמחק בהצלחה.", card: deletedCard[0] });
});

app.put('/cards/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = cardsArray.findIndex(card => card.id === id);
    const { text, backgroundColor } = req.body;

    if (index === -1) {
        return res.status(400).json({ error: "מזהה כרטיס לא חוקי." });
    }

    if (!text && !backgroundColor) {
        return res.status(400).json({ error: "נדרש לפחות טקסט או צבע רקע לעדכון." });
    }

    if (text) {
        cardsArray[index].text = text;
    }
    if (backgroundColor) {
        cardsArray[index].backgroundColor = backgroundColor;
    }

    res.status(200).json({ message: "כרטיס עודכן בהצלחה.", card: cardsArray[index] });
});

app.listen(PORT, () => {
    console.log(`השרת פועל בכתובת http://localhost:${PORT}`);
});
