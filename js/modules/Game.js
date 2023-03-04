import Player from "./Player.js";
import Obstacle from "./Obstacle.js";
import Map from "./Map.js";

export default class Game {
  constructor() {
    this.gameController = this.initGameController();
    this.mapSize = 32;
    this.dimension = 16;
    this.htmlElement = document.getElementById("app");
    this.map = this.initMap();
    this.obstacles = this.initObstacles();
    this.player = this.initPlayer();
    this.scoreDisplay = this.initScoreDisplay();
  }

  detectCollision(location1, location2) {
    return this.calcFieldId(location1) === this.calcFieldId(location2);
  }

  gameControlHandler(event) {
    switch (event.code) {
      case "SPACE":
        console.log("SPACEBAR");
        break;

      case "ArrowUp":
        this.player.moveUp(this.mapSize);
        break;

      case "ArrowLeft":
        this.player.moveLeft(this.mapSize);
        break;

      case "ArrowDown":
        this.player.moveDown(this.mapSize);
        break;

      case "ArrowRight":
        this.player.moveRight(this.mapSize);
        break;

      case "KeyS":
        this.showStatus();
        break;

      default:
        console.log("event key: ", event.code);
    }

    this.updateWorld();
  }

  updateWorld() {
    this.obstacles.forEach((ele) => {
      this.detectCollision(ele.location, this.player.destLocation)
        ? this.player.takesDamage()
        : this.player.updateLocation();
    });
    this.scoreDisplay.update(this.player.lifeScore);
  }

  calcFieldId(location) {
    return location.x * this.dimension + location.y;
  }

  calcRandomIntWithMax(max) {
    return Math.floor(Math.random() * max);
  }

  initGameController() {
    return document.addEventListener("keyup", (event) => {
      this.gameControlHandler(event);
    });
  }

  initObstacles() {
    const arr = [];
    for (let i = 0; i < this.mapSize; i++) {
      console.log("create an obstacles");
      const x = this.calcRandomIntWithMax(this.mapSize);
      const y = this.calcRandomIntWithMax(this.mapSize);
      const obstacle = new Obstacle(
        this.calcFieldId({ x: x, y: y }),
        x,
        y,
        this.dimension
      );
      this.map.htmlElement.append(obstacle.htmlElement);
      arr.push(obstacle);
    }
    console.log("obstacles", arr);
    return arr;
  }

  initPlayer() {
    // const playerName = prompt('Give your player a name:');
    const player = new Player("Billy Bob", this.dimension);
    this.map.htmlElement.append(player.htmlElement);
    console.log("player born");
    return player;
  }

  initMap() {
    const map = new Map(this.mapSize, this.dimension);
    this.htmlElement.append(map.htmlElement);
    return map;
  }

  initScoreDisplay() {
    return new StatsDisplay(this.player.lifeScore);
  }

  showStatus() {
    const fieldId = this.calcFieldId(this.player.location);
    console.log(this.player.showStatus());
    console.log(this.player.name, "stands on field no.: ", fieldId);
    console.log("field: ", this.map.getFieldById(fieldId));
    console.log("obstacles: ", this.obstacles);
  }
}

class StatsDisplay {
  constructor(lifeScore) {
    this.lifeScore = lifeScore;
    this.htmlElement = this.initHtmlElement();
    this.lifeScoreDisplay = this.initLifeScoreDisplay();
  }

  initHtmlElement() {
    const display = document.createElement("div");
    display.classList.add("score-display");
    display.innerHTML = `❤️`;

    const app = document.getElementById("app");
    app.append(display);

    console.log("display created");
    console.log(app);
    return display;
  }

  initLifeScoreDisplay() {
    const display = document.createElement("span");
    display.classList.add("life-score");
    display.innerHTML = this.lifeScore;
    this.htmlElement.append(display);
    console.log("display created");
    console.log(this.htmlElement);
    return display;
  }

  update(num) {
    this.lifeScore = num;
    this.render();
  }
  render() {
    this.lifeScoreDisplay.innerHTML =
      this.lifeScore > 0 ? this.lifeScore : "☠️";
  }
}
