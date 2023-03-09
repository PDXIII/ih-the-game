import Level from "./Level.js";
import Map from "./Map.js";
import Narrator from "./Narrator.js";

export default class Game {
  constructor() {
    this.htmlElement = document.getElementById("app");

    this.map = this.initMap(16, 16); // mapSize, dimension

    this.narrator = new Narrator();
    this.level = new Level(this.map, this.narrator, 3);
  }

  initMap(mapSize, dimension) {
    const map = new Map(mapSize, dimension);
    this.htmlElement.append(map.htmlElement);
    return map;
  }
}
