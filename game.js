const context = document.querySelector("canvas").getContext("2d");

context.canvas.width = 1220;
context.canvas.height = 400;

const player = {
    height: 32,
    jumping: true,
    width: 32, 
    x: 0,
    xVelocity: 0,
    y: 0,
    yVelocity: 0
};

const playerController = {

    left: false,
    right: false,
    up: false,

    keyListener: function (event) {
        let key_state = (event.type === 'keydown') ? true: false;

        switch (event.keyCode) {
            case 37:
                playerController.left = key_state;
                break;
            case 38:
                playerController.up = key_state;
                break;
            case 39:
                playerController.right = key_state;
                break;
        }
    }
};

const loop = function () {
    if (playerController.up && player.jumping === false) {        
        player.yVelocity -= 20;
        player.jumping = true;
    }
    if (playerController.left) {
        player.xVelocity -= 0.5;
    }
    if (playerController.right) {
        player.xVelocity += 0.5;
    }

    player.yVelocity += 1.5;
    player.x += player.xVelocity;
    player.y += player.yVelocity;
    player.xVelocity *= 0.9;
    player.yVelocity *= 0.9;

    if (player.y > 386 - 16 -32) {
        player.jumping = false;
        player.y = 386 - 16 - 32;
        player.yVelocity = 0;
    }

    if (player.x < -20) {
        player.x = 1220;
    } else if (player.x > 1220) {
        player.x = -20;
    }

    context.fillStyle = '#81b0c6';
    context.fillRect(0, 0, 1220, 400);

    context.fillStyle = "orange";
    context.beginPath();
    context.rect(player.x, player.y, player.width, player.height);
    context.fill();

    context.strokeStyle = "green";
    context.lineWidth = 30;
    context.beginPath();
    context.moveTo(0, 385);
    context.lineTo(1220, 385);
    context.stroke();

    window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", playerController.keyListener);
window.addEventListener("keyup", playerController.keyListener);
window.requestAnimationFrame(loop);