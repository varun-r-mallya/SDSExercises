import { Music } from './music.js';
import {realBattle} from './realBattle.js';
export var battleMaker = {
    start: function (canvas) {
        var context = canvas.getContext('2d');
        let pokemonData = JSON.parse(localStorage.getItem('pokemonData'));
        let vsData = JSON.parse(localStorage.getItem('vsData'));
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
        Music.stopOpening();
        Music.stopStarter
        Music.stopSearch();
        Music.playBattle();
        battleMaker.drawScene(canvas, pokemonData, vsData);
    },
    drawScene: function(canvas, pokemonData, vsData) {
        var context = canvas.getContext('2d');
        let myPokemon = new Image();
        let vsPokemon = new Image();
        myPokemon.src = pokemonData.sprites.front_default;
        vsPokemon.src = vsData.sprites.front_default;
        let shake = 0;
        let shakeAmount = 10;
        context.fillStyle = 'black';
        let shakeInterval = setInterval(function() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(myPokemon, 100 + shake, 100 + shake, 300, 300);
            context.drawImage(vsPokemon, 600 + shake, 100 + shake, 300, 300);
            context.font = '40px "Press Start 2P"';
            context.fillText("VS", 450 + shake, 250 + shake);
            context.font = '20px "Press Start 2P"';
            context.fillText(pokemonData.name, 150 + shake, 450 + shake);
            context.fillText(vsData.name, 675 + shake, 450 + shake);
            shake = shake === 0 ? shakeAmount : 0;
        }, 100);
        setTimeout(function() {
            clearInterval(shakeInterval);
        }, 2000);
        realBattle(canvas, pokemonData, vsData);
    }

}