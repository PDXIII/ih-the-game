import Player from "./Player.js";
import Obstacle from "./Obstacle.js";
import Map from "./Map.js";

export default class Game {
  constructor() {
    this.gameController = this.initGameController();
    this.dimension = 8;
    this.htmlElement = document.getElementById("app");
    this.map = this.initMap(this.dimension);
    this.obstacles = this.initObstacles();
    this.player = this.initPlayer();
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
        this.player.moveUp(this.dimension);
        break;

      case "ArrowLeft":
        this.player.moveLeft(this.dimension);
        break;

      case "ArrowDown":
        this.player.moveDown(this.dimension);
        break;

      case "ArrowRight":
        this.player.moveRight(this.dimension);
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
    for (let i = 0; i < this.dimension; i++) {
      console.log("create an obstacles");
      const x = this.calcRandomIntWithMax(this.dimension);
      const y = this.calcRandomIntWithMax(this.dimension);
      const obstacle = new Obstacle(this.calcFieldId({ x: x, y: y }), x, y);
      this.map.htmlElement.append(obstacle.htmlElement);
      arr.push(obstacle);
    }
    console.log("obstacles", arr);
    return arr;
  }

  initPlayer() {
    // const playerName = prompt('Give your player a name:');
    const player = new Player("Billy Bob");
    this.map.htmlElement.append(player.htmlElement);
    console.log("player born");
    return player;
  }

  initMap(dimension) {
    const map = new Map(dimension);
    this.htmlElement.append(map.htmlElement);
    return map;
  }

  showStatus() {
    const fieldId = this.calcFieldId(this.player.location);
    console.log(this.player.showStatus());
    console.log(this.player.name, "stands on field no.: ", fieldId);
    console.log("field: ", this.map.getFieldById(fieldId));
    console.log("obstacles: ", this.obstacles);
  }
}
