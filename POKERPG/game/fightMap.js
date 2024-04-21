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
        let activation2 = localStorage.getItem('activation2');
        console.log(activation2);
        var context = canvas.getContext('2d');
        let character = new Image();
        character.src = '/game/assets/character.png';
        let isRendering = false;

        character.onload = function() {
            context.drawImage(character, FightMap.character_x, FightMap.character_y, 50, 50);
        }
        let keydownHandler = function(event){
            if (!isRendering && localStorage.getItem('activation2') == "true") {
                isRendering = true;
                if(event.key === 'ArrowRight' && FightMap.character_x <= 450) {FightMap.character_x += 20;  pokemonBattle.start(canvas, FightMap.character_x, FightMap.character_y, keydownHandler, activation2); FightMap.topTextRender(canvas);}
                else if(event.key === 'ArrowLeft'&& FightMap.character_x >= 25) {FightMap.character_x -= 20; pokemonBattle.start(canvas, FightMap.character_x, FightMap.character_y, keydownHandler, activation2); FightMap.topTextRender(canvas);}
                else if(event.key === 'ArrowUp' && FightMap.character_y >= 25) {FightMap.character_y -= 20; pokemonBattle.start(canvas, FightMap.character_x, FightMap.character_y, keydownHandler, activation2); FightMap.topTextRender(canvas);}
                else if(event.key === 'ArrowDown' && FightMap.character_y <= 450) {FightMap.character_y += 20; pokemonBattle.start(canvas, FightMap.character_x, FightMap.character_y, keydownHandler, activation2); FightMap.topTextRender(canvas);}
                context.drawImage(map, 10, 20);
                if((FightMap.character_x >= 400 && FightMap.character_y > 140 && FightMap.character_x <= 460 && FightMap.character_y <= 220) || (FightMap.character_x >= 300 && FightMap.character_y > 220 && FightMap.character_x <= 460 && FightMap.character_y <= 460) || (FightMap.character_x >= 220 && FightMap.character_y >= 280 && FightMap.character_x <= 300 && FightMap.character_y <= 460)){ 
                    character.src = '/game/assets/boatchar.png';
                    
                }
                else{
                    character.src = '/game/assets/character.png';
                    
                }
                context.drawImage(character, FightMap.character_x, FightMap.character_y, 50, 50);
                setTimeout(function() {
                    isRendering = false;
                }, 500);
            }
        }
        if(activation2 == "true")
        window.addEventListener('keydown', keydownHandler);
        else
        {
        console.log("error");
        window.removeEventListener('keydown', keydownHandler);
        }
        return;
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