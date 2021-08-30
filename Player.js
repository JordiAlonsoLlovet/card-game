class Player {
    constructor(name, money) {
        this.name = name;
        this.hand = [];
        this.money = money;
        this.folded = false;
    }

    addCards(cards) {
        this.hand.concat(cards);
    }

    getHand() {
        return this.hand;
    }

    fold() {
        this.folded = true;
    }

    newRound() {
        this.hand = [];
        this.folded = false;
    }

    bet(amount) {
        this.money = this.money - amount;
    }

    win(amount) {
        this.money = this.money - amount;
    }
}
export default Player;
