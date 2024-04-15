import { MapRenderer } from './mapRenderer.js';
export var Instructions = {
    start: function(canvas) {
        var context = canvas.getContext('2d');
        var instructions = new Image();
        instructions.src = '/game/assets/instructions.png';

        instructions.onload = function() {
            context.drawImage(instructions, 0, 0);
        }
        window.addEventListener('keydown', function(event){
            if(event.key === 'Enter') {
                MapRenderer.start(canvas);
            }
        })
    },
}