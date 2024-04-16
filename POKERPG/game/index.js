import { Music } from './music.js';
import { Instructions } from './Instructions.js'
import { starterPokemon } from './starterPokemon.js';
import { battleMaker } from './battleMaker.js';
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
    let activation = localStorage.setItem('activation', true);        //TODO -uncomment 
    Instructions.start(GameArea.canvas, activation);                  //TODO -uncomment
    //starterPokemon.start(GameArea.canvas);                          //TODO -uncomment
    // battleMaker.start(GameArea.canvas);
    
});

