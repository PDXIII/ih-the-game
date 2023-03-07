import Player from "./Player.js";
import Obstacle from "./Obstacle.js";
import Narrator from "./Narrator.js";
import Map from "./Map.js";
import StatsDisplay from "./StatsDisplay.js";
import { calcRandomIntWithMax } from "./toolkit.js";

export default class Game {
  constructor() {
    this.typesOfObstacles = [
      { name: "flower", damage: 0, coins: 1 },
      { name: "apple", damage: 0, coins: 5 },
      { name: "stone", damage: 1, coins: 0 },
      { name: "snake", damage: 5, coins: 0 },
    ];
    this.gameController = this.initGameController();
    this.guiController = this.initGuiController();
    this.mapSize = 16;
    this.dimension = 16;
    this.htmlElement = document.getElementById("app");
    this.map = this.initMap();
    this.obstacles = this.initObstacles();
    this.player = this.initPlayer();
    this.scoreDisplay = this.initScoreDisplay();
    this.narrator = this.initNarrator();
  }

  detectCollision(location1, location2) {
    return this.calcFieldId(location1) === this.calcFieldId(location2);
  }

  gameControlHandler(event) {
    switch (event.code) {
      case "ArrowUp":
        this.player.moveUp(this.mapSize);
        this.updateWorld();
        break;

      case "ArrowLeft":
        this.player.moveLeft(this.mapSize);
        this.updateWorld();
        break;

      case "ArrowDown":
        this.player.moveDown(this.mapSize);
        this.updateWorld();
        break;

      case "ArrowRight":
        this.player.moveRight(this.mapSize);
        this.updateWorld();
        break;

      case "KeyS":
        this.showStatus();
        break;

      default:
    }
  }

  guiControlHandler(event) {
    switch (event.code) {
      case "Space":
        event.preventDefault();
        this.toggleNarrator();
        break;
      default:
      // console.log("event key: ", event.code);
    }
  }

  toggleNarrator() {
    document.querySelector(".narrator").classList.toggle("scale-up");
    this.map.htmlElement.classList.toggle("scale-down");
  }

  updateWorld() {
    this.obstacles.forEach((ele) => {
      this.detectCollision(ele.location, this.player.destLocation)
        ? // ? this.player.takesDamage()
          this.player.handleCollision(ele)
        : this.player.updateLocation();
    });
    this.scoreDisplay.update(this.player.lifeScore, this.player.coinsScore);
  }

  calcFieldId(location) {
    return location.x * this.dimension + location.y;
  }

  initGameController() {
    // console.log("added game listener");
    return document.addEventListener("keyup", (event) => {
      this.gameControlHandler(event);
    });
  }

  initGuiController() {
    // console.log("added gui listener");
    return document.addEventListener("keyup", (event) => {
      this.guiControlHandler(event);
    });
  }

  initObstacles() {
    const obstacles = [];
    const amountOfEach = Math.floor(this.mapSize / 5);

    this.typesOfObstacles.forEach((type) => {
      for (let i = 0; i < amountOfEach; i++) {
        const x = calcRandomIntWithMax(this.mapSize);
        const y = calcRandomIntWithMax(this.mapSize);
        const obstacle = new Obstacle(
          this.calcFieldId({ x: x, y: y }),
          x,
          y,
          this.dimension,
          type.name,
          type.damage,
          type.coins
        );

        // console.log(obstacles);
        obstacles.push(obstacle);

        this.map.htmlElement.append(obstacle.htmlElement);
      }
    });

    const goalX = calcRandomIntWithMax(this.mapSize);
    const goalY = calcRandomIntWithMax(this.mapSize);

    const goal = new Obstacle(
      this.calcFieldId({
        x: goalX,
        y: goalY,
      }),
      goalX,
      goalY,
      this.dimension,
      "goal",
      0,
      0
    );

    this.map.htmlElement.append(goal.htmlElement);
    obstacles.push(goal);
    return obstacles;
  }

  attachTypeOfObstacle(index) {
    if (index % 4 === 0) {
      return "flower";
    } else if (index % 3 === 0) {
      return "apple";
    } else if (index % 2 === 0) {
      return "stone";
    } else {
      return "snake";
    }
  }

  initPlayer() {
    const player = new Player("Billy Bob", this.dimension);
    this.map.htmlElement.append(player.htmlElement);
    // console.log("player born");
    return player;
  }

  initMap() {
    const map = new Map(this.mapSize, this.dimension);
    this.htmlElement.append(map.htmlElement);
    return map;
  }

  initNarrator() {
    return new Narrator();
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
