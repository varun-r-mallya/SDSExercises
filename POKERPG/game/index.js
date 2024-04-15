import { Music } from './music.js';
import { Instructions } from './Instructions.js'
var startButton = document.querySelector('button');
var GameArea = {
    canvas: document.createElement('canvas'),
    start: function() {
        this.canvas.width = 960;
        this.canvas.height = 540;
        this.context = this.canvas.getContext('2d');
        startButton.parentNode.replaceChild(this.canvas, startButton);
    }
}


startButton.addEventListener('click', function() {
    GameArea.start();
    Music.playOpening();                              //TODO - uncomment later to give music
    Instructions.start(GameArea.canvas);
    //MapRenderer.start(GameArea.canvas);
    
});

