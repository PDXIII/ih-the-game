import { createElementWithClass } from "./toolkit.js";

const winningScene = [
  { text: "Woohoo!", nextStep: "toggle" },
  { text: "You have won!", nextStep: "playScene" },
  { text: "Wanna play again?", nextStep: "restart" },
];

export default class Narrator {
  constructor() {
    this.htmlElement = this.initHtmlElement();
    this.eventListener;
    this.currentTextCounter = 0;
    this.scene = [];
  }

  controller(event, resolve) {
    switch (event.code) {
      case "Space":
        this.htmlElement.querySelector(".cta").classList.toggle("visible");
        // event.preventDefault();
        // this.currentTextCounter++;
        console.log(this.scene);
        console.log("promise fulfilled");
        resolve();
        break;
      default:
    }
  }

  getPromiseFromEvent() {
    // found at https://stackoverflow.com/questions/6902334/how-to-let-javascript-wait-until-certain-event-happens

    console.log("promise made");
    // console.log(this.scene);
    return new Promise((resolve) => {
      document.removeEventListener("keyup", this.eventListener);
      this.initEventListener(resolve);
      // console.log(this.scene);
    });
  }

  async waitForSpace(nextStep) {
    console.log("wait for event");
    await this.getPromiseFromEvent();
    console.log(this.scene);

    switch (nextStep) {
      case "playScene":
        this.playScene();

        break;
      case "toggle":
        this.playScene();
        this.toggle();

        break;
      case "restart":
        window.location.reload();

        break;
      default:
        console.log("uncovered case");

        break;
    }
  }

  initScene(arr) {
    console.log("init scene");
    this.currentTextCounter = 0;
    this.scene = arr;

    this.playScene();
  }

  initWinningScene() {
    console.log("init winning scene");
    this.currentTextCounter = 0;
    this.scene = winningScene;

    this.playScene();
  }

  playScene() {
    console.log(this.currentTextCounter);
    this.displayText(this.scene[this.currentTextCounter].text);

    setTimeout(() => {
      this.htmlElement.querySelector(".cta").classList.toggle("visible");
    }, 500);

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
    const messageContainer = createElementWithClass("div", "message-container");
    const message = createElementWithClass("span", "message");
    const cursor = createElementWithClass("span", "cursor");
    const callToAction = createElementWithClass("div", "cta");
    callToAction.innerText = "hit the spacebar";

    narrator.append(messageContainer);
    messageContainer.append(message);
    messageContainer.append(cursor);
    messageContainer.append(callToAction);

    document.getElementById("app").append(narrator);
    return narrator;
  }
}
