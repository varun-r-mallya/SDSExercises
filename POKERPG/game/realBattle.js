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
        let pokeball = new Image();
        let fight = new Image();
        fight.src = 'game/assets/fight.png';
        fight.onload = function() {
            context.drawImage(fight, 0,0);
        }
        pokeball.src = 'game/assets/pokeball.png';
        pokeball.onload = function() {
            context.drawImage(pokeball, 20, 150, 125, 125);
        }
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
        move1.src = 'game/assets/optA.png';
        move2.src = 'game/assets/optB.png';
        move3.src = 'game/assets/optC.png';
        move4.src = 'game/assets/optD.png';
        move5.src = 'game/assets/optE.png';
        move6.src = 'game/assets/optF.png';
        let context = canvas.getContext('2d');
        context.fillStyle = 'black';
        context.font = '10px "Press Start 2P"';
        let offset_x = 40;
        let offset_y = 30;
        move6.onload = function() {
            context.drawImage(move1, 450+offset_x, 330+offset_y, 200, 50);
            context.fillText(`${moves[0].move.name}`, 485+offset_x, 365+offset_y);
            context.drawImage(move2, 450+offset_x, 380+offset_y+10, 200, 50);
            context.fillText(`${moves[1].move.name}`, 485+offset_x, 415+offset_y+10);
            context.drawImage(move3, 450+offset_x, 430+offset_y+20, 200, 50);
            context.fillText(`${moves[2].move.name}`, 485+offset_x, 465+offset_y+20);
            context.drawImage(move4, 650+offset_x+10, 330+offset_y, 200, 50);
            context.fillText(`${moves[3].move.name}`, 685+offset_x+10, 365+offset_y);
            context.drawImage(move5, 650+offset_x+10, 380+offset_y+10, 200, 50);
            context.fillText(`${moves[4].move.name}`, 685+offset_x+10, 415+offset_y+10);
            context.drawImage(move6, 650+offset_x+10, 430+offset_y+20, 200, 50);
            context.fillText(`${moves[5].move.name}`, 685+offset_x+10, 465+offset_y+20);
        }
        let timesused = [0, 0, 0, 0, 0, 0];
        keydownHandler = function(event) {
            if(event.key.toLowerCase() === 'a'){
                timesused[0]++;
                if(timesused[0] > 3){
                    context.fillStyle = 'red';
                    context.font = '10px "Press Start 2P"';
                    context.fillText(`${moves[0].move.name}`, 485+offset_x, 365+offset_y);
                    context.clearRect(0, 0, 600, 150);
                    context.fillStyle = 'red';
                    context.font = '15px "Press Start 2P"';
                    context.fillText(`You cannot use this move anymore!!`, 50, 50);
                    return;
                }
                let myMove = moves[0].move.name;
                let oppMove = realBattle.moveDeciderVs(vsData);
                realBattle.moveResolver(myMove, oppMove, canvas, keydownHandler, pokemonData, vsData);
            }
            if(event.key.toLowerCase() === 'b'){
                timesused[1]++;
                if(timesused[1] > 4){
                    context.fillStyle = 'red';
                    context.font = '10px "Press Start 2P"';
                    context.fillText(`${moves[1].move.name}`, 485+offset_x, 415+offset_y+10);
                    context.clearRect(0, 0, 600, 150);
                    context.fillStyle = 'red';
                    context.font = '15px "Press Start 2P"';
                    context.fillText(`You cannot use this move anymore!!`, 50, 50);
                    return;
                }
                let myMove = moves[1].move.name;
                let oppMove = realBattle.moveDeciderVs(vsData);
                realBattle.moveResolver(myMove, oppMove, canvas, keydownHandler, pokemonData, vsData);
            }
            if(event.key.toLowerCase() === 'c'){
                timesused[2]++;
                if(timesused[2] > 3){
                    context.fillStyle = 'red';
                    context.font = '10px "Press Start 2P"';
                    context.fillText(`${moves[2].move.name}`, 485+offset_x, 465+offset_y+20);
                    context.clearRect(0, 0, 600, 150);
                    context.fillStyle = 'red';
                    context.font = '15px "Press Start 2P"';
                    context.fillText(`You cannot use this move anymore!!`, 50, 50);
                    return;
                }
                let myMove = moves[2].move.name;
                let oppMove = realBattle.moveDeciderVs(vsData);
                realBattle.moveResolver(myMove, oppMove, canvas, keydownHandler, pokemonData, vsData);
            }
            if(event.key.toLowerCase() === 'd'){
                timesused[3]++;
                if(timesused[3] > 4){
                    context.fillStyle = 'red';
                    context.font = '10px "Press Start 2P"';
                    context.fillText(`${moves[3].move.name}`, 685+offset_x+10, 365+offset_y);
                    context.clearRect(0, 0, 600, 150);
                    context.fillStyle = 'red';
                    context.font = '15px "Press Start 2P"';
                    context.fillText(`You cannot use this move anymore!!`, 50, 50);
                    return;
                }
                let myMove = moves[3].move.name;
                let oppMove = realBattle.moveDeciderVs(vsData);
                realBattle.moveResolver(myMove, oppMove, canvas, keydownHandler, pokemonData, vsData);    
            }
            if(event.key.toLowerCase() === 'e'){
                timesused[4]++;
                if(timesused[4] > 5){
                    context.fillStyle = 'red';
                    context.font = '10px "Press Start 2P"';
                    context.fillText(`${moves[4].move.name}`, 685+offset_x+10, 415+offset_y+10);
                    context.clearRect(0, 0, 600, 150);
                    context.fillStyle = 'red';
                    context.font = '15px "Press Start 2P"';
                    context.fillText(`You cannot use this move anymore!!`, 50, 50);
                    return;
                }
                let myMove = moves[4].move.name;
                let oppMove = realBattle.moveDeciderVs(vsData);
                realBattle.moveResolver(myMove, oppMove, canvas, keydownHandler, pokemonData, vsData);
            }
            if(event.key.toLowerCase() === 'f'){
                timesused[5]++;
                if(timesused[5] > 4){
                    context.fillStyle = 'red';
                    context.font = '10px "Press Start 2P"';
                    context.fillText(`${moves[5].move.name}`, 685+offset_x+10, 465+offset_y+20);
                    context.clearRect(0, 0, 600, 150);
                    context.fillStyle = 'red';
                    context.font = '15px "Press Start 2P"';
                    context.fillText(`You cannot use this move anymore!!`, 50, 50);
                    return;
                }
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
            myHPBar.src = 'game/assets/hp0.png';
            case this.myHP <= 10:
            myHPBar.src = 'game/assets/hp10.png';
            break;
            case this.myHP <= 30:
            myHPBar.src = 'game/assets/hp30.png';
            break;
            case this.myHP <= 50:
            myHPBar.src = 'game/assets/hp50.png';
            break;
            case this.myHP <= 70:
            myHPBar.src = 'game/assets/hp70.png';
            break;
            case this.myHP <= 90:
            myHPBar.src = 'game/assets/hp90.png';
            break;
            case this.myHP <= 100:
            myHPBar.src = 'game/assets/hp100.png';
            break;
        }

        switch (true) {
            case this.myHP <= 0:
            oppHPBar.src = 'game/assets/hp0.png';
            case this.oppHP <= 10:
            oppHPBar.src = 'game/assets/hp10.png';
            break;
            case this.oppHP <= 30:
            oppHPBar.src = 'game/assets/hp30.png';
            break;
            case this.oppHP <= 50:
            oppHPBar.src = 'game/assets/hp50.png';
            break;
            case this.oppHP <= 70:
            oppHPBar.src = 'game/assets/hp70.png';
            break;
            case this.oppHP <= 90:
            oppHPBar.src = 'game/assets/hp90.png';
            break;
            case this.oppHP <= 100:
            oppHPBar.src = 'game/assets/hp100.png';
            break;
        }
        myHPBar.onload = function() {
            context.fillStyle = 'blue';
            context.font = '20px "Press Start 2P"';
            context.drawImage(myHPBar, 50, 500, 300, 30);
            context.fillText(`   ${realBattle.myHP}/100`, 50, 525);
            context.fillStyle = 'black';
            context.font = '10px "Press Start 2P"';
        }
        oppHPBar.onload = function() {
            context.fillStyle = 'blue';
            context.font = '20px "Press Start 2P"';
            context.drawImage(oppHPBar, 600, 280, 300, 30);
            context.fillText(`   ${realBattle.oppHP}/100`, 600, 305);
            context.fillStyle = 'black';
            context.font = '10px "Press Start 2P"';
        }
        return;

    },
    moveResolver: function(myMove, oppMove, canvas, keydownHandler) {
        console.log(this.myHP, this.oppHP, myMove, oppMove);
        let lossHP = Math.floor(Math.random()*21);
        if(Math.random < 0.5){
            myMove.length > oppMove.length ? this.oppHP -= lossHP : this.myHP -= lossHP;    
        }
        else{
            oppMove.length > myMove.length ? this.myHP -= lossHP : this.oppHP -= lossHP;    
        }
        
        let context = canvas.getContext('2d');
        context.clearRect(0, 0, 600, 150);
        context.fillStyle = 'black';
        context.font = '18px "Press Start 2P"';
        context.fillText(`You used ${myMove}`, 50, 50);
        context.fillText(`Opponent used ${oppMove}`, 50, 100);

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