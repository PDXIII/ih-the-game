export default class StatsDisplay {
  constructor(lifeScore) {
    this.lifeScore = lifeScore;
    this.htmlElement = this.initHtmlElement();
    this.lifeScoreDisplay = this.initLifeScoreDisplay();
  }

  initHtmlElement() {
    const display = document.createElement("div");
    display.classList.add("score-display");
    // display.classList.add("scale-down");
    display.innerHTML = `❤️`;

    const app = document.getElementById("app");
    app.append(display);

    return display;
  }

  initLifeScoreDisplay() {
    const display = document.createElement("span");
    display.classList.add("life-score");
    display.innerHTML = this.lifeScore;
    this.htmlElement.append(display);
    return display;
  }

  update(num) {
    this.lifeScore = num;
    this.render();
  }
  render() {
    this.lifeScoreDisplay.innerHTML =
      this.lifeScore > 0 ? this.lifeScore : "☠️";
  }
}
