export default class Map {
  constructor(mapSize, dimension) {
    this.mapSize = mapSize;
    this.dimension = dimension;
    this.htmlElement = this.initHtmlElement();
    this.fields = this.initFields();
  }

  initHtmlElement() {
    const div = document.createElement("div");
    div.classList.add("map");
    div.classList.add("scale-down");
    div.style.width = this.mapSize * this.dimension;
    div.style.height = this.mapSize * this.dimension;
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
    this.htmlElement = this.initHtmlElement(dimension);
  }
  initHtmlElement(dimension) {
    const div = document.createElement("div");
    div.classList.add("field");
    div.style.top = this.location.y * dimension;
    div.style.left = this.location.x * dimension;
    div.style.width = dimension;
    div.style.height = dimension;
    return div;
  }
}
