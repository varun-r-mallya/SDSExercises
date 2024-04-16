export var Music = {
    Opening: null,
    Starter: null,
    Search: null,
    Battle: null,
    Victory: null,
    GameOver: null,
    playOpening: function() {
        this.Opening = new Audio("https://epsilon.vgmsite.com/soundtracks/pokemon-game-boy-pok-mon-sound-complete-set-play-cd/vfywpihuos/1-01.%20Opening.mp3");
        this.Opening.loop = true;
        this.Opening.play();
    },
    stopOpening: function() {
        if (this.Opening) {
            this.Opening.pause();
            this.Opening.currentTime = 0;
        }
    },
    playStarter: function() {
        this.Starter = new Audio("https://epsilon.vgmsite.com/soundtracks/pokemon-game-boy-pok-mon-sound-complete-set-play-cd/zqjgamugau/1-08.%20Victory%20%28Vs.%20Wild%20Pok%C3%A9mon%29.mp3")
        this.Opening.loop = true;
        this.Starter.play();
    },
    stopStarter: function() {
        if (this.Starter) {
            this.Starter.pause();
            this.Starter.currentTime = 0;
        }
    },
    playSearch: function() {
        this.Search = new Audio("https://epsilon.vgmsite.com/soundtracks/pokemon-game-boy-pok-mon-sound-complete-set-play-cd/kihjfondbh/1-12.%20Viridian%20Forest.mp3");
        this.Search.loop = true;
        this.Search.play();
    },
    stopSearch: function() {
        if (this.Search) {
            this.Search.pause();
            this.Search.currentTime = 0;
        }
    },
    playBattle: function() {
        this.Battle = new Audio("https://epsilon.vgmsite.com/soundtracks/pokemon-game-boy-pok-mon-sound-complete-set-play-cd/wpfiaxpxan/1-07.%20Battle%20%28Vs.%20Wild%20Pok%C3%A9mon%29.mp3");
        this.Battle.loop = true;
        this.Battle.play();
    },
    stopBattle: function() {
        if (this.Battle) {
            this.Battle.pause();
            this.Battle.currentTime = 0;
        }
    },
    playVictory: function() {
        this.Victory = new Audio("https://epsilon.vgmsite.com/soundtracks/pokemon-game-boy-pok-mon-sound-complete-set-play-cd/xgzrmqyzaq/1-16.%20Victory%20%28Vs.%20Trainer%29.mp3");
        this.Victory.play();
    },
    stopVictory: function() {
        if (this.Victory) {
            this.Victory.pause();
            this.Victory.currentTime = 0;
        }
    },
    playGameOver: function() {
        this.GameOver = new Audio("https://epsilon.vgmsite.com/soundtracks/pokemon-game-boy-pok-mon-sound-complete-set-play-cd/swpaozkibj/1-13.%20Guide.mp3");
        this.GameOver.play();
    },
    stopGameOver: function() {
        if (this.GameOver) {
            this.GameOver.pause();
            this.GameOver.currentTime = 0;
        }
    },
};