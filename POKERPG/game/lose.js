export var lose = {
    lose: function(canvas) {
        var context = canvas.getContext('2d');
        context.fillStyle = 'black';
        context.fillRect(0, 0, 960, 540);
        context.fillStyle = 'white';
        context.font = '30px "Press Start 2P"';
        context.fillText('You lose!', 300, 300);
    }
}