class Card {
    constructor(number, suit) {
        this.suit = suit;
        this.number  = number;
    }

    getCardName() {
        return `${this.number}  de ${this.suit}`;
    }
    getSuit() {
        return this.suit;
    }
    getNumber() {
        if (this.number == "Ace") return 14;
        else if (this.number == "King") return 13;
        else if (this.number == "Queen") return 12;
        else if (this.number == "Jack") return 11;
        else return this.number
    }
    getValue() {
        return this.value;
    }
}
export default Card;