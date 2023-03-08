import Level from "./Level.js";
import Map from "./Map.js";
import Narrator from "./Narrator.js";

export default class Game {
  constructor() {
    this.htmlElement = document.getElementById("app");
    this.gameController = this.initGameController();
    this.guiController = this.initGuiController();

    this.map = this.initMap(16, 16); // mapSize, dimension

    this.narrator = this.initNarrator();
    this.level = new Level(this.map, this.narrator, 0);
  }

  gameControlHandler(event) {
    switch (event.code) {
      case "ArrowUp":
        this.level.player.moveUp(this.mapSize);
        this.level.updateWorld();
        break;

      case "ArrowLeft":
        this.level.player.moveLeft(this.mapSize);
        this.level.updateWorld();
        break;

      case "ArrowDown":
        this.level.player.moveDown(this.mapSize);
        this.level.updateWorld();
        break;

      case "ArrowRight":
        this.level.player.moveRight(this.mapSize);
        this.level.updateWorld();
        break;

      case "KeyS":
        this.level.showStatus();
        break;

      default:
    }
  }

  guiControlHandler(event) {
    switch (event.code) {
      case "Space":
        event.preventDefault();
        this.level.toggleNarrator();
        break;
      default:
      // console.log("event key: ", event.code);
    }
  }

  // updateWorld() {
  //   this.obstacles.forEach((ele) => {
  //     this.detectCollision(ele.location, this.player.destLocation)
  //       ? // ? this.player.takesDamage()
  //         this.player.handleCollision(ele)
  //       : this.player.updateLocation();
  //   });
  //   this.scoreDisplay.update(this.player.lifeScore, this.player.coinsScore);
  // }

  // calcFieldId(location) {
  //   return location.x * this.dimension + location.y;
  // }

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

  initMap(mapSize, dimension) {
    const map = new Map(mapSize, dimension);
    this.htmlElement.append(map.htmlElement);
    return map;
  }

  initNarrator() {
    return new Narrator();
  }
}
