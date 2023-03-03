export default class Obstacle {
  constructor(id, x, y, dimension) {
    this.type = "flower";
    this.fieldId = id;
    this.dimension = dimension;
    this.location = {
      x: x,
      y: y,
    };
    this.htmlElement = this.initHtmlElement();
  }
  initHtmlElement() {
    const div = document.createElement("div");
    div.classList.add("obstacle");
    div.style.left = this.location.x * this.dimension;
    div.style.top = this.location.y * this.dimension;
    div.style.width = this.dimension;
    div.style.height = this.dimension;
    return div;
  }
}
