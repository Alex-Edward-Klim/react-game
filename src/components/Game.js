import { useEffect, useRef } from "react";

import { keyframes } from "styled-components";

import blowImage from "../images/Blow.png";
import autoRedImage from "../images/AutoRed.png";
import autoYellowImage from "../images/AutoYellow.png";
import autoGreenImage from "../images/AutoGreen.png";
import autoBlueImage from "../images/AutoBlue.png";

import { calculatePositionConstants } from "./gameModules/responsive";

const arrOfAutoColors = [autoRedImage, autoGreenImage, autoBlueImage];
const pickRandomColorAuto = () =>
  arrOfAutoColors[Math.round(Math.random() * 2)];

function Game(props) {
  const gameSize = props.gameSize;
  const positionConstants = calculatePositionConstants(gameSize);

  const game = useRef(null);

  const taxi = useRef(null);

  const autoWrapperFirst = useRef(null);
  const autoWrapperSecond = useRef(null);

  const automobiles = {
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
    4: useRef(null),
    5: useRef(null),
    6: useRef(null),
    7: useRef(null),
    8: useRef(null),
    9: useRef(null),
    10: useRef(null),
    11: useRef(null),
    12: useRef(null),
  };

  const activeAutomobiles = {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
    10: true,
    11: true,
    12: true,
  };

  const roadsideStrips = {
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
    4: useRef(null),
  };

  const roadstripsFirstBlock = useRef(null);
  const roadstripsSecondBlock = useRef(null);

  const autoBlockAnimation = keyframes`
      0% {
        top: -${positionConstants[3600]}px;
      }
      100% {
        top: ${positionConstants[3600]}px;
      }
    `;

  const autoWrapperFirstAnimationStyles = {
    animation: `${autoBlockAnimation} 8s infinite linear`,
  };

  const autoWrapperSecondAnimationStyles = {
    animation: `${autoBlockAnimation} 8s infinite linear`,
    animationDelay: "4s",
  };

  const roadsideStripStyle = {
    width: positionConstants[25],
    height: positionConstants[900],
    background: `repeating-linear-gradient(
      #fff,
      #fff ${positionConstants[150]}px,
      #000 ${positionConstants[150]}px,
      #000 ${positionConstants[300]}px
    )`,
  };

  const roadsideStripFirstAnimation = keyframes`
    0% {
      top: -${positionConstants[900]}px;
    }
    100% {
      top: 0;
    }
  `;
  const roadsideStripFirstStyle = {
    ...roadsideStripStyle,
    top: -positionConstants[900],
    animation: `${roadsideStripFirstAnimation} 0.5s infinite linear`,
  };

  const roadsideStripSecondAnimation = keyframes`
    0% {
      top: 0;
    }
    100% {
      top: ${positionConstants[900]}px;
    }
  `;
  const roadsideStripSecondStyle = {
    ...roadsideStripStyle,
    top: 0,
    animation: `${roadsideStripSecondAnimation} 0.5s infinite linear`,
  };

  const roadstripsFirstBlockAnimation = keyframes`
    0% {
      top: ${positionConstants[112]}px;
    }
    100% {
      top: ${positionConstants[900]}px;
    }
  `;
  const roadstripsFirstBlockStyle = {
    left: positionConstants[145],
    top: positionConstants[112],
    animation: `${roadstripsFirstBlockAnimation} 0.5s infinite linear`,
  };

  const roadstripsSecondBlockAnimation = keyframes`
    0% {
      top: -${positionConstants[788]}px;
    }
    100% {
      top: ${positionConstants[112]}px;
    }
  `;
  const roadstripsSecondBlockStyle = {
    left: positionConstants[145],
    top: -positionConstants[900],
    animation: `${roadstripsSecondBlockAnimation} 0.5s infinite linear`,
  };

  const roadstripsLaneStyle = {
    width: positionConstants[10],
    height: positionConstants[900],
    background: `repeating-linear-gradient(
      #fff,
      #fff ${positionConstants[225]}px,
      transparent ${positionConstants[225]}px,
      transparent ${positionConstants[450]}px
    )`,
  };
  
  const autoWrapperAnimationiterationEventFunction = (from, to) => () => {
    for (let i = from; i <= to; i += 1) {
      automobiles[i].current.style.display = "block";
      automobiles[i].current.style.marginTop =
        Math.round(Math.random() * positionConstants[3400]) + "px";
      automobiles[
        i
      ].current.style.backgroundImage = `url(${pickRandomColorAuto()})`;
    }
  }

  const autoWrapperFirstAnimationiterationEventFunction = autoWrapperAnimationiterationEventFunction(1, 6);
  const autoWrapperSecondAnimationiterationEventFunction = autoWrapperAnimationiterationEventFunction(7, 12);

  useEffect(() => {
    game.current.style.width = `${positionConstants[900]}px`;
    game.current.style.height = `${positionConstants[900]}px`;

    taxi.current.style.width = `${positionConstants[100]}px`;
    taxi.current.style.height = `${positionConstants[200]}px`;
    taxi.current.style.top = `${positionConstants[700]}px`;
    taxi.current.style.left = `${positionConstants[475]}px`;

    autoWrapperFirst.current.style.height = `${positionConstants[3600]}px`;
    autoWrapperFirst.current.style.top = `${-positionConstants[3600]}px`;
    autoWrapperSecond.current.style.height = `${positionConstants[3600]}px`;
    autoWrapperSecond.current.style.top = `${-positionConstants[3600]}px`;

    for (let key in automobiles) {
      automobiles[key].current.style.margin = `${Math.round(
        Math.random() * positionConstants[3400]
      )}px ${positionConstants[25]}px 0 ${positionConstants[25]}px`;
      automobiles[
        key
      ].current.style.backgroundImage = `url(${pickRandomColorAuto()})`;
      automobiles[key].current.style.width = `${positionConstants[100]}px`;
      automobiles[key].current.style.height = `${positionConstants[200]}px`;
    }

    autoWrapperFirst.current.addEventListener("animationiteration", autoWrapperFirstAnimationiterationEventFunction);
    autoWrapperSecond.current.addEventListener("animationiteration", autoWrapperSecondAnimationiterationEventFunction);

    let driving = true;

    let left = parseInt(window.getComputedStyle(taxi.current).left);

    const moveRight = () => {
      if (left < positionConstants[800]) {
        taxi.current.style.left = `${(left += positionConstants[9])}px`;
      }
    };

    let rightMove;
    const startMovingRight = () => {
      rightMove = setInterval(moveRight, 10);
    };

    const stopMovingRight = () => {
      clearInterval(rightMove);
    };

    const moveLeft = () => {
      if (left > 0) {
        taxi.current.style.left = `${(left -= positionConstants[9])}px`;
      }
    };

    let leftMove;
    const startMovingLeft = () => {
      leftMove = setInterval(moveLeft, 10);
    };

    const stopMovingLeft = () => {
      clearInterval(leftMove);
    };

    let paused = false;
    const pause = () => {
      paused = true;

      driving = false;

      stopMovingLeft();
      stopMovingRight();

      autoWrapperFirst.current.style.animationPlayState = "paused";
      autoWrapperSecond.current.style.animationPlayState = "paused";

      for (let strip in roadsideStrips) {
        roadsideStrips[strip].current.style.animationPlayState = "paused";
      }
      roadstripsFirstBlock.current.style.animationPlayState = "paused";
      roadstripsSecondBlock.current.style.animationPlayState = "paused";
    };

    const handlePauseWindowEvent = () => pause();
    window.addEventListener("blur", handlePauseWindowEvent);

    const resume = () => {
      paused = false;

      driving = true;

      autoWrapperFirst.current.style.animationPlayState = "running";
      autoWrapperSecond.current.style.animationPlayState = "running";
      for (let strip in roadsideStrips) {
        roadsideStrips[strip].current.style.animationPlayState = "running";
      }
      roadstripsFirstBlock.current.style.animationPlayState = "running";
      roadstripsSecondBlock.current.style.animationPlayState = "running";
    };

    const handleKeyDown = (e) => {
      if (e.repeat) {
        return;
      }

      if (e.code === "KeyP") {
        if (paused) {
          resume();
        } else {
          pause();
        }
      }

      if (driving) {
        if (e.code === "ArrowRight") {
          startMovingRight();
        }

        if (e.code === "ArrowLeft") {
          startMovingLeft();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const handleKeyUp = (e) => {
      if (e.code === "ArrowRight") {
        stopMovingRight();
      }

      if (e.code === "ArrowLeft") {
        stopMovingLeft();
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    let clearBoomTimeout;
    const boom = (num) => {
      driving = false;
      activeAutomobiles[num] = false;

      stopMovingLeft();
      stopMovingRight();

      automobiles[num].current.style.backgroundImage = `url(${blowImage})`;
      taxi.current.style.backgroundImage = `url(${blowImage})`;

      autoWrapperFirst.current.style.animationPlayState = "paused";
      autoWrapperSecond.current.style.animationPlayState = "paused";

      for (let strip in roadsideStrips) {
        roadsideStrips[strip].current.style.animationPlayState = "paused";
      }
      roadstripsFirstBlock.current.style.animationPlayState = "paused";
      roadstripsSecondBlock.current.style.animationPlayState = "paused";

      clearBoomTimeout = setTimeout(() => {
        automobiles[num].current.style.display = "none";
        taxi.current.style.backgroundImage = `url(${autoYellowImage})`;

        activeAutomobiles[num] = true;

        driving = true;

        autoWrapperFirst.current.style.animationPlayState = "running";
        autoWrapperSecond.current.style.animationPlayState = "running";

        for (let strip in roadsideStrips) {
          roadsideStrips[strip].current.style.animationPlayState = "running";
        }

        roadstripsFirstBlock.current.style.animationPlayState = "running";
        roadstripsSecondBlock.current.style.animationPlayState = "running";
      }, 3000);
    };

    const gameActionInterval = setInterval(() => {

    if (automobiles[1].current) {

      const positionAuto1 = Math.round(
        automobiles[1].current.getBoundingClientRect().y
      );
      const positionAuto2 = Math.round(
        automobiles[2].current.getBoundingClientRect().y
      );
      const positionAuto3 = Math.round(
        automobiles[3].current.getBoundingClientRect().y
      );
      const positionAuto4 = Math.round(
        automobiles[4].current.getBoundingClientRect().y
      );
      const positionAuto5 = Math.round(
        automobiles[5].current.getBoundingClientRect().y
      );
      const positionAuto6 = Math.round(
        automobiles[6].current.getBoundingClientRect().y
      );
      const positionAuto7 = Math.round(
        automobiles[7].current.getBoundingClientRect().y
      );
      const positionAuto8 = Math.round(
        automobiles[8].current.getBoundingClientRect().y
      );
      const positionAuto9 = Math.round(
        automobiles[9].current.getBoundingClientRect().y
      );
      const positionAuto10 = Math.round(
        automobiles[10].current.getBoundingClientRect().y
      );
      const positionAuto11 = Math.round(
        automobiles[11].current.getBoundingClientRect().y
      );
      const positionAuto12 = Math.round(
        automobiles[12].current.getBoundingClientRect().y
      );

      if (
        activeAutomobiles[12] &&
        left < positionConstants[125] &&
        positionAuto12 > positionConstants[500] &&
        positionAuto12 < positionConstants[900]
      ) {
        boom(12);
      } else if (
        activeAutomobiles[6] &&
        left < positionConstants[125] &&
        positionAuto6 > positionConstants[500] &&
        positionAuto6 < positionConstants[900]
      ) {
        boom(6);
      } else if (
        activeAutomobiles[5] &&
        left > positionConstants[75] &&
        left < positionConstants[275] &&
        positionAuto5 > positionConstants[500] &&
        positionAuto5 < positionConstants[900]
      ) {
        boom(5);
      } else if (
        activeAutomobiles[11] &&
        left > positionConstants[75] &&
        left < positionConstants[275] &&
        positionAuto11 > positionConstants[500] &&
        positionAuto11 < positionConstants[900]
      ) {
        boom(11);
      } else if (
        activeAutomobiles[4] &&
        left > positionConstants[225] &&
        left < positionConstants[425] &&
        positionAuto4 > positionConstants[500] &&
        positionAuto4 < positionConstants[900]
      ) {
        boom(4);
      } else if (
        activeAutomobiles[10] &&
        left > positionConstants[225] &&
        left < positionConstants[425] &&
        positionAuto10 > positionConstants[500] &&
        positionAuto10 < positionConstants[900]
      ) {
        boom(10);
      } else if (
        activeAutomobiles[3] &&
        left > positionConstants[375] &&
        left < positionConstants[575] &&
        positionAuto3 > positionConstants[500] &&
        positionAuto3 < positionConstants[900]
      ) {
        boom(3);
      } else if (
        activeAutomobiles[9] &&
        left > positionConstants[375] &&
        left < positionConstants[575] &&
        positionAuto9 > positionConstants[500] &&
        positionAuto9 < positionConstants[900]
      ) {
        boom(9);
      } else if (
        activeAutomobiles[2] &&
        left > positionConstants[525] &&
        left < positionConstants[725] &&
        positionAuto2 > positionConstants[500] &&
        positionAuto2 < positionConstants[900]
      ) {
        boom(2);
      } else if (
        activeAutomobiles[8] &&
        left > positionConstants[525] &&
        left < positionConstants[725] &&
        positionAuto8 > positionConstants[500] &&
        positionAuto8 < positionConstants[900]
      ) {
        boom(8);
      } else if (
        activeAutomobiles[1] &&
        left > positionConstants[675] &&
        left < positionConstants[875] &&
        positionAuto1 > positionConstants[500] &&
        positionAuto1 < positionConstants[900]
      ) {
        boom(1);
      } else if (
        activeAutomobiles[7] &&
        left > positionConstants[675] &&
        left < positionConstants[875] &&
        positionAuto7 > positionConstants[500] &&
        positionAuto7 < positionConstants[900]
      ) {
        boom(7);
      }
    }
  
    }, 10);

    return () => {
      clearInterval(gameActionInterval);
      clearTimeout(clearBoomTimeout);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handlePauseWindowEvent);
    };
  }, []);

  return (
    <div>
      <div className="game" ref={game}>
        <div className="taxi" ref={taxi}></div>

        <div
          className={`auto-wrapper-first`}
          style={autoWrapperFirstAnimationStyles}
          ref={autoWrapperFirst}
        >
          <div
            className={`auto-lane auto-wrapper-first__auto-six`}
            ref={automobiles[6]}
          ></div>
          <div
            className={`auto-lane auto-wrapper-first__auto-five`}
            ref={automobiles[5]}
          ></div>
          <div
            className={`auto-lane auto-wrapper-first__auto-four`}
            ref={automobiles[4]}
          ></div>
          <div
            className={`auto-lane auto-wrapper-first__auto-three`}
            ref={automobiles[3]}
          ></div>
          <div
            className={`auto-lane auto-wrapper-first__auto-two`}
            ref={automobiles[2]}
          ></div>
          <div
            className={`auto-lane auto-wrapper-first__auto-one`}
            ref={automobiles[1]}
          ></div>
        </div>

        <div
          className={`auto-wrapper-second`}
          style={autoWrapperSecondAnimationStyles}
          ref={autoWrapperSecond}
        >
          <div
            className={`auto-lane auto-wrapper-second__auto-six`}
            ref={automobiles[12]}
          ></div>
          <div
            className={`auto-lane auto-wrapper-second__auto-five`}
            ref={automobiles[11]}
          ></div>
          <div
            className={`auto-lane auto-wrapper-second__auto-four`}
            ref={automobiles[10]}
          ></div>
          <div
            className={`auto-lane auto-wrapper-second__auto-three`}
            ref={automobiles[9]}
          ></div>
          <div
            className={`auto-lane auto-wrapper-second__auto-two`}
            ref={automobiles[8]}
          ></div>
          <div
            className={`auto-lane auto-wrapper-second__auto-one`}
            ref={automobiles[7]}
          ></div>
        </div>

        <div
          className="roadside-strip roadside-strip__first roadside-strip__left"
          style={roadsideStripFirstStyle}
          ref={roadsideStrips[1]}
        ></div>
        <div
          className="roadside-strip roadside-strip__first roadside-strip__right"
          style={roadsideStripFirstStyle}
          ref={roadsideStrips[2]}
        ></div>

        <div
          className="roadside-strip roadside-strip__second roadside-strip__left"
          style={roadsideStripSecondStyle}
          ref={roadsideStrips[3]}
        ></div>
        <div
          className="roadside-strip roadside-strip__second roadside-strip__right"
          style={roadsideStripSecondStyle}
          ref={roadsideStrips[4]}
        ></div>

        <div
          className="roadstrips"
          style={roadstripsFirstBlockStyle}
          ref={roadstripsFirstBlock}
        >
          <div style={roadstripsLaneStyle}></div>
          <div style={roadstripsLaneStyle}></div>
          <div style={roadstripsLaneStyle}></div>
          <div style={roadstripsLaneStyle}></div>
          <div style={roadstripsLaneStyle}></div>
        </div>

        <div
          className="roadstrips"
          style={roadstripsSecondBlockStyle}
          ref={roadstripsSecondBlock}
        >
          <div style={roadstripsLaneStyle}></div>
          <div style={roadstripsLaneStyle}></div>
          <div style={roadstripsLaneStyle}></div>
          <div style={roadstripsLaneStyle}></div>
          <div style={roadstripsLaneStyle}></div>
        </div>
      </div>
    </div>
  );
}

export default Game;
