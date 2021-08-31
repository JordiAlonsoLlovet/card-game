import Deck from "./Deck";
import Player from "./Player";
import Table from "./Table";
import Card from "./Card";

class Poker {
    constructor() {
        this.players = [];
        this.deck = new Deck();
        this.table = new Table();
    }

    shuffleCards() { //Refill deck and shufle cards randomly
        this.Deck.shuffle();
    }

    addPlayer(name, money) {
        let p = new Player(name, money);
        this.players.push(p);
    }

    dealCards() { // Give two cards to each player
        this.players.forEach((p) => {
            p.addCards(this.deck.draw(2));
        });
    }

    showCard() { // Put a card on the table. If there are no cards on the tables 3 cards will be shown at once.
        let shownCards = this.table.getShownCards()
        if (shownCards < 5) {
            let amount = 1;
            if (shownCards == 0) amount = 3;
            this.table.addCards(this.deck.draw(amount));
        }
    }

    checkWiner() { //Returns the name of the winner
        let points = this.players.map((p) => {
            return this.evaluateHand(p.hand);
        });
        return this.players[points.indexOf(Math.max(points))].name;
    }


    /////////////////////////////////////////////////////////////////////////////
    evaluateHand(hand) {
        if (this.checkFlush(hand) && this.checkStraight(hand)) {
            return 900 + this.checkFlush(hand);
        } else if (this.checkGroup(hand, 4)) {
            return 800 + this.checkGroup(hand, 4);
        } else if (this.checkFullHouse(hand)) {
            return 700 + this.checkFullHouse(hand);
        } else if (this.checkFlush(hand)) {
            return 600 + this.checkFlush(hand);
        } else if (this.checkStraight(hand)) {
            return 500 + this.checkStraight(hand);
        } else if (this.checkGroup(hand, 3)) {
            return 400 + this.checkGroup(hand, 3);
        } else if (this.checkTwoPair(hand)) {
            return 300 + this.checkTwoPair(hand);
        } else if (this.checkGroup(hand, 2)) {
            return 200 + this.checkGroup(hand, 2);
        } else return this.getHighestCard(hand).number;
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

    checkGroup(hand, type) { //Checks Pokers(4), Three of a kind(3) or Pairs(3)
        let pokers = this.deck.numbers.map((number) => {
            let cardsOfaNumber = hand.filter((card) => card.number == number);
            if (cardsOfaNumber.length == type) return number;
            else return 0;
        });
        return Math.max(...pokers);
    }

    checkFullHouse(hand) {
        let trio = this.checkGroup(hand, 3);
        if (trio == 0) return 0;
        let trioless = hand.filter((card) => card.number != trio);
        let pair = this.checkGroup(trioless, 2);
        if (pair > 0) return trio;
        else return 0;
    }

    checkTwoPair(hand) {
        let pair1 = this.checkGroup(hand, 2);
        if (pair1 == 0) return 0;
        let pairless = hand.filter((card) => card.number != pair1);
        let pair2 = this.checkGroup(pairless, 2);
        if (pair2 > 0) return pair1;
        else return 0;
    }

    getHighestCard(hand) {
        let handNumbers = hand.map((card) => { return card.getNumber() });
        let highest = Math.max(...handNumbers);
        return hand[handNumbers.indexOf(highest)];
    }
}
export default Poker;
