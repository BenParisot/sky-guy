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
    down: false,

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
            case 40:
                playerController.down = key_state;
                break;
        }
    }
};

const loop = function () {
    if (playerController.up && player.jumping === false) {        
        player.yVelocity -= 20;
        player.jumping = true;
        console.log('jump pressed');
    }
    if (playerController.left) {
        player.xVelocity -= 0.5;
        console.log('left pressed');
    }
    if (playerController.right) {
        player.xVelocity += 0.5;
        console.log('right pressed');
    }
    // if (playerController.down) {
    //     player.yVelocity -= 10;
    //     player.jumping = true;
    //     console.log('down pressed');
    // }

    //gravity
    player.yVelocity += 1;
    player.x += player.xVelocity;
    player.y += player.yVelocity;
    player.xVelocity *= .94;
    player.yVelocity *= 1.2;

    //bottom border?
    if (player.y > 386 - 16 -32) {
        player.jumping = false;
        player.y = 386 - 16 - 32;
        player.yVelocity = 0;
    }

    //top border?
    if (player.y < 20) {
        player.jumping = false;
        player.y = 20;
        player.yVelocity = 0;
    }

    //window loop
    if (player.x < -20) {
        player.x = 1220;
    } else if (player.x > 1220) {
        player.x = -20;
    }

    //background styles
    context.fillStyle = '#81b0c6';
    context.fillRect(0, 0, 1220, 400);

    //player styles
    context.fillStyle = "orange";
    context.beginPath();
    context.rect(player.x, player.y, player.width, player.height);
    context.fill();

    //border-bottom
    context.strokeStyle = "green";
    context.lineWidth = 30;
    context.beginPath();
    context.moveTo(0, 385);
    context.lineTo(1220, 385);
    context.stroke();

     //border-top
     context.strokeStyle = "green";
     context.lineWidth = 30;
     context.beginPath();
     context.moveTo(0, 10);
     context.lineTo(1220, 10);
     context.stroke();

    window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", playerController.keyListener);
window.addEventListener("keyup", playerController.keyListener);
window.requestAnimationFrame(loop);