import { initHtmlElementWithLocation } from "./toolkit.js";

export default class Player {
  constructor(dimension, maxLife) {
    this.dimension = dimension;
    this.lifeScore = maxLife;
    this.coinsScore = 0;
    this.location = {
      x: 0,
      y: 0,
    };
    this.htmlElement = initHtmlElementWithLocation(
      "div",
      "player",
      this.location,
      this.dimension
    );
    this.destLocation = { ...this.location };
    this.hasReachedExit = false;
    this.gotPranked = false;

    document.querySelector(".map").append(this.htmlElement);
  }

  moveRight(limit) {
    if (!this.isPlayerDead()) {
      if (this.destLocation.x < limit - 1) {
        // console.log("move East");
        this.destLocation.x++;
      } else {
        // console.log("end of map");
      }
    }
  }
  moveUp(limit) {
    if (!this.isPlayerDead()) {
      if (this.destLocation.y > 0) {
        // console.log("move North");
        this.destLocation.y--;
      } else {
        // console.log("end of map");
      }
    }
  }
  moveDown(limit) {
    if (!this.isPlayerDead()) {
      if (this.destLocation.y < limit - 1) {
        // console.log("move South");
        this.destLocation.y++;
      } else {
        // console.log("end of map");
      }
    }
    console.log(this.hasReachedExit);
  }
  moveLeft(limit) {
    if (!this.isPlayerDead()) {
      if (this.destLocation.x > 0) {
        // console.log("move West");
        this.destLocation.x--;
      } else {
        // console.log("end of map");
      }
    }
  }

  isPlayerDead() {
    return this.lifeScore <= 0;
  }

  playerDies() {
    this.lifeScore = 0;
    this.cleanUpClassList();
    this.htmlElement.classList.add("dead");
    // console.log("☠️");
  }

  cleanUpClassList() {
    this.htmlElement.classList.remove("hurt");
    this.htmlElement.classList.remove("lucky");
  }

  resetPlayer() {
    this.lifeScore = 13;
    this.coinsScore = 0;
    this.hasReachedExit = false;
    this.gotPranked = false;
  }

  handleCollision(obstacle) {
    // console.log(`You’ve found a ${obstacle.type}`);
    switch (obstacle.type) {
      case "exit":
        // console.log("yeah, you’ve won!");
        this.hasReachedExit = true;
        break;
      case "flower":
        this.coinsScore += obstacle.coins;
        this.htmlElement.classList.add("lucky");

        break;
      case "apple":
        this.coinsScore += obstacle.coins;
        this.htmlElement.classList.add("lucky");

        break;
      case "stone":
        this.lifeScore -= obstacle.damage;
        this.htmlElement.classList.add("hurt");
        if (this.isPlayerDead()) {
          this.playerDies();
        }

        break;
      case "snake":
        this.lifeScore -= obstacle.damage;
        this.htmlElement.classList.add("hurt");
        if (this.isPlayerDead()) {
          this.playerDies();
        }

        break;
      default:
      // console.log("do nothing!");
    }
  }

  takesDamage() {
    // console.log("Autsch’n");
    this.lifeScore--;
    // console.log(this.lifeScore);

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
    return `I am currently at location ${this.location.x}/${this.location.y}.`;
  }
}
