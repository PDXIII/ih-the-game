const winningScene = [
  { text: "Woohoo!", nextStep: "playScene" },
  { text: "You have won!", nextStep: "playScene" },
  { text: "Ready for the next level?", nextStep: "nextLevel" },
];
const dyingScene = [
  { text: "OMG!", nextStep: "playScene" },
  { text: "You're dead!", nextStep: "playScene" },
  { text: "Wanna play again?", nextStep: "restart" },
];

const prank = [
  { text: "WOW!", nextStep: "playScene" },
  { text: "You suck!", nextStep: "toggle" },
  { text: "It's not that difficult!", nextStep: "kill" },
];

// const scene = [
//   { text: "Hey!", nextStep: "playScene" },
//   { text: "Wanna play a game?", nextStep: "toggle" },
//   {
//     text: "It is very easy!",
//     nextStep: "playScene",
//   },
//   {
//     text: "The goal is to reach the orange square with the orange circle.",
//     nextStep: "playScene",
//   },
//   {
//     text: "But when you hit one of the white squares, you will receive damage.",
//     nextStep: "toggle",
//   },
//   { text: "Still wanna play?", nextStep: "toggle" },
//   { text: "Okay, let's go!", nextStep: "kill" },
// ];

const typesOfObstacles = [
  { name: "flower", damage: 0, coins: 1 },
  { name: "apple", damage: 0, coins: 5 },
  { name: "stone", damage: 1, coins: 0 },
  { name: "snake", damage: 5, coins: 0 },
];

const levels = [
  {
    classList: [],
    typesOfObstacles: [{ name: "stone", damage: 1, coins: 0 }],
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
      //   { text: " ", nextStep: "" },
    ],
  },
  {
    classList: ["true", "show-coin-score"],
    typesOfObstacles: [
      { name: "flower", damage: 0, coins: 1 },
      { name: "apple", damage: 0, coins: 5 },
      { name: "stone", damage: 1, coins: 0 },
      { name: "snake", damage: 5, coins: 0 },
    ],
    scene: [
      { text: "Cool!", nextStep: "playScene" },
      { text: "Now we add some diversity.", nextStep: "toggle" },
      {
        text: "As you can see, we have some different obstacles on the map.",
        nextStep: "playScene",
      },
      {
        text: "Some will give you coins, and some will hurt you.",
        nextStep: "toggle",
      },
      { text: "Still wanna play?", nextStep: "toggle" },
      { text: "Okay, let's go!", nextStep: "kill" },
      //   { text: " ", nextStep: "" },
    ],
  },
  {
    classList: ["trita"],
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
      //   { text: " ", nextStep: "" },
    ],
  },
  {
    classList: ["deutera"],
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
      //   { text: " ", nextStep: "" },
    ],
  },
  {
    classList: ["prota"],
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
      //   { text: " ", nextStep: "" },
    ],
  },
];

export { prank, winningScene, levels, dyingScene, typesOfObstacles };
