import { Music } from './music.js';
import { Instructions } from './Instructions.js'
// import { starterPokemon } from './starterPokemon.js';
import { battleMaker } from './battleMaker.js';
import { pokeDex } from './pokedex.js';
var startButton = document.getElementById('startbutton');
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
    Music.playOpening();                              
    let activation = localStorage.setItem('activation', true);        //TODO -uncomment
    Instructions.start(GameArea.canvas, activation);                  //TODO -uncomment
    // starterPokemon.start(GameArea.canvas);                          //TODO -uncomment
    // battleMaker.start(GameArea.canvas);
    if(localStorage.getItem('score') === null){
        let score = localStorage.setItem('score', 0);
    }
    
    
});


//POKEDEX

let pokedex = document.getElementById("pokedex");
let btn = document.getElementById("pokedexButton");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  pokedex.style.display = "block";
}
span.onclick = function() {
  pokedex.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == pokedex) {
    pokedex.style.display = "none";
  }
}

let canvas = document.getElementById('pokedexCanvas');
pokeDex.start(canvas);

document.getElementById('search').addEventListener('change', function(event) {
  let inputValue = event.target.value;
  pokeDex.search(inputValue);
});