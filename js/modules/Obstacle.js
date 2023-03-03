export default class Obstacle {
  constructor(id, x, y) {
    this.type = "flower";
    this.fieldId = id;
    this.location = {
      x: x,
      y: y,
    };
    this.htmlElement = this.initHtmlElement();
  }
  initHtmlElement() {
    const div = document.createElement("div");
    div.classList.add("obstacle");
    div.style.left = this.location.x * 8;
    div.style.top = this.location.y * 8;
    return div;
  }
}
