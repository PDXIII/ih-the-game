import { createElementWithClass } from "./toolkit.js";

export default class Narrator {
  constructor() {
    this.htmlElement = this.initHtmlElement();
  }

  initHtmlElement() {
    const narrator = createElementWithClass("div", "narrator scale-up");
    const messageContainer = createElementWithClass("div", "message-container");
    const message = createElementWithClass("span", "message");
    const cursor = createElementWithClass("span", "cursor");

    narrator.append(messageContainer);
    messageContainer.append(message);
    messageContainer.append(cursor);

    message.innerText = `Hey!
    Wanna play a game?
    Hit the spacebar!`;

    document.getElementById("app").append(narrator);
    return narrator;
  }
}
