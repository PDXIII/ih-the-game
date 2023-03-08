import Player from "./Player.js";
import Obstacle from "./Obstacle.js";
import StatsDisplay from "./StatsDisplay.js";
import { calcRandomIntWithMax } from "./toolkit.js";

const levels = [
  {
    classList: [],
  },
  {
    classList: ["true"],
  },
  {
    classList: ["trita"],
  },
  {
    classList: ["deutera"],
  },
  {
    classList: ["prota"],
  },
];

export default class Level {
  constructor(map, narrator, levelIndex) {
    this.map = map;
    this.narrator = narrator;
    this.typesOfObstacles = [
      { name: "flower", damage: 0, coins: 1 },
      { name: "apple", damage: 0, coins: 5 },
      { name: "stone", damage: 1, coins: 0 },
      { name: "snake", damage: 5, coins: 0 },
    ];
    this.obstacles = this.initObstacles();
    this.player = this.initPlayer();
    this.scoreDisplay = this.initScoreDisplay();
    this.data = levels[levelIndex];
    this.loadData(this.data);
  }

  loadData(levelData) {
    levelData.classList.forEach((item) => {
      this.map.htmlElement.classList.add(item);
    });
  }

  detectCollision(location1, location2) {
    return this.calcFieldId(location1) === this.calcFieldId(location2);
  }

  toggleNarrator() {
    document.querySelector(".narrator").classList.toggle("scale-up");
    this.map.htmlElement.classList.toggle("scale-down");
  }

  updateWorld() {
    this.obstacles.forEach((ele) => {
      this.detectCollision(ele.location, this.player.destLocation)
        ? // ? this.player.takesDamage()
          this.player.handleCollision(ele)
        : this.player.updateLocation();
    });
    this.scoreDisplay.update(this.player.lifeScore, this.player.coinsScore);
  }

  calcFieldId(location) {
    return location.x * this.map.dimension + location.y;
  }

  initObstacles() {
    const obstacles = [];
    const amountOfEach = Math.floor(this.map.mapSize / 5);

    this.typesOfObstacles.forEach((type) => {
      for (let i = 0; i < amountOfEach; i++) {
        const x = calcRandomIntWithMax(this.map.mapSize);
        const y = calcRandomIntWithMax(this.map.mapSize);
        const obstacle = new Obstacle(
          this.calcFieldId({ x: x, y: y }),
          x,
          y,
          this.map.dimension,
          type.name,
          type.damage,
          type.coins
        );

        // console.log(obstacles);
        obstacles.push(obstacle);

        this.map.htmlElement.append(obstacle.htmlElement);
      }
    });

    const exitX = calcRandomIntWithMax(this.map.mapSize);
    const exitY = calcRandomIntWithMax(this.map.mapSize);

    const exit = new Obstacle(
      this.calcFieldId({
        x: exitX,
        y: exitY,
      }),
      exitX,
      exitY,
      this.map.dimension,
      "exit",
      0,
      0
    );

    this.map.htmlElement.append(exit.htmlElement);
    obstacles.push(exit);
    return obstacles;
  }

  initPlayer() {
    const player = new Player("Billy Bob", this.map.dimension);
    this.map.htmlElement.append(player.htmlElement);
    // console.log("player born");
    return player;
  }

  initScoreDisplay() {
    return new StatsDisplay(this.player.lifeScore);
  }

  showStatus() {
    const fieldId = this.calcFieldId(this.player.location);
    console.log(this.player.showStatus());
    console.log(this.player.name, "stands on field no.: ", fieldId);
    console.log("field: ", this.map.getFieldById(fieldId));
    console.log("obstacles: ", this.obstacles);
  }
}
