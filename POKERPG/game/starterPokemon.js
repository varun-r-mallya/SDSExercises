import { Music } from "./music.js";
import {FightMap} from "./fightMap.js";
export var starterPokemon = {
    start: function(canvas) {
        var context = canvas.getContext('2d');
        let pokemonData = JSON.parse(localStorage.getItem('pokemonData'));
        let pokemonName = pokemonData.name;
        let pokemon_starter = new Image();
        pokemon_starter.src = pokemonData.sprites.front_default;
        console.log(pokemon_starter);
        context.fillStyle = 'white';
        context.fillRect(0, 0, 960, 540);
        pokemon_starter.onload = function() {
            context.drawImage(pokemon_starter, 330, 50, 300, 300);
        };
        let pokeball = new Image();
        let pokeball2 = new Image();
        pokeball.src = '/game/assets/pokeball.png';
        pokeball2.src = '/game/assets/pokeball2.png';
        context.font = '30px "Press Start 2P"';
        context.fillStyle = 'black';
        context.fillText(`You chose ${pokemonName.slice(0,13)}!`, 200, 400);
        Music.stopOpening();
        Music.playStarter();
        pokeball.onload = setTimeout(function() {
                context.drawImage(pokeball, 20, 40, 300, 300);
                context.drawImage(pokeball, 640, 40, 300, 300);
            }, 500);
        pokeball.onload = setTimeout(function() {
            context.drawImage(pokeball2, 20, 40, 300, 300);
            context.drawImage(pokeball2, 640, 40, 300, 300);
        }, 1000);
        pokeball.onload = setTimeout(function() {
            context.drawImage(pokeball, 20, 40, 300, 300);
            context.drawImage(pokeball, 640, 40, 300, 300);
        }, 1500);
        setTimeout(function() {
            context.fillText('Press Enter to start the battle!', 10, 450);
        }, 2000);
        let keydownHandler = function(event) {
            if (event.key === 'Enter') {
                let activation2 = localStorage.setItem('activation2', true);
                window.removeEventListener('keydown', keydownHandler);
                Music.stopStarter();
                FightMap.start(canvas);
            }
        }
        setTimeout(function() {
        window.addEventListener('keydown', keydownHandler);
        }, 2000);

    }
}