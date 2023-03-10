import { createElementWithClass } from "./toolkit.js";

export default class Narrator {
  constructor(levelIndex, callback) {
    this.levelIndex = levelIndex;
    this.htmlElement = this.initHtmlElement();
    this.eventListener;
    this.currentTextCounter = 0;
    this.scene = [];
    this.nextLevel = callback;
  }

  controller(event, resolve) {
    switch (event.code) {
      case "Space":
        resolve();
        break;
      default:
    }
  }

  getPromiseFromEvent() {
    // found at https://stackoverflow.com/questions/6902334/how-to-let-javascript-wait-until-certain-event-happens

    return new Promise((resolve) => {
      document.removeEventListener("keyup", this.eventListener);
      this.initEventListener(resolve);
    });
  }

  async waitForSpace(nextStep) {
    await this.getPromiseFromEvent();

    switch (nextStep) {
      case "playScene":
        this.playScene();

        break;
      case "toggle":
        this.toggle();
        this.playScene();

        break;
      case "restart":
        window.location.reload();

        break;
      case "kill":
        this.kill();

        break;
      case "nextLevel":
        this.kill();
        this.nextLevel(this.levelIndex);

        break;
      default:
        break;
    }
  }
  kill() {
    document.removeEventListener("keyup", this.eventListener);
    this.htmlElement.innerHTML = "";
  }
  initScene(arr) {
    this.initMessageContainer();
    this.currentTextCounter = 0;
    this.scene = arr;

    this.playScene();
  }

  playScene() {
    this.displayText(this.scene[this.currentTextCounter].text);
    this.waitForSpace(this.scene[this.currentTextCounter].nextStep);

    this.currentTextCounter++;
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

    document.getElementById("app").append(narrator);
    return narrator;
  }
  initMessageContainer() {
    const messageContainer = createElementWithClass("div", "message-container");
    const message = createElementWithClass("span", "message");
    const cursor = createElementWithClass("span", "cursor");
    const callToAction = createElementWithClass("div", "cta");
    callToAction.innerText = "hit the spacebar";

    messageContainer.append(message);
    messageContainer.append(cursor);
    messageContainer.append(callToAction);

    this.htmlElement.append(messageContainer);
  }
}
