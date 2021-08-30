import Card from "./Card"

class Deck {
    constructor() {
        this.suits = ["Diamonds", "Clovers", "Spades", "Hearts"]
        this.numbers = ["Ace",2,3,4,5,6,7,8,9,10,"Jack", "Queen","King"]
        this.cards = [];
    }

    shuffle() {
        this.cards = this.suits.map(suit => {
            return this.numbers.map(number => {
                return new Card(number, suit);
            });
        });
        let array = this.cards
        var currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        this.cards = array;
    }

    draw(amount) {
        if(amount > this.cards.length) return "Not enough cards"
        let index = this.cards.length - amount;
        let cardsDrawn = this.cards.slice(index)
        this.cards.splice(index, amount);
        return cardsDrawn;
    }

    getCardsLeft() {
        return this.cards.length()
    }
}
export default Deck;
