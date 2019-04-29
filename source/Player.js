class Player {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y - h;
    this.width = w;
    this.height = h;
    this.baseHeight = h;

    this.jumpSize = 0;
    this.isJumping = false;

    this.color = color(0, 0, 0);
    this.isDucking = false;
    this.isStanding = true;
  }

  update() {
    if(this.isDucking) {
      this.duck();
    } else {
      this.standUp();
    }

    if(this.isJumping) {
      const jump = Math.pow(this.jumpSize, 2) * 0.035

      if(this.jumpSize <= 0) this.y += jump;
      else this.y -= jump;

      if(this.jumpSize <= -20) {
        this.isJumping = false;
      }

      this.jumpSize -= 1;
    }
  }


  jump() {
    if(!this.isJumping && !this.isDucking) {
      this.isJumping = true;
      this.jumpSize = 20;
    }
  }

  duck() {
    this.height = this.baseHeight / 2;
    this.y = bottom - this.height;
    this.isStanding = false;
    this.isJumping = false;
  }

  standUp() {
    if(!this.isStanding) {
      this.height = this.baseHeight;
      this.y = bottom - this.height;
      this.isStanding = true;
    }
  }

  show() {
    noFill()
    stroke(this.color);
    rect(this.x, this.y, this.width, this.height);
  }
}