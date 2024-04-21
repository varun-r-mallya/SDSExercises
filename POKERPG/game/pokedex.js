export var pokeDex = {
    start: function(canvas) {
        var context = canvas.getContext('2d');
        let pokedex = new Image();
        pokedex.src = '/game/assets/pokedex2.png';
        pokedex.onload = function() {
            context.drawImage(pokedex, 0, 0);
        }
    },
    search: async function(pokemon){
        let pokemonData = await this.getPokemonData(pokemon);
        pokeDex.getPokemonSound(pokemonData);
        let stats = await this.getPokemonStats(pokemon);
        pokeDex.displayPokemon(pokemonData, stats);
    },
    getPokemonStats: async function(pokemon) {
        
        const response = await this.getPokemonData(pokemon);
            const type = response.types[0].type.name;
            const hp = response.stats[0].base_stat * 4;
            const attack = response.stats[1].base_stat;
            const defense = response.stats[2].base_stat;
            const speed = response.stats[3].base_stat;
            const stats = { hp: hp, attack: attack, defense: defense, speed: speed, type: type};
            return new Promise((resolve, reject) => {
                resolve(stats);
            });
    },
    getPokemonSound: async function(pokemonData) {
        const sound = pokemonData.cries.legacy;
        let audio = new Audio(sound);
        audio.play();
        return;
    },
    getPokemonData: async function(pokemon) {
        return new Promise((resolve) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(response => {
            if(!response.ok) {
                console.error("Network Error");
                alert("Pokemon with that name does not exist!!!");
            }
            resolve(response.json());
        })
        .catch(error => console.error("Problem with fetch", error));
        });
    },
    displayPokemon: function(pokemonData, stats) {
        let pokemonImage = new Image();
        pokemonImage.src = pokemonData.sprites.front_default;
        let canvas = document.getElementById('pokedexCanvas');
        let context = canvas.getContext('2d');
        pokemonImage.onload = function() {
            context.fillStyle = 'white';
            context.fillRect(80, 178, 165, 165);
            context.drawImage(pokemonImage, 80, 175, 170, 170);
        }
        context.fillStyle = 'white';
        context.fillRect(350, 200, 190, 240);
        context.fillStyle = 'black';
        context.font = '15px "Press Start 2P"';
        context.fillText(`${pokemonData.name}`, 400, 220);
        context.fillText(`HP: ${stats.hp}`, 360, 260);
        context.fillText(`Attack: ${stats.attack}`, 360, 290);
        context.fillText(`Defense: ${stats.defense}`, 360, 320);
        context.fillText(`Speed: ${stats.speed}`, 360, 350);
        context.fillText(`Type:`, 360, 380);
        context.font = '10px "Press Start 2P"';
        context.fillText(`${stats.type}`, 360, 400);


    }
}