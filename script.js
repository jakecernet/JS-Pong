// Get canvas and context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Set ball properties
const ballRadius = 10;
let ballX = canvasWidth / 2;
let ballY = canvasHeight / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

// Set paddle properties
const paddleWidth = 10;
const paddleHeight = 100;
const paddleSpeed = 10;
let player1Y = (canvasHeight - paddleHeight) / 2;
let player2Y = (canvasHeight - paddleHeight) / 2;

// Set score properties
let player1Score = 0;
let player2Score = 0;

// Draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
}

// Draw paddles
function drawPaddles() {
    // Draw player 1 paddle
    ctx.fillStyle = 'white';
    ctx.fillRect(0, player1Y, paddleWidth, paddleHeight);

    // Draw player 2 paddle
    ctx.fillStyle = 'white';
    ctx.fillRect(canvasWidth - paddleWidth, player2Y, paddleWidth, paddleHeight);
}

// Draw net
function drawNet() {
    ctx.strokeStyle = 'white';
    ctx.setLineDash([10, 15]);
    ctx.beginPath();
    ctx.moveTo(canvasWidth / 2, 0);
    ctx.lineTo(canvasWidth / 2, canvasHeight);
    ctx.stroke();
}

// Draw score
function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText(`Player 1: ${player1Score} | Player 2: ${player2Score}`, canvasWidth / 2, 30);
}

// Update ball position and check for collisions
function update() {
    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Check for collision with top and bottom walls
    if (ballY + ballRadius > canvasHeight || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Check for collision
    function checkCollision(player) {
        if (ballX + ballRadius > canvasWidth - paddleWidth && ballY > player && ballY < player + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        }
    }
    checkCollision(player1Y);
    checkCollision(player2Y);

    // Check for collision with left and right walls
    if (ballX + ballRadius > canvasWidth) {
        player1Score++;
        reset();
    }
    if (ballX - ballRadius < 0) {
        player2Score++;
        reset();
    }

    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Check for collision with top and bottom walls
    if (ballY + ballRadius > canvasHeight || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Check for collision with paddles
    if (
        ballX - ballRadius < paddleWidth &&
        ballY + ballRadius > player1Y &&
        ballY - ballRadius < player1Y + paddleHeight
    ) {
        ballSpeedX = -ballSpeedX;
    }

    if (
        ballX + ballRadius > canvasWidth - paddleWidth &&
        ballY + ballRadius > player2Y &&
        ballY - ballRadius < player2Y + paddleHeight
    ) {
        ballSpeedX = -ballSpeedX;
    }

    // Check for collision of paddels with top and bottom walls
    if (player1Y < 0) {
        player1Y = 0;
    }
    if (player1Y + paddleHeight > canvasHeight) {
        player1Y = canvasHeight - paddleHeight;
    }
    if (player2Y < 0) {
        player2Y = 0;
    }
    if (player2Y + paddleHeight > canvasHeight) {
        player2Y = canvasHeight - paddleHeight;
    }
}


// Reset ball position
function reset() {
    ballX = canvasWidth / 2;
    ballY = canvasHeight / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = 5;
}

// Move player 1 paddle
function movePlayer1(direction) {
    if (direction === 'up') {
        player1Y -= paddleSpeed;
    } else if (direction === 'down') {
        player1Y += paddleSpeed;
    }
}

// Move player 2 paddle
function movePlayer2(direction) {
    if (direction === 'up') {
        player2Y -= paddleSpeed;
    } else if (direction === 'down') {
        player2Y += paddleSpeed;
    }
}

// Draw everything
function draw() {
    // Clear canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw ball
    drawBall();

    // Draw paddles
    drawPaddles();

    // Draw net
    drawNet();

    // Draw score
    drawScore();
}

// Run game
function runGame() {
    update();
    draw();
}

// Run game every 30 milliseconds
setInterval(runGame, 30);

// Listen for keydown events
document.addEventListener('keydown', function (event) {
    if (event.key === 'w') {
        movePlayer1('up');
    } else if (event.key === 's') {
        movePlayer1('down');
    } else if (event.key === 'ArrowUp') {
        movePlayer2('up');
    } else if (event.key === 'ArrowDown') {
        movePlayer2('down');
    }
});

// Listen for touch events
document.addEventListener('touchstart', function (event) {
    if (event.target.id === 'up') {
        movePlayer1('up');
    } else if (event.target.id === 'down') {
        movePlayer1('down');
    }
});

// Listen for mouse events
document.addEventListener('mousedown', function (event) {
    if (event.target.id === 'up') {
        movePlayer1('up');
    } else if (event.target.id === 'down') {
        movePlayer1('down');
    }
});

//update score
function updateScore() {
    document.getElementById('player1Score').innerHTML = player1Score;
    document.getElementById('player2Score').innerHTML = player2Score;
}