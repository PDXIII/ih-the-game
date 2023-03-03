export default class Map {
  constructor(dimension) {
    this.dimension = dimension;
    this.htmlElement = this.initHtmlElement();
    this.fields = this.initFields();
  }

  initHtmlElement() {
    const div = document.createElement("div");
    div.classList.add("map");
    return div;
  }

  initFields() {
    console.log(this.htmlElement, "boom");
    const fields = [];
    for (let i = 0; i < this.dimension; i++) {
      for (let j = 0; j < this.dimension; j++) {
        const field = new Field(i * this.dimension + j, i, j);
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
  constructor(id, x, y) {
    this.fieldId = id;
    this.htmlElement = this.initHtmlElement();
    this.location = {
      x: x,
      y: y,
    };
    this.htmlElement.style.top = this.location.y * 8;
    this.htmlElement.style.left = this.location.x * 8;
  }
  initHtmlElement() {
    const div = document.createElement("div");
    div.classList.add("field");
    return div;
  }
}
