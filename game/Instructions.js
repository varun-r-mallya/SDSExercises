import { MapRenderer } from './mapRenderer.js';
export var Instructions = {
    start: function(canvas, activation) {
        var context = canvas.getContext('2d');
        var instructions = new Image();
        instructions.src = '/assets/instructions.png';

        instructions.onload = function() {
            context.drawImage(instructions, 0, 0);
        }
        let keydownHandler = function(event){
            if(event.key === 'Enter') {
                MapRenderer.start(canvas, activation);
                window.removeEventListener('keydown', keydownHandler); // Remove the event listener
                if(!activation){
                    return;
                }
            }
        }
        window.addEventListener('keydown', keydownHandler);
        if(!activation){
            return;
        }
    },
}