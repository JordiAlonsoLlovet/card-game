import Card from "./Card.mjs";

class Table {
    constructor() {
        this.cards = [];
    }

    addCards(cards) {
        this.cards=this.cards.concat(cards);
    }

    clear() {
        this.cards = [];
    }

    getShownCards() {
        return this.cards.length;
    }
}
export default Table;