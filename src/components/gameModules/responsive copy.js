export const setElementsSizeAndPosition = () => {
  const screenWidth = document.body.clientWidth;

  const gameFieldSize = 900;
  const gameFieldWidth = gameFieldSize;
  const gameFieldHeight = gameFieldSize;

  const autoWidth = 100;
  const autoHeight = autoWidth * 2;

  const autoInitialPosition = 3400;

  const moveRightLimit = 800; // = gameFieldSize - autoWidth;
  const moveLeftLimit = 0; // NO NEED!
  const taxiMove = 9; // = gameFieldSize / 100;

  const taxiLeftPositionLimitRow = {
    1: 125,
    2: {left: 75, right: 275}, // + 150 ( + Lane Width)
    3: {left: 225, right: 425}, // + 150 ( + Lane Width)
    4: {left: 375, right: 575}, // + 150 ( + Lane Width)
    5: {left: 525, right: 575}, // + 150 ( + Lane Width)
    6: {left: 675, right: 875},
  };
  const positionAutoUpperLimit = 500; // = gameFieldSize - autoHeight * 2;
  const positionAutoLowerLimit = 900; // = gameFieldSize;

};
