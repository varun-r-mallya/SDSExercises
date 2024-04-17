import { Music } from './music.js';
import {lose} from './lose.js';
import {win} from './win.js';
export var realBattle = {
    myHP: 100,
    oppHP: 100,
    start: function(canvas, pokemonData, vsData) {
        Music.stopGameOver();
        Music.stopStarter();
        Music.stopOpening();

        var context = canvas.getContext('2d');
        let myPokemon = new Image();
        let vsPokemon = new Image();
        myPokemon.src = pokemonData.sprites.back_default;
        vsPokemon.src = vsData.sprites.front_default;
        context.fillStyle = 'white';
        context.clearRect(0, 0, canvas.width, canvas.height);
        myPokemon.onload = function() {
            context.drawImage(myPokemon, 50, 250, 300, 300);
            context.drawImage(vsPokemon, 600, 10, 300, 300);
        }
        this.hpRenderer(canvas, this.myHP, this.oppHP);
        let keydownHandler = null;
        this.moveDeciderMy(pokemonData, vsData, canvas, keydownHandler);
        return;
    },
    moveDeciderMy: function(pokemonData, vsData, canvas, keydownHandler) {
        let moves = pokemonData.moves;
        let move1 = new Image();
        let move2 = new Image();
        let move3 = new Image();
        let move4 = new Image();
        let move5 = new Image();
        let move6 = new Image();
        move1.src = 'SDSExecises/game/assets/optA.png';
        move2.src = 'SDSExecises/game/assets/optB.png';
        move3.src = 'SDSExecises/game/assets/optC.png';
        move4.src = 'SDSExecises/game/assets/optD.png';
        move5.src = 'SDSExecises/game/assets/optE.png';
        move6.src = 'SDSExecises/game/assets/optF.png';
        let context = canvas.getContext('2d');
        context.fillStyle = 'black';
        context.font = '10px "Press Start 2P"';
        move6.onload = function() {
            context.drawImage(move1, 430, 330, 200, 50);
            context.fillText(`${moves[0].move.name}`, 465, 365);
            context.drawImage(move2, 430, 380, 200, 50);
            context.fillText(`${moves[1].move.name}`, 465, 415);
            context.drawImage(move3, 430, 430, 200, 50);
            context.fillText(`${moves[2].move.name}`, 465, 465);
            context.drawImage(move4, 630, 330, 200, 50);
            context.fillText(`${moves[3].move.name}`, 665, 365);
            context.drawImage(move5, 630, 380, 200, 50);
            context.fillText(`${moves[4].move.name}`, 665, 415);
            context.drawImage(move6, 630, 430, 200, 50);
            context.fillText(`${moves[5].move.name}`, 665, 465);
        }
        keydownHandler = function(event) {
            if(event.key.toLowerCase() === 'a'){
                let myMove = moves[0].move.name;
                let oppMove = realBattle.moveDeciderVs(vsData);
                realBattle.moveResolver(myMove, oppMove, canvas, keydownHandler, pokemonData, vsData);
            }
            if(event.key.toLowerCase() === 'b'){
                let myMove = moves[1].move.name;
                let oppMove = realBattle.moveDeciderVs(vsData);
                realBattle.moveResolver(myMove, oppMove, canvas, keydownHandler, pokemonData, vsData);
            }
            if(event.key.toLowerCase() === 'c'){
                let myMove = moves[2].move.name;
                let oppMove = realBattle.moveDeciderVs(vsData);
                realBattle.moveResolver(myMove, oppMove, canvas, keydownHandler, pokemonData, vsData);
            }
            if(event.key.toLowerCase() === 'd'){
                let myMove = moves[3].move.name;
                let oppMove = realBattle.moveDeciderVs(vsData);
                realBattle.moveResolver(myMove, oppMove, canvas, keydownHandler, pokemonData, vsData);    
            }
            if(event.key.toLowerCase() === 'e'){
                let myMove = moves[4].move.name;
                let oppMove = realBattle.moveDeciderVs(vsData);
                realBattle.moveResolver(myMove, oppMove, canvas, keydownHandler, pokemonData, vsData);
            }
            if(event.key.toLowerCase() === 'f'){
                let myMove = moves[5].move.name;
                let oppMove = realBattle.moveDeciderVs(vsData);
                realBattle.moveResolver(myMove, oppMove, canvas, keydownHandler, pokemonData, vsData);
            }

        };
        window.addEventListener('keydown', keydownHandler);
        return;
    },
    moveDeciderVs: function(vsData) {
        let moves = vsData.moves;
        let move = moves[Math.floor(Math.random() * moves.length)];
        return move.move.name;
    },
    hpRenderer: function(canvas){
        var myHPBar = new Image();
        var oppHPBar = new Image();
        var context = canvas.getContext('2d');
        switch (true) {
            case this.myHP <= 0:
            myHPBar.src = 'SDSExercises/game/assets/hp0.png';
            case this.myHP <= 10:
            myHPBar.src = 'SDSExercises/game/assets/hp10.png';
            break;
            case this.myHP <= 30:
            myHPBar.src = 'SDSExercises/game/assets/hp30.png';
            break;
            case this.myHP <= 50:
            myHPBar.src = 'SDSExercises/game/assets/hp50.png';
            break;
            case this.myHP <= 70:
            myHPBar.src = 'SDSExercises/game/assets/hp70.png';
            break;
            case this.myHP <= 90:
            myHPBar.src = 'SDSExercises/game/assets/hp90.png';
            break;
            case this.myHP <= 100:
            myHPBar.src = 'SDSExercises/game/assets/hp100.png';
            break;
        }

        switch (true) {
            case this.myHP <= 0:
            oppHPBar.src = 'SDSExercises/game/assets/hp0.png';
            case this.oppHP <= 10:
            oppHPBar.src = 'SDSExercises/game/assets/hp10.png';
            break;
            case this.oppHP <= 30:
            oppHPBar.src = 'SDSExercises/game/assets/hp30.png';
            break;
            case this.oppHP <= 50:
            oppHPBar.src = 'SDSExercises/game/assets/hp50.png';
            break;
            case this.oppHP <= 70:
            oppHPBar.src = 'SDSExercises/game/assets/hp70.png';
            break;
            case this.oppHP <= 90:
            oppHPBar.src = 'SDSExercises/game/assets/hp90.png';
            break;
            case this.oppHP <= 100:
            oppHPBar.src = 'SDSExercises/game/assets/hp100.png';
            break;
        }
        myHPBar.onload = function() {
            context.drawImage(myHPBar, 50, 500, 300, 30);
            context.drawImage(oppHPBar, 600, 280, 300, 30);
        }
        return;

    },
    moveResolver: function(myMove, oppMove, canvas, keydownHandler) {
        console.log(this.myHP, this.oppHP, myMove, oppMove);
        myMove.length > oppMove.length ? this.oppHP -= 10 : this.myHP -= 10;
        let context = canvas.getContext('2d');
        context.fillStyle = 'black';
        context.font = '18px "Press Start 2P"';
        context.clearRect(0, 0, 600, 150);
        context.fillText(`You used ${myMove}`, 50, 50);
        context.fillText(`Opponent used ${oppMove}`, 50, 100);
        let pokeball = new Image();
        pokeball.src = 'SDSExercises/game/assets/pokeball.png';
        pokeball.onload = function() {
            context.drawImage(pokeball, 20, 150, 125, 125);
        }
        if(this.myHP <= 0){
            Music.playGameOver();
            Music.stopBattle();
            window.removeEventListener('keydown', keydownHandler);
            lose.lose(canvas);
            return;
        }
        if(this.oppHP <= 0){
            Music.playVictory();
            Music.stopBattle();
            window.removeEventListener('keydown', keydownHandler);
            win.win(canvas);
            return;
        }
        this.hpRenderer(canvas);
        return;
    },
}