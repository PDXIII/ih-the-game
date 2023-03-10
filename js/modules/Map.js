import {
  createElementWithClass,
  initHtmlElementWithLocation,
} from "./toolkit.js";

export default class Map {
  constructor(mapSize, mapDimension) {
    this.mapSize = mapSize;
    this.dimension = mapDimension;
    this.htmlElement = this.initHtmlElement();
    this.fields = this.initFields();
  }

  toggle() {
    this.htmlElement.classList.toggle("scale-down");
  }

  initHtmlElement() {
    const div = createElementWithClass("div", "map scale-down");
    div.style.width = this.mapSize * this.dimension;
    div.style.height = this.mapSize * this.dimension;
    document.querySelector("#app").append(div);
    return div;
  }

  initFields() {
    const fields = [];
    for (let i = 0; i < this.mapSize; i++) {
      for (let j = 0; j < this.mapSize; j++) {
        const field = new Field(i * this.mapSize + j, i, j, this.dimension);
        fields.push(field);
        this.htmlElement.append(field.htmlElement);
      }
    }
    return fields;
  }

  getFieldById(id) {
    return this.fields.find((field) => field.fieldId === id);
  }
}

class Field {
  constructor(id, x, y, dimension) {
    this.fieldId = id;
    this.location = {
      x: x,
      y: y,
    };
    this.dimension = dimension;
    this.htmlElement = initHtmlElementWithLocation(
      "div",
      `field id-${id}`,
      this.location,
      this.dimension
    );
  }
}
