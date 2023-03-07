const createElementWithClass = (tag, classList) => {
  // receives tag and classList as strings
  const ele = document.createElement(tag);
  ele.classList = classList;
  return ele;
};

const initHtmlElementWithLocation = (tag, classList, location, dimension) => {
  const ele = createElementWithClass(tag, classList);
  //   add position and size based on the passed arguments
  ele.style.left = location.x * dimension;
  ele.style.top = location.y * dimension;
  ele.style.width = dimension;
  ele.style.height = dimension;
  return ele;
};

const calcRandomIntWithMax = (max) => {
  return Math.floor(Math.random() * max);
};
export {
  createElementWithClass,
  initHtmlElementWithLocation,
  calcRandomIntWithMax,
};
