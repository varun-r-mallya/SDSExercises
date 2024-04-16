export var lose = {
    lose: function(canvas) {
        var context = canvas.getContext('2d');
        let score = localStorage.getItem('score');
        score--;
        localStorage.setItem('score', score);
        context.fillStyle = 'black';
        context.fillRect(0, 0, 960, 540);
        context.fillStyle = 'white';
        context.font = '30px "Press Start 2P"';
        context.fillText('You lose!', 350, 300);
        context.fillText(`Your score:${score}!`, 300, 330);
    }
}