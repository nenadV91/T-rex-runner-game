class Bird extends Obstacle {
  constructor(...props) {
    super(...props);
    this.height = 20;
    this.width = 40;

    this.level = floor(random(1, 5));
    this.y = bottom - 15 * this.level - 5;

    const min = obstacleSpeed - 1;
    const max = obstacleSpeed + 3;
    this.speed = floor(random(min, max))
  }
}