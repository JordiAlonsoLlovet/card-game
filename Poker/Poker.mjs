import Deck from "./Deck.mjs";
import Player from "./Player.mjs";
import Table from "./Table.mjs";
import Card from "./Card.mjs";

class Poker {
    constructor() {
        this.players = [];
        this.deck = new Deck();
        this.table = new Table();
    }

    getPlayerList() {
        let names = this.players.map((p) => {
            if(p.folded) return ""
            else return p.name;
        });
        return names.filter((n) => n != "");
    }

    getPlayerState(playerName) { //Returns array [cards, money left, money bet on the table]
        let player = this.players.filter((p) => p.name == playerName)[0];
        let result = [];
        result.push(player.getHand());
        result.push(player.money);
        result.push(player.bet);
        return result;
    }

    getCardsOnTable() {
        return this.table.cards.map((card) => { return card.getCardName(); });
    }

    getCurrentBet() {
        let bets = this.players.map((p) => { return p.bet; });
        return Math.max(...bets);
	}
    makeBet(playerName, amount) { 
        this.players.forEach((player)=> {
            if (player.name == playerName) {
                player.makeBet(amount);
            }
        });
    }

    changeCard(playerName, cardIndex) { 
        this.players.forEach((player)=> {
            if (player.name == playerName) {
                let card = this.deck.draw(1);
                player.changeCard(cardIndex, card[0]);
            }
        });
    }

    shuffleCards() { //Refill deck and shufle cards randomly
        this.deck.shuffle();
    }

    addPlayer(name, money) {
        let p = new Player(name, money);
        this.players.push(p);
    }

    foldPlayer(playerName) {
        this.players.forEach((player) => {
            if (player.name == playerName) {
                player.folded = true;
            }
        });
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
            return true;
        }
        else return false;
    }

    endLoop() {
        let players = this.players.filter((p) => !p.folded);
        let end = players.every((p) => p.bet == players[0].bet);
        console.log(end)
        if (end) {
            let moreCards = this.showCard()
            if (!moreCards) {
                //End of the round.
                let winner = this.checkWiner();
                let gain = this.table.players.map((p) => { return p.bet; }).reduce((a, b) => a + b, 0);
                this.table.clear();
                this.players.forEach((p) => {
                    if (p.name == winner) p.win(gain);
                    p.newRound()
                });
                this.players.push(this.players[0]);
                this.players.splice(0, 1); //Move first player to the end

                return [winner, gain];
			}
        }
        return false;
	}

    checkWiner() { //Returns the winner
        let points = this.players.map((p) => {
            if (p.folded) return 0;
            else return this.evaluateHand(p.hand);
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
