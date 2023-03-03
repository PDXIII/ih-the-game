export default class Player {
  constructor(name) {
    this.name = name;
    this.location = {
      x: 0,
      y: 0,
    };
    this.htmlElement = this.initHtmlElement();
    this.destLocation = { ...this.location };
  }

  initHtmlElement() {
    const div = document.createElement("div");
    div.classList.add("player");
    div.style.left = this.location.x * 8;
    div.style.top = this.location.y * 8;
    return div;
  }
  moveRight(limit) {
    if (this.destLocation.x < limit - 1) {
      console.log("move East");
      this.destLocation.x++;
    } else {
      console.log("end of map");
    }
  }
  moveUp(limit) {
    if (this.destLocation.y > 0) {
      console.log("move North");
      this.destLocation.y--;
    } else {
      console.log("end of map");
    }
  }
  moveDown(limit) {
    if (this.destLocation.y < limit - 1) {
      console.log("move South");
      this.destLocation.y++;
    } else {
      console.log("end of map");
    }
  }
  moveLeft(limit) {
    if (this.destLocation.x > 0) {
      console.log("move West");
      this.destLocation.x--;
    } else {
      console.log("end of map");
    }
  }

  takesDamage() {
    console.log("Autsch’n");
  }

  renderPlayer() {
    this.htmlElement.style.left = this.location.x * 8;
    this.htmlElement.style.top = this.location.y * 8;
  }

  updateLocation() {
    this.location = { ...this.destLocation };
    this.renderPlayer();
    // console.log(this.location);
  }

  showStatus() {
    return `My name is ${this.name} and I am currently at location ${this.location.x}/${this.location.y}.`;
  }
}
