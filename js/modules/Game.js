import Level from "./Level.js";

export default class Game {
  constructor() {
    this.htmlElement = document.getElementById("app");
    this.levelIndex = 0;
    this.level = new Level(this.levelIndex, this.nextLevel);
  }

  // initMap(mapSize, dimension) {
  //   const map = new Map(mapSize, dimension);
  //   this.htmlElement.append(map.htmlElement);
  //   return map;
  // }

  nextLevel(levelIndex) {
    levelIndex++;
    console.log(levelIndex);
    delete this.level;

    this.level = new Level(levelIndex, this.nextLevel);
  }
}
