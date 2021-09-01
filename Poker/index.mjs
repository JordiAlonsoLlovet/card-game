import Poker from "./Poker.mjs"
import { question } from "readline-sync";

var game = new Poker();
const BET = 5;

do {
    let name = question("Name player: ");
    //let money = question("Number of chips? (recomended 100): ")
    game.addPlayer(name, 100)
} while (question("Another player? (y/n)").charAt(0) === 'y');

game.shuffleCards();
var players = game.getPlayerList();

do { //Each loop is a round
    game.dealCards();
    players.forEach((player)=> { //Each player can choose to discard one or two cards
        game.makeBet(player, BET); //every player makes an initial bet
        let state = game.getPlayerState(player);
        console.log(`\nIt's ${player}'s chance to discard.\n`)
        console.log(`[1] - ${state[0][0]}`);
        console.log(`[2] - ${state[0][1]}`); //Print cards on hand
        let discard = question("Do you want to discard a card (1/2), discard both cards (3) or keep your hand (leave blank)? ");
        switch (discard.charAt(0)) {
            case '1':
                game.changeCard(player, 0);
                break;
            case '3':
                game.changeCard(player, 0);
            case '2':
                game.changeCard(player, 1);
                break;
            default:
                break;
        }
    });
    var endRound = false;
    do {
        players.forEach((player) => { //Each loop is a player's turn to bet
            console.log(`\nIt's ${player}'s turn`);
            let state = game.getPlayerState(player);
            let table = game.getCardsOnTable();
            table.forEach((card) => console.log(`[${card}]`));
            console.log(`\nMoney: ${state[1]}         Bet: ${state[2]}`)
            console.log(`Cards: ${state[0][0]} | ${state[0][1]}`)
            console.log(`The current bet is ${game.getCurrentBet()}`)
            console.log("\nYou can raise (1)")
            if (state[2] == game.getCurrentBet()) {
                console.log("Or you can Check (2)")
            } else {
                console.log("You can Call (2)")
                console.log("Or you can fold (3)")
            }
            let action = question("What do you want to do? ").charAt(0);
            let dif = game.getCurrentBet() - state[2];
            switch (action) {
                case '1':
                    
                    game.makeBet(player, dif + BET);
                    break;
                case '2':
                    game.makeBet(player, dif);
                    break;
                case '3':
                    game.foldPlayer(player);
                    break;
            }
        });
        players = game.getPlayerList(); //update players to remove folded ones
        endRound = game.endLoop();
    } while (endRound === false);
    console.log(`${endRound[0]} has won ${endRound[1]} coins!`);
    

} while (question("Do you want to play another round? (y/n)").charAt(0) !== 'n')