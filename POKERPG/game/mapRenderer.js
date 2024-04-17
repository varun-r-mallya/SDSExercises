import {pokemonFind} from './pokemonFind.js';
export var MapRenderer = {
    character_x: 20,
    character_y: 20,
    currentMap: new Image(),
    start: function(canvas, activation) {
        var context = canvas.getContext('2d');
        MapRenderer.currentMap.src = '/game/assets/map.png';
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
        setTimeout(function() { MapRenderer.currentMap.onload = function() {
            context.drawImage(this.currentMap, 10, 20);
        };}, 500);
        this.character_render(canvas, this.currentMap);
        this.mapTextRender(canvas);
        if(!activation){
            return;
        }
    },
    character_render: function(canvas, map, activation) {
        var context = canvas.getContext('2d');
        let character = new Image();
        character.src = '/game/assets/character.png';
        let isRendering = false;
        character.onload = function() {
            context.drawImage(character, MapRenderer.character_x, MapRenderer.character_y, 50, 50);
        }

        let keydownHandler = function(event){
            if (!isRendering) {
                isRendering = true;
                if(event.key === 'ArrowRight' && MapRenderer.character_x <= 450) {MapRenderer.character_x += 20;  pokemonFind.start(canvas, MapRenderer.character_x, MapRenderer.character_y, activation, keydownHandler);}
                else if(event.key === 'ArrowLeft'&& MapRenderer.character_x >= 25) {MapRenderer.character_x -= 30; pokemonFind.start(canvas, MapRenderer.character_x, MapRenderer.character_y, activation, keydownHandler);}
                else if(event.key === 'ArrowUp' && MapRenderer.character_y >= 25) {MapRenderer.character_y -= 20; pokemonFind.start(canvas, MapRenderer.character_x, MapRenderer.character_y, activation, keydownHandler);}
                else if(event.key === 'ArrowDown' && MapRenderer.character_y <= 450) {MapRenderer.character_y += 20; pokemonFind.start(canvas, MapRenderer.character_x, MapRenderer.character_y, activation, keydownHandler);}
                if(event.key === 'ArrowRight' && MapRenderer.character_x >= 450) {MapRenderer.character_x = 20; pokemonFind.start(canvas, MapRenderer.character_x, MapRenderer.character_y, activation, keydownHandler); MapRenderer.imageChange(canvas, "right", map);}
                else if(event.key === 'ArrowRight' && MapRenderer.character_x <= 25) {MapRenderer.character_x = 450; pokemonFind.start(canvas, MapRenderer.character_x, MapRenderer.character_y, activation, keydownHandler); MapRenderer.imageChange(canvas, "left", map);}
                else if(event.key === 'ArrowUp' && MapRenderer.character_y <= 25) {MapRenderer.character_y = 450; pokemonFind.start(canvas, MapRenderer.character_x, MapRenderer.character_y, activation, keydownHandler); MapRenderer.imageChange(canvas, "down", map);}
                else if(event.key === 'ArrowDown' && MapRenderer.character_y >= 450) {MapRenderer.character_y = 20; pokemonFind.start(canvas, MapRenderer.character_x, MapRenderer.character_y, activation, keydownHandler); MapRenderer.imageChange(canvas, "up", map);}
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
        text1.src = '/game/assets/movearound.png';
        text1.onload = function() {
            context.drawImage(text1, 510, 10);
        }
        let screen = new Image();
        screen.src = '/game/assets/screen1.png';
        screen.onload = function() {
            context.drawImage(screen, 520, 110);
        }
    },
    imageChange: function(canvas, direction, map){
        if(direction === "right"){
            map.src = 'https://i.dstatic.com/images/maps/2016/overworld8.png';
        }
        if(direction === "left"){
            map.src = 'https://i.dstatic.com/images/maps/2016/overworld7.png';
        }
        if(direction === "up"){
            map.src = 'https://i.dstatic.com/images/maps/2016/overworld6.png';
        }
        if(direction === "down"){
            map.src = 'https://i.dstatic.com/images/maps/2016/overworld5.png';
        }
        let context = canvas.getContext('2d');
        map.onload = function() {
            context.drawImage(map, 10, 20);
        }
        return;
    }

    
}