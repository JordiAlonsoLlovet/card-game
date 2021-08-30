import Deck from "./Deck";
import Player from "./Player";
import Table from "./Table";
import Card from "./Card";

class Poker {
    constructor(players = []) {
        this.players = players.map((name) => { return new Player(name) });
        this.deck = new Deck();
        this.table = new Table();
    }

    shuffleCards() {
        this.Deck.shuffle();
    }

    dealCards() {
        this.players.forEach((p) => {
            p.addCards(this.deck.draw(2));
        });
    }

    showCard() {
        let amount = 1;
        if (this.table.getShownCards() == 0) amount = 3;
        this.table.addCards(this.deck.draw(amount));
    }

    checkWiner() {

    }

    checkFlush(hand) {
        let flushes = this.deck.suits.map((suit) => {
            let cardsOfaSuit = hand.filter((card) => card.suit == suit);
            if (cardsOfaSuit.length >= 5) {
                return this.getHighestCard(cardsOfaSuit).number;
            }
            else return 0;
        });
        return Math.max(...flushes);
    }

    checkStraight(hand) {
        let handNumbers = hand.map((card) => { return card.getNumber() });
        let highest = 0;
        let next = true;
        while (handNumbers.length >= 5) {
            highest = Math.max(...handNumbers);
            next = true;
            for (let n = 1; next; n++) {
                if (n == 5) return highest;
                else next = (handNumbers.includes(highest - n));
            }
            handNumbers = handNumbers.filter((n) => n < highest);
        }
        return false;
    }

    checkGroup(hand, type) { //Checks Pokers(4), Trios(3) or Pairs(3)
        let pokers = this.deck.numbers.map((number) => {
            let cardsOfaNumber = hand.filter((card) => card.number == number);
            if (cardsOfaNumber.length == type) return number
            else return 0;
        });
        if (Math.max(pokers)==type) {

        }
        else return false;
    }

    checkFlush(hand) {

    }

    getHighestCard(hand) {
        let handNumbers = hand.map((card) => { return card.getNumber() });
        let highest = Math.max(...handNumbers);
        return hand[handNumbers.indexOf(highest)];
    }
}
export default Poker;
