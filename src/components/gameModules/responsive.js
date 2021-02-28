// Example Numbers for 900px:
export const calculatePositionConstants = (gameSize) => {
  // 100
  const taxiWidth = Math.floor(gameSize / 9);
  // 200
  const taxiHeight = taxiWidth * 2;

  // 150
  const laneSize = Math.floor(gameSize / 6);
  // 75
  const halfLaneSize = Math.floor(laneSize / 2);

  // 475
  const taxiInitialLanePosition = laneSize * 2 + taxiWidth + halfLaneSize;

  // 10
  const roadstripWidth = Math.floor(gameSize / 90);
  // 112
  const roadstripsMarginTop = Math.floor(gameSize / 8);

  return {
    9: Math.floor(gameSize / 100),
    10: roadstripWidth,
    25: taxiWidth - halfLaneSize,
    75: halfLaneSize,
    100: taxiWidth,
    112: roadstripsMarginTop,
    125: taxiHeight - halfLaneSize,
    145: laneSize - Math.floor(roadstripWidth / 2),
    150: laneSize,
    175: taxiWidth + halfLaneSize,
    200: taxiHeight,
    225: laneSize + halfLaneSize,
    275: taxiHeight + halfLaneSize,
    300: laneSize * 2,
    325: taxiWidth + laneSize + halfLaneSize,
    375: halfLaneSize + laneSize * 2,
    425: taxiHeight - halfLaneSize + laneSize * 2,
    450: Math.floor(gameSize / 2),
    475: taxiInitialLanePosition,
    500: gameSize - taxiHeight * 2,
    525: halfLaneSize + laneSize * 3,
    575: taxiHeight - halfLaneSize + laneSize * 3,
    625: taxiInitialLanePosition + laneSize,
    675: halfLaneSize + laneSize * 4,
    700: gameSize - taxiHeight,
    725: taxiHeight - halfLaneSize + laneSize * 4,
    775: taxiInitialLanePosition + laneSize * 2,
    788: gameSize - roadstripsMarginTop,
    800: gameSize - taxiWidth,
    875: taxiHeight - halfLaneSize + laneSize * 5,
    900: gameSize,
    3400: gameSize * 4 - taxiHeight,
    3600: gameSize * 4,
  };
};
