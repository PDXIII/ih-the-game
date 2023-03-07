import { createElementWithClass } from "./toolkit.js";

export default class StatsDisplay {
  constructor(lifeScore, coinsScore = 0) {
    this.lifeScore = lifeScore;
    this.coinsScore = coinsScore;
    this.htmlElement = this.initHtmlElement();
    this.lifeScoreDisplay = this.initScoreDisplay(
      "span",
      "score life-score",
      this.lifeScore
    );
    this.coinsScoreDisplay = this.initScoreDisplay(
      "span",
      "score coins-score",
      this.coinsScore
    );
  }

  initHtmlElement() {
    const display = createElementWithClass("div", "score-display");
    // display.classList.add("scale-down");

    const app = document.getElementById("app");
    app.append(display);

    return display;
  }

  initScoreDisplay(tag, classList, value) {
    const display = createElementWithClass(tag, classList);
    display.innerHTML = value;
    this.htmlElement.append(display);
    return display;
  }

  update(life, coins) {
    this.lifeScore = life;
    this.coinsScore = coins;
    this.render();
  }
  render() {
    this.lifeScoreDisplay.innerHTML =
      this.lifeScore > 0 ? this.lifeScore : "☠️";
    this.coinsScoreDisplay.innerHTML = this.coinsScore;
  }
}
