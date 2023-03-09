import Player from "./Player.js";
import Obstacle from "./Obstacle.js";
import StatsDisplay from "./StatsDisplay.js";
import { calcRandomIntWithMax } from "./toolkit.js";

const levels = [
  {
    classList: [],
  },
  {
    classList: ["true"],
  },
  {
    classList: ["trita"],
  },
  {
    classList: ["deutera"],
  },
  {
    classList: ["prota"],
  },
];

const typesOfObstacles = [
  { name: "flower", damage: 0, coins: 1 },
  { name: "apple", damage: 0, coins: 5 },
  { name: "stone", damage: 1, coins: 0 },
  { name: "snake", damage: 5, coins: 0 },
];

export default class Level {
  constructor(map, narrator, levelIndex) {
    this.map = map;
    this.narrator = narrator;
    this.typesOfObstacles = typesOfObstacles;
    this.eventListener = this.addEventListener();

    this.obstacles = this.initObstacles();
    this.player = this.initPlayer();
    this.scoreDisplay = this.initScoreDisplay();
    this.data = levels[levelIndex];
    this.loadData(this.data);
  }

  addEventListener() {
    return document.addEventListener("keyup", (event) => {
      this.controlHandler(event);
    });
  }

  controlHandler(event) {
    this.player.cleanUpClassList();
    switch (event.code) {
      case "ArrowUp":
        this.player.moveUp(this.map.mapSize);
        this.updateWorld();
        break;

      case "ArrowLeft":
        this.player.moveLeft(this.map.mapSize);
        this.updateWorld();
        break;

      case "ArrowDown":
        this.player.moveDown(this.map.mapSize);
        this.updateWorld();
        break;

      case "ArrowRight":
        this.player.moveRight(this.map.mapSize);
        this.updateWorld();
        break;

      case "KeyS":
        this.showStatus();
        break;

      default:
    }
  }

  loadData(levelData) {
    // messy
    levelData.classList.forEach((item) => {
      this.map.htmlElement.classList.add(item);
    });
    this.narrator.initScene([
      "Hey! \n Wanna play a game?",
      "Hit the spacebar!",
    ]);
  }

  toggleNarrator() {
    // messy
    this.narrator.toggle();
    this.map.toggle();
  }

  updateWorld() {
    this.obstacles.forEach((ele) => {
      this.detectCollision(ele.location, this.player.destLocation)
        ? this.player.handleCollision(ele)
        : this.player.updateLocation();
    });
    this.scoreDisplay.update(this.player.lifeScore, this.player.coinsScore);
  }

  detectCollision(location1, location2) {
    return this.calcFieldId(location1) === this.calcFieldId(location2);
  }

  calcFieldId(location) {
    return location.x * this.map.dimension + location.y;
  }

  initObstacles() {
    const obstacles = [];
    const amountOfEach = Math.floor(this.map.mapSize / 5);

    this.typesOfObstacles.forEach((type) => {
      for (let i = 0; i < amountOfEach; i++) {
        const x = calcRandomIntWithMax(this.map.mapSize);
        const y = calcRandomIntWithMax(this.map.mapSize);
        const obstacle = new Obstacle(
          this.calcFieldId({ x: x, y: y }),
          x,
          y,
          this.map.dimension,
          type.name,
          type.damage,
          type.coins
        );

        // console.log(obstacles);
        obstacles.push(obstacle);

        this.map.htmlElement.append(obstacle.htmlElement);
      }
    });

    const exitX = calcRandomIntWithMax(this.map.mapSize);
    const exitY = calcRandomIntWithMax(this.map.mapSize);

    const exit = new Obstacle(
      this.calcFieldId({
        x: exitX,
        y: exitY,
      }),
      exitX,
      exitY,
      this.map.dimension,
      "exit",
      0,
      0
    );

    this.map.htmlElement.append(exit.htmlElement);
    obstacles.push(exit);
    return obstacles;
  }

  initPlayer() {
    const player = new Player("Billy Bob", this.map.dimension);
    this.map.htmlElement.append(player.htmlElement);
    // console.log("player born");
    return player;
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
