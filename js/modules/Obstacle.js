import { initHtmlElementWithLocation } from "./toolkit.js";

export default class Obstacle {
  constructor(id, x, y, dimension, type = "stone", damage, coins) {
    this.fieldId = id;
    this.location = {
      x: x,
      y: y,
    };
    this.dimension = dimension;
    this.type = type;
    this.damage = damage;
    this.coins = coins;
    this.htmlElement = initHtmlElementWithLocation(
      "div",
      `obstacle ${this.type}`,
      this.location,
      this.dimension
    );
  }
}
