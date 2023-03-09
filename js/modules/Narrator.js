import { createElementWithClass } from "./toolkit.js";

export default class Narrator {
  constructor() {
    this.htmlElement = this.initHtmlElement();
    // this.eventListener = this.initEventListener();
    this.eventListener;
    this.currentTextCounter = 0;
    this.scene;
  }

  controller(event, resolve) {
    switch (event.code) {
      case "Space":
        event.preventDefault();
        this.currentTextCounter++;
        this.playScene();
        console.log("promise fulfilled");
        resolve();
        break;
      default:
      // console.log("event key: ", event.code);
    }
  }

  getPromiseFromEvent() {
    // found at https://stackoverflow.com/questions/6902334/how-to-let-javascript-wait-until-certain-event-happens

    console.log("promise made");
    return new Promise((resolve) => {
      document.removeEventListener("keyup", this.eventListener);
      this.initEventListener(resolve);
    });
  }

  async waitForSpace() {
    console.log("wait for event");
    await this.getPromiseFromEvent();
  }

  initScene(arr) {
    console.log("init scene");
    this.currentTextCounter = 0;
    this.scene = arr;

    this.displayText(this.scene[this.currentTextCounter]);
    this.waitForSpace();
  }
  playScene() {
    if (this.currentTextCounter < this.scene.length) {
      this.displayText(this.scene[this.currentTextCounter]);
    } else {
      this.toggle();
    }
  }
  toggle() {
    this.htmlElement.classList.toggle("scale-up");
    document.querySelector(".map").classList.toggle("scale-down");
  }

  displayText(str) {
    const message = document.querySelector(".message");
    message.innerText = str;
  }

  initEventListener(resolve) {
    this.eventListener = document.addEventListener("keyup", (event) => {
      this.controller(event, resolve);
    });
  }

  initHtmlElement() {
    const narrator = createElementWithClass("div", "narrator scale-up");
    const messageContainer = createElementWithClass("div", "message-container");
    const message = createElementWithClass("span", "message");
    const cursor = createElementWithClass("span", "cursor");

    narrator.append(messageContainer);
    messageContainer.append(message);
    messageContainer.append(cursor);

    document.getElementById("app").append(narrator);
    return narrator;
  }
}
