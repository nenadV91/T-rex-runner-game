let canvas;
let width;
let height;
let player;
let ground;
let bottom;
let stats;
let score = 1;
let scorePoint = 1
let obstacles = [];
let obstacleSpeed = 5;
let obstacleRate = 75;
let nextDist = 100;

const colors = {
  bg: 'rgb(247, 247, 247)'
}

function setup() {
  width = 600;
  height = 300;
  canvas = createCanvas(width, height);

  bottom = height - 20;
  player = new Player(50, bottom, 15, 40);
  ground = new Ground(width, bottom);
  stats = new Stats(25, 25);

  obstacles.push(new Obstacle())
}

function draw() {
  background(colors.bg);
  ground.show();

  if(frameCount % 5 === 0) {
    score += scorePoint;
  }

  if(frameCount % 100 === 0) {
    obstacleSpeed += 0.15;
    scorePoint += 0.1;
  }

  if(!nextDist--) {
    nextDist = int(random(45, 100))
    const number = random();

    if(number < 0.6 && number > 0.4) {
      obstacles.push(...Obstacle.double())
    } else if(number <= 0.4 && number > 0.2) {
      obstacles.push(...Obstacle.triple())
    } else if(number <= 0.2) {
      obstacles.push(new Bird())
    } else {
      obstacles.push(new Obstacle())
    }
  }

  for(let i = obstacles.length - 1; i >= 0; i--) {
    const obstacle = obstacles[i];

    if(obstacle.hit(player)) {
      stats.setHS();
      noLoop();
    }

    obstacle.show();
    obstacle.update();

    if(obstacle.x <= -obstacle.width) {
      obstacles.splice(i, 1);
    }
  }

  if(keyIsPressed) {
    if(keyCode === 40) {
      player.isDucking = true;
    }
  } else {
    player.isDucking = false;
  }

  player.show();
  player.update();
  stats.show();
}

function keyPressed() {
  if(keyCode === 32) {
    player.jump();
  }
}