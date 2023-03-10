import Map from "./Map.js";
import Narrator from "./Narrator.js";
import Player from "./Player.js";
import Obstacle from "./Obstacle.js";
import StatsDisplay from "./StatsDisplay.js";
import { calcRandomIntWithMax } from "./toolkit.js";

import {
  levels,
  winningScene,
  dyingScene,
  prank,
  typesOfObstacles,
} from "./data.js";

export default class Level {
  constructor(levelIndex, callBack) {
    this.data = levels[levelIndex];
    this.maxCoins = this.data.maxCoins;
    this.map = new Map(this.data.mapSize, this.data.mapDimension);
    this.narrator = new Narrator(levelIndex, callBack);
    this.player = new Player(this.data.mapDimension, this.data.maxLife);
    this.scoreDisplay = new StatsDisplay(this.data.maxLife);
    this.typesOfObstacles = this.data.typesOfObstacles;
    this.obstacles = this.initObstacles();
    this.eventListener = this.addEventListener();
    this.setScene(this.data);
  }

  addEventListener() {
    return document.addEventListener("keyup", (event) => {
      this.controlHandler(event);
    });
  }

  kill() {
    document.removeEventListener("keyup", this.eventListener);

    const map = document.querySelector(".map");
    document.querySelector("#app").removeChild(map);

    const display = document.querySelector(".score-display");
    document.querySelector("#app").removeChild(display);
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

  setScene(levelData) {
    // messy
    console.log(levelData.classList);
    levelData.classList.forEach((item) => {
      document.querySelector(".map").classList.add(item);
    });

    this.narrator.initScene(levelData.scene);
  }

  updateWorld() {
    this.obstacles.forEach((ele) => {
      this.detectCollision(ele.location, this.player.destLocation)
        ? this.player.handleCollision(ele)
        : this.player.updateLocation();
    });

    if (this.player.coinsScore >= this.maxCoins || this.player.hasReachedExit) {
      this.narrator.toggle();
      this.narrator.initScene(winningScene);
      this.player.resetPlayer();
      this.kill();
    } else if (this.player.lifeScore <= 5 && !this.player.gotPranked) {
      this.narrator.toggle();
      this.narrator.initScene(prank);
      this.player.gotPranked = true;
    } else if (this.player.isPlayerDead()) {
      this.narrator.toggle();
      this.narrator.initScene(dyingScene);
      this.player.resetPlayer();
      this.kill();
    }

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
    const amountOfEach = Math.floor(
      this.map.mapSize / this.typesOfObstacles.length
    );

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

  showStatus() {
    const fieldId = this.calcFieldId(this.player.location);
    console.log(this.player.showStatus());
    console.log("field: ", this.map.getFieldById(fieldId));
    console.log("obstacles: ", this.obstacles);
  }
}
