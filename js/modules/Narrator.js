export default class Narrator {
  constructor() {
    this.htmlElement = this.initHtmlElement();
  }

  initHtmlElement() {
    const narrator = document.createElement("div");
    narrator.classList.add("narrator");
    narrator.classList.add("scale-up");
    document.getElementById("app").append(narrator);
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container");
    narrator.append(messageContainer);
    const message = document.createElement("span");
    message.classList.add("message");
    messageContainer.append(message);
    const cursor = document.createElement("span");
    cursor.classList.add("cursor");
    messageContainer.append(cursor);
    message.innerText = `Hey!
    Wanna play a game?
    Hit the spacebar!`;

    return narrator;
  }
}
