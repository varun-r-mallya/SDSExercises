var startButton = document.querySelector('button');
var GameCanvas = document.createElement('canvas');
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
});