import Poker from "./Poker.mjs"
import { question } from "readline-sync";

let game = new Poker();
let finishGame = false;

do {
    let name = question("Name player: ");
    let money = question("Number of chips? (recomended 100): ")
    game.addPlayer(name, money)
} while (ask("Another player? (y/n)")[1] === "y");

game.suffleCards();
game.dealCards();

do {

}while(!finishGame)