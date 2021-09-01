import Card from "./Card.mjs";


class Player {
    constructor(name, money) {
        this.name = name;
        this.hand = [];
        this.money = money;
        this.folded = false;
        this.bet = 0;
    }

    addCards(cards) {
        this.hand=this.hand.concat(cards);
    }

    getHand() {
        return this.hand.map((card) => { return card.getCardName() });
    }
    changeCard(cardIndex, card) {
        this.hand.splice(cardIndex, 1, card)
    }

    fold() {
        this.folded = true;
    }

    newRound() {
        this.hand = [];
        this.folded = false;
        this.bet = 0;
    }

    makeBet(amount) {
        this.money = this.money - amount;
        this.bet = this.bet + amount;
    }

    win(amount) {
        this.money = this.money - amount;
    }
}
export default Player;
