// Select the canvas and get the context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 400;
canvas.height = 600;

// Game variables
let skidor = { x: 185, y: 500, width: 30, height: 30, speed: 5 };
let obstacles = [];
let gameOver = false;
let score = 0;

// Listen for player input
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && skidor.x > 0) skidor.x -= skidor.speed;
  if (e.key === 'ArrowRight' && skidor.x < canvas.width - skidor.width) skidor.x += skidor.speed;
  if ((e.key === 'r' || e.key === 'R') && gameOver) resetGame();
});

// Spawn obstacles
function spawnObstacle() {
  obstacles.push({ x: Math.random() * 350, y: -20, width: 50, height: 20 });
}

// Update game state
function updateGame() {
  if (gameOver) return;

  if (Math.random() < 0.02) spawnObstacle();

  obstacles.forEach((obstacle, i) => {
    obstacle.y += 3;
    if (obstacle.y > canvas.height) {
      obstacles.splice(i, 1);
      score++;
    }
    if (
      skidor.x < obstacle.x + obstacle.width &&
      skidor.x + skidor.width > obstacle.x &&
      skidor.y < obstacle.y + obstacle.height &&
      skidor.y + skidor.height > obstacle.y
    ) {
      gameOver = true;
    }
  });
}

// Render the game
function renderGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = '30px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('⛷️', skidor.x + skidor.width / 2, skidor.y + skidor.height);

  ctx.fillStyle = 'red';
  obstacles.forEach((obstacle) => {
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });

  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 50, 30);

  if (gameOver) {
    ctx.font = '40px Arial';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
    ctx.font = '20px Arial';
    ctx.fillText('Starta om: Tryck "R"', canvas.width / 2, canvas.height / 2 + 40);
  }
}

// Reset the game
function resetGame() {
  skidor = { x: 185, y: 500, width: 30, height: 30, speed: 5 };
  obstacles = [];
  gameOver = false;
  score = 0;
  requestAnimationFrame(gameLoop);
}

// Main game loop
function gameLoop() {
  updateGame();
  renderGame();
  if (!gameOver) requestAnimationFrame(gameLoop);
}

// Start the game
requestAnimationFrame(gameLoop);
