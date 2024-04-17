import { Music } from "./music.js";
import { pokemonBattle } from "./pokemonBattle.js";
export var FightMap = {
    character_x: 20,
    character_y: 20,
    start: function(canvas) {
        var context = canvas.getContext('2d');
        let pokemonData = JSON.parse(localStorage.getItem('pokemonData'));
        context.fillStyle = 'white';
        context.fillRect(0, 0, 960, 540);
        setInterval(Music.stopStarter(), 500);
        setInterval(Music.stopOpening(), 500);
        Music.playSearch();
        FightMap.drawScene(canvas, pokemonData);
        return;
    },
    drawScene: function(canvas, pokemonData) {
        var context = canvas.getContext('2d');
        let map = new Image();
        map.src = '/game/assets/map2.png';
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
        map.onload = function() {
            context.drawImage(map, 10, 20);
        };
        this.character_render(canvas, map);
        this.mapTextRender(canvas);
    },
    character_render: function(canvas, map) {
        var context = canvas.getContext('2d');
        let character = new Image();
        character.src = '/game/assets/character.png';
        let isRendering = false;

        character.onload = function() {
            context.drawImage(character, FightMap.character_x, FightMap.character_y, 50, 50);
        }

        let keydownHandler = function(event){
            if (!isRendering) {
                isRendering = true;
                if(event.key === 'ArrowRight' && FightMap.character_x <= 450) {FightMap.character_x += 20;  pokemonBattle.start(canvas, FightMap.character_x, FightMap.character_y, keydownHandler, true); FightMap.topTextRender(canvas);}
                else if(event.key === 'ArrowLeft'&& FightMap.character_x >= 25) {FightMap.character_x -= 20; pokemonBattle.start(canvas, FightMap.character_x, FightMap.character_y, keydownHandler, true); FightMap.topTextRender(canvas);}
                else if(event.key === 'ArrowUp' && FightMap.character_y >= 25) {FightMap.character_y -= 20; pokemonBattle.start(canvas, FightMap.character_x, FightMap.character_y, keydownHandler, true); FightMap.topTextRender(canvas);}
                else if(event.key === 'ArrowDown' && FightMap.character_y <= 450) {FightMap.character_y += 20; pokemonBattle.start(canvas, FightMap.character_x, FightMap.character_y, keydownHandler, true); FightMap.topTextRender(canvas);}
                context.drawImage(map, 10, 20);
                context.drawImage(character, FightMap.character_x, FightMap.character_y, 50, 50);
                setTimeout(function() {
                    isRendering = false;
                }, 500);
            }
        }
        window.addEventListener('keydown', keydownHandler);
    },
    mapTextRender: function(canvas) {
        var context = canvas.getContext('2d');
        let text1 = new Image();
        text1.src = '/game/assets/movearound2.png';
        text1.onload = function() {
            context.drawImage(text1, 510, 10);
        }
        let screen = new Image();
        screen.src = '/game/assets/screen1.png';
        screen.onload = function() {
            context.drawImage(screen, 520, 110);
        }
    },
    topTextRender: function(canvas){
        var context = canvas.getContext('2d');
        let text1 = new Image();
        text1.src = '/game/assets/movearound2.png';
        text1.onload = function() {
            context.drawImage(text1, 510, 10);
        }
    }

}