import { battleMaker } from './battleMaker.js';
export var pokemonBattle = {
    start: function(canvas, x, y, keydownHandler) {
    var context = canvas.getContext('2d');
    let pokemon = new Image();
    let screen = new Image();
    let screen_sad = new Image();
    let BattleChoice = new Image();
    let wild = new Image();
    BattleChoice.src = '/game/assets/battle.png';
    screen.src = '/game/assets/screen1.png';
    screen_sad.src = '/game/assets/screen_sad.png';
    wild.src = '/game/assets/wild.png';
    
    let randomChance = Math.floor(Math.random() * 10) + 1;          //reset value to 10
    if (randomChance === 1) {
        let randomId = Math.floor(Math.random() * 898) + 1;
        fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
            .then(response => response.json())
            .then(data => {
                pokemon.src = data.sprites.front_default;

                pokemon.onload = function() {
                    context.drawImage(screen, 520, 110);
                    context.drawImage(pokemon, 600, 115, 250, 250);
                    pokemonBattle.youFound(data, context);
                    context.drawImage(BattleChoice, 547, 446);
                    context.fillStyle = 'black';
                    context.drawImage(wild, 510, 10);
                    context.font = '20px "Press Start 2P"';
                    context.fillText(`${data.name}`, 650, 50);
                }
            let keydownHandler2 = (function(event) {
                window.removeEventListener('keydown', keydownHandler);   
                if(event.key.toLowerCase() === 'y'){
                    localStorage.setItem('activation2', false);
                    localStorage.setItem('vsData', "");
                    localStorage.setItem('vsData', JSON.stringify(data));
                    battleMaker.start(canvas, keydownHandler2);
                    window.removeEventListener('keydown', keydownHandler2);
                }
                if(event.key.toLowerCase() === 'z'){
                    context.drawImage(screen, 520, 110);
                    context.drawImage(screen_sad, 520, 120);
                    window.addEventListener('keydown', keydownHandler);
                    window.removeEventListener('keydown', keydownHandler2);
                    return;
                }
            });
            if(localStorage.getItem("activation2") == "true")
            window.addEventListener('keydown', keydownHandler2);   
            });
    }
    else{
        context.drawImage(screen, 520, 110);
        context.drawImage(screen_sad, 520, 120);
        localStorage.setItem('vsData', "");
    }
    },
    youFound: function(data, context) {
        let pokemonName = data.name;
        let pokemonId = data.id;
        let pokemonType = data.types[0].type.name;
        let pokemonHeight = data.height;
        let pokemonWeight = data.weight;
        let pokemonAbilities = data.abilities.slice(0, 2).map(ability => ability.ability.name).join(', ');
        let pokemonMoves1 = data.moves.slice(0, 2).map(move => move.move.name).join(', ');
        let pokemonMoves2 = data.moves.slice(2, 5).map(move => move.move.name).join(', ');
        let pokemonMoves3 = data.moves.slice(5, 8).map(move => move.move.name).join(', ');

        let pokemonInfo = `You found a ${pokemonName}!`;
        let pokemonInfo2 = `Type: ${pokemonType}`;
        let pokemonInfo3 = `Abilities: ${pokemonAbilities}`;
        let pokemonInfo4 = `Moves: ${pokemonMoves1}`;
        let pokemonInfo5 = `${pokemonMoves2}`;
        let pokemonInfo6 = `${pokemonMoves3}`;
        context.font = '10px "Press Start 2P"';
        context.fillStyle = 'black';
        context.fillText(pokemonInfo, 547, 360);
        context.fillText(pokemonInfo2, 547, 380);
        context.fillText(pokemonInfo3, 547, 400);
        context.fillText(pokemonInfo4, 547, 420);
        context.fillText(pokemonInfo5, 547, 440);


    }

}