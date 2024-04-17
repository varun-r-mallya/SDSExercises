import {pokemonFind} from './pokemonFind.js';
export var MapRenderer = {
    character_x: 20,
    character_y: 20,
    start: function(canvas, activation) {
        var context = canvas.getContext('2d');
        var map = new Image();
        map.src = 'SDSExercises/game/assets/map.png';

        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
        map.onload = function() {
            context.drawImage(map, 10, 20);
        };
        this.character_render(canvas, map);
        this.mapTextRender(canvas);
        if(!activation){
            return;
        }
    },
    character_render: function(canvas, map, activation) {
        var context = canvas.getContext('2d');
        let character = new Image();
        character.src = 'SDSExercises/game/assets/character.png';
        let isRendering = false;

        character.onload = function() {
            context.drawImage(character, MapRenderer.character_x, MapRenderer.character_y, 50, 50);
        }

        let keydownHandler = function(event){
            if (!isRendering) {
                isRendering = true;
                if(event.key === 'ArrowRight' && MapRenderer.character_x <= 450) {MapRenderer.character_x += 20;  pokemonFind.start(canvas, MapRenderer.character_x, MapRenderer.character_y, activation, keydownHandler);}
                else if(event.key === 'ArrowLeft'&& MapRenderer.character_x >= 25) {MapRenderer.character_x -= 20; pokemonFind.start(canvas, MapRenderer.character_x, MapRenderer.character_y, activation, keydownHandler);}
                else if(event.key === 'ArrowUp' && MapRenderer.character_y >= 25) {MapRenderer.character_y -= 20; pokemonFind.start(canvas, MapRenderer.character_x, MapRenderer.character_y, activation, keydownHandler);}
                else if(event.key === 'ArrowDown' && MapRenderer.character_y <= 450) {MapRenderer.character_y += 20; pokemonFind.start(canvas, MapRenderer.character_x, MapRenderer.character_y, activation, keydownHandler);}
                context.drawImage(map, 10, 20);
                context.drawImage(character, MapRenderer.character_x, MapRenderer.character_y, 50, 50);
                setTimeout(function() {
                    isRendering = false;
                }, 500);
            }
        }
        window.addEventListener('keydown', keydownHandler);
        if(!activation){
            return;
        }
    },
    mapTextRender: function(canvas) {
        var context = canvas.getContext('2d');
        let text1 = new Image();
        text1.src = 'SDSExercises/game/assets/movearound.png';
        text1.onload = function() {
            context.drawImage(text1, 510, 10);
        }
        let screen = new Image();
        screen.src = 'SDSExercises/game/assets/screen1.png';
        screen.onload = function() {
            context.drawImage(screen, 520, 110);
        }
    },


    
}