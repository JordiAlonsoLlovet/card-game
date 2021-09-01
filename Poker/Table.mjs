import Card from "./Card.mjs";

class Table {
    constructor() {
        this.cards = [];
    }

    addCards(cards) {
        this.cards=this.cards.concat(cards);
    }

    clean() {
        this.cards = [];
    }

    getShownCards() {
        return this.cards.length;
    }
}
export default Table;