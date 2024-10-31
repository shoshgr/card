class Card {
    static currentId = 0; 

    constructor(text, backgroundColor) {
        this.id = Card.currentId++; 
        this.text = text;
        this.backgroundColor = backgroundColor;
    }

    displayCard() {
        return `ID: ${this.id}, כרטיס: ${this.text}, צבע רקע: ${this.backgroundColor}`;
    }

    setText(newText) {
        this.text = newText;
    }

    setBackgroundColor(newColor) {
        this.backgroundColor = newColor;
    }
}

module.exports = Card;
