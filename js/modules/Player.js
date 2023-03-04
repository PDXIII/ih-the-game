export default class Player {
  constructor(name, dimension) {
    this.dimension = dimension;
    this.lifeScore = 5;
    this.name = name;
    this.location = {
      x: 0,
      y: 0,
    };
    this.htmlElement = this.initHtmlElement();
    this.destLocation = { ...this.location };
  }

  initHtmlElement() {
    const div = document.createElement("div");
    div.classList.add("player");
    div.style.left = this.location.x * this.dimension;
    div.style.top = this.location.y * this.dimension;
    div.style.width = this.dimension;
    div.style.height = this.dimension;
    return div;
  }
  moveRight(limit) {
    if (!this.isPlayerDead()) {
      if (this.destLocation.x < limit - 1) {
        console.log("move East");
        this.destLocation.x++;
      } else {
        console.log("end of map");
      }
    }
  }
  moveUp(limit) {
    if (!this.isPlayerDead()) {
      if (this.destLocation.y > 0) {
        console.log("move North");
        this.destLocation.y--;
      } else {
        console.log("end of map");
      }
    }
  }
  moveDown(limit) {
    if (!this.isPlayerDead()) {
      if (this.destLocation.y < limit - 1) {
        console.log("move South");
        this.destLocation.y++;
      } else {
        console.log("end of map");
      }
    }
  }
  moveLeft(limit) {
    if (!this.isPlayerDead()) {
      if (this.destLocation.x > 0) {
        console.log("move West");
        this.destLocation.x--;
      } else {
        console.log("end of map");
      }
    }
  }

  isPlayerDead() {
    return this.lifeScore <= 0;
  }
  playerDies() {
    this.htmlElement.classList.add("dead");
    console.log("☠️");
  }

  takesDamage() {
    console.log("Autsch’n");
    this.lifeScore--;
    console.log(this.lifeScore);

    if (this.isPlayerDead()) {
      this.lifeScore = 0;
      this.playerDies();
    }
  }

  renderPlayer() {
    this.htmlElement.style.left = this.location.x * this.dimension;
    this.htmlElement.style.top = this.location.y * this.dimension;
  }

  updateLocation() {
    this.location = { ...this.destLocation };
    this.renderPlayer();
    // console.log(this.location);
  }

  showStatus() {
    return `My name is ${this.name} and I am currently at location ${this.location.x}/${this.location.y}.`;
  }
}
