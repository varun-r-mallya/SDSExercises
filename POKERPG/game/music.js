export var Music = {
    Opening: null,
    Starter: null,
    Search: null,
    Battle: null,
    Victory: null,
    GameOver: null,
    playOpening: function() {
        this.stopAll();
        this.Opening = new Audio("/game/assets/audio/opening.mp3");
        this.Opening.loop = true;
        this.Opening.play();
        return;
    },
    stopOpening: function() {
        if (this.Opening) {
            this.Opening.pause();
            this.Opening.currentTime = 0;
        }
        return;
    },
    playStarter: function() {
        this.stopAll();
        this.Starter = new Audio("/game/assets/audio/starter.mp3")
        this.Opening.loop = true;
        this.Starter.play();
        return;
    },
    stopStarter: function() {
        if (this.Starter) {
            this.Starter.pause();
            this.Starter.currentTime = 0;
        }
        return;
    },
    playSearch: function() {
        this.stopAll();
        this.Search = new Audio("/game/assets/audio/search.mp3");
        this.Search.loop = true;
        this.Search.play();
        return;
    },
    stopSearch: function() {
        if (this.Search) {
            this.Search.pause();
            this.Search.currentTime = 0;
        }
        return;
    },
    playBattle: function() {
        this.stopAll();
        this.Battle = new Audio("/game/assets/audio/battle.mp3");
        this.Battle.loop = true;
        this.Battle.play();
        return;
    },
    stopBattle: function() {
        if (this.Battle) {
            this.Battle.pause();
            this.Battle.currentTime = 0;
        }
        return;
    },
    playVictory: function() {
        this.stopAll();
        this.Victory = new Audio("/game/assets/audio/victory.mp3");
        this.Victory.loop = true;
        this.Victory.play();
        return;
    },
    stopVictory: function() {
        if (this.Victory) {
            this.Victory.pause();
            this.Victory.currentTime = 0;
        }
        return;
    },
    playGameOver: function() {
        this.stopAll();
        this.GameOver = new Audio("/game/assets/audio/gameover.mp3");
        this.GameOver.loop = true;
        this.GameOver.play();
        return;
    },
    stopGameOver: function() {
        if (this.GameOver) {
            this.GameOver.pause();
            this.GameOver.currentTime = 0;
        }
        return;
    },
    stopAll: function() {
        this.stopBattle();
        this.stopGameOver();
        this.stopOpening();
        this.stopSearch();
        this.stopStarter();
        this.stopVictory();
        return;
    }
};