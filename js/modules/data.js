const winningScene = [
  { text: `Woohoo! 🎉`, nextStep: "playScene" },
  { text: "You win! 🥳", nextStep: "playScene" },
  { text: "Ready for the next level?", nextStep: "nextLevel" },
];
const dyingScene = [
  { text: `OMG! 🫣`, nextStep: "playScene" },
  { text: `You're dead! 💀`, nextStep: "playScene" },
  { text: "Wanna play again?", nextStep: "restart" },
];

const prank = [
  { text: `WOW! 😡`, nextStep: "playScene" },
  { text: `You suck!`, nextStep: "toggle" },
  { text: "It's not that difficult!", nextStep: "kill" },
];
// is typesOfObstacles still in use
const typesOfObstacles = [
  { name: "flower", damage: 0, coins: 1 },
  { name: "apple", damage: 0, coins: 5 },
  { name: "stone", damage: 1, coins: 0 },
  { name: "snake", damage: 5, coins: 0 },
];

const levels = [
  {
    mapSize: 8,
    mapDimension: 16,
    maxLife: 6,
    maxCoins: 10,
    classList: [],
    typesOfObstacles: [{ name: "stone", damage: 1, coins: 0 }],
    scene: [
      { text: `Hey! 😃`, nextStep: "playScene" },
      { text: "Wanna play a game?", nextStep: "toggle" },
      {
        text: "It is very easy!",
        nextStep: "playScene",
      },
      {
        text: "The goal is to reach the orange square with the orange circle.",
        nextStep: "playScene",
      },
      {
        text: "But when you'll hit one of the white squares, you will receive damage.",
        nextStep: "toggle",
      },
      { text: "Still wanna play?", nextStep: "toggle" },
      { text: "Okay, let's go!", nextStep: "kill" },
    ],
  },
  {
    mapSize: 16,
    mapDimension: 16,
    maxLife: 16,
    maxCoins: 10,
    classList: ["true"],
    typesOfObstacles: [
      { name: "flower", damage: 0, coins: 1 },
      { name: "apple", damage: 0, coins: 5 },
      { name: "stone", damage: 1, coins: 0 },
      { name: "snake", damage: 5, coins: 0 },
    ],
    scene: [
      { text: "Cool!", nextStep: "playScene" },
      {
        text: "Now we add some diversity with some different obstacles on the map.",
        nextStep: "playScene",
      },
      {
        text: "Some will give you coins, and some will hurt you.",
        nextStep: "playScene",
      },
      { text: "Still wanna play?", nextStep: "toggle" },
      { text: "Okay, let's go!", nextStep: "kill" },
    ],
  },
  {
    mapSize: 16,
    mapDimension: 16,
    maxLife: 16,
    maxCoins: 10,
    classList: ["trita", "player-animated"],
    typesOfObstacles: [
      { name: "flower", damage: 0, coins: 1 },
      { name: "apple", damage: 0, coins: 5 },
      { name: "stone", damage: 1, coins: 0 },
      { name: "snake", damage: 5, coins: 0 },
    ],
    scene: [
      { text: `Nice! 🤓`, nextStep: "playScene" },
      { text: "Have you ever heard about tritanopia?", nextStep: "playScene" },
      {
        text: "Better know as one kind of color blindness.",
        nextStep: "playScene",
      },
      {
        text: "So, colors have changed now. But we’ve added a nice animation to your player",
        nextStep: "playScene",
      },
      { text: "Still wanna play?", nextStep: "toggle" },
      { text: "Okay, let's go!", nextStep: "kill" },
    ],
  },
  {
    mapSize: 16,
    mapDimension: 16,
    maxLife: 16,
    maxCoins: 10,
    classList: ["deutera", "player-animated"],
    typesOfObstacles: [
      { name: "flower", damage: 0, coins: 1 },
      { name: "apple", damage: 0, coins: 5 },
      { name: "stone", damage: 1, coins: 0 },
      { name: "snake", damage: 5, coins: 0 },
    ],
    scene: [
      { text: "Hey!", nextStep: "playScene" },
      { text: "This is Level 3 and it's very buggy!", nextStep: "toggle" },
      {
        text: "It is very easy!",
        nextStep: "playScene",
      },
      {
        text: "The goal is to reach the orange square with the orange circle.",
        nextStep: "playScene",
      },
      {
        text: "But when you hit one of the white squares, you will receive damage.",
        nextStep: "toggle",
      },
      { text: "Still wanna play?", nextStep: "toggle" },
      { text: "Okay, let's go!", nextStep: "kill" },
    ],
  },
  {
    mapSize: 16,
    mapDimension: 16,
    maxLife: 16,
    maxCoins: 10,
    classList: ["prota", "player-animated"],
    typesOfObstacles: [
      { name: "flower", damage: 0, coins: 1 },
      { name: "apple", damage: 0, coins: 5 },
      { name: "stone", damage: 1, coins: 0 },
      { name: "snake", damage: 5, coins: 0 },
    ],
    scene: [
      { text: "Hey!", nextStep: "playScene" },
      { text: "Wanna play a game?", nextStep: "toggle" },
      {
        text: "It is very easy!",
        nextStep: "playScene",
      },
      {
        text: "The goal is to reach the orange square with the orange circle.",
        nextStep: "playScene",
      },
      {
        text: "But when you hit one of the white squares, you will receive damage.",
        nextStep: "toggle",
      },
      { text: "Still wanna play?", nextStep: "toggle" },
      { text: "Okay, let's go!", nextStep: "kill" },
    ],
  },
];

export { prank, winningScene, levels, dyingScene, typesOfObstacles };
