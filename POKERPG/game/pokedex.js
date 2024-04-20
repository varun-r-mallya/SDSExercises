export var pokeDex = {
    start: function(canvas) {
        var context = canvas.getContext('2d');
        let pokedex = new Image();
        pokedex.src = '/game/assets/pokedex2.png';
        pokedex.onload = function() {
            context.drawImage(pokedex, 0, 0);
        }
        let pokemonData = localStorage.getItem('pokemonData');
        let vsData = localStorage.getItem('vsData');
        if(vsData) {
            
        }
    },
    getPokemonStats: async function(pokemon) {
        
        const hp = response.stats[0].base_stat * 4;
        const attack = response.stats[1].base_stat;
        const defense = response.stats[2].base_stat;
        const speed = response.stats[3].base_stat;
        const stats = { hp: hp, attack: attack, defense: defense, speed: speed };
        
    },
    getPokemonSound: async function(pokemon) {
        const response = await pokeDex.getPokemonData(pokemon);
        const sound = response.cries.legacy;
        return new Promise((resolve) => {
            resolve(sound);
        })
    },
    getPokemonData: async function(pokemon) {
        return new Promise((resolve) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(response => {
            if(!response.ok) {
                console.error("Network Error");
            }
            resolve(response.json());
        })
        .then(data => console.log(data))
        .catch(error => console.error("Problem with fetch", error));
        });
    }
}