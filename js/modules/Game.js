import Level from "./Level.js";

export default class Game {
  constructor() {
    this.htmlElement = document.getElementById("app");
    this.levelIndex = 0;
    this.level = new Level(this.levelIndex, this.nextLevel);
  }

  nextLevel(levelIndex) {
    levelIndex++;
    console.log(levelIndex);
    delete this.level;

    this.level = new Level(levelIndex, this.nextLevel);
  }
}
