export var MapRenderer = {
    character_x: 20,
    character_y: 20,
    start: function(canvas) {
        var context = canvas.getContext('2d');
        var map = new Image();
        map.src = '/game/assets/map.png';

        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
        map.onload = function() {
            context.drawImage(map, 10, 20);
        }
        this.character_render(canvas, map);
        this.mapTextRender(canvas);
        this.screenRender(canvas);
    },
    character_render: function(canvas, map) {
        var context = canvas.getContext('2d');
        let character = new Image();
        character.src = '/game/assets/character.png';
        character.onload = function() {
            context.drawImage(character, 20, 20, 50, 50);
        }
        window.addEventListener('keydown', function(event) {
            if(event.key === 'ArrowRight' && MapRenderer.character_x <= 460) MapRenderer.character_x += 5;
            else if(event.key === 'ArrowLeft'&& MapRenderer.character_x >= 10) MapRenderer.character_x -= 5;
            else if(event.key === 'ArrowUp' && MapRenderer.character_y >= 25) MapRenderer.character_y -= 5;
            else if(event.key === 'ArrowDown' && MapRenderer.character_y <= 460) MapRenderer.character_y += 5;
            context.drawImage(map, 10, 20);
            context.drawImage(character, MapRenderer.character_x, MapRenderer.character_y, 50, 50);
            }
    )
    },
    mapTextRender: function(canvas, text) {
        var context = canvas.getContext('2d');
        let text1 = new Image();
        text1.src = '/game/assets/movearound.png';
        text1.onload = function() {
            context.drawImage(text1, 510, 10);
        }
    },
    screenRender: function(canvas) {
        var context = canvas.getContext('2d');
        let screen = new Image();
        screen.src = '/game/assets/screen.png';
        screen.onload = function() {
            context.drawImage(screen, 520, 120);
        }
    },
    

    
}