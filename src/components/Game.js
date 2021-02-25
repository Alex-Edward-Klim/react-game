import { useEffect, useRef } from "react";

import blowImage from "../images/Blow.png";
import autoRedImage from "../images/AutoRed.png";
import autoYellowImage from "../images/AutoYellow.png";
import autoGreenImage from "../images/AutoGreen.png";
import autoBlueImage from "../images/AutoBlue.png";

const arrOfAutoColors = [autoRedImage, autoGreenImage, autoBlueImage];
const pickRandomColorAuto = () =>
  arrOfAutoColors[Math.round(Math.random() * 2)];

function Game() {
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

  useEffect(() => {
    // const windowWidth = document.body.clientWidth;
    // console.log(windowWidth);

    for (let key in automobiles) {
      automobiles[key].current.style.marginTop =
        Math.round(Math.random() * 3400) + "px";
      automobiles[
        key
      ].current.style.backgroundImage = `url(${pickRandomColorAuto()})`;
    }

    autoWrapperFirst.current.addEventListener("animationiteration", () => {
      for (let i = 1; i <= 6; i += 1) {
        automobiles[i].current.style.display = "block";
        automobiles[i].current.style.marginTop =
          Math.round(Math.random() * 3400) + "px";
        automobiles[
          i
        ].current.style.backgroundImage = `url(${pickRandomColorAuto()})`;
      }
    });

    autoWrapperSecond.current.addEventListener("animationiteration", () => {
      for (let i = 7; i <= 12; i += 1) {
        automobiles[i].current.style.display = "block";
        automobiles[i].current.style.marginTop =
          Math.round(Math.random() * 3400) + "px";
        automobiles[
          i
        ].current.style.backgroundImage = `url(${pickRandomColorAuto()})`;
      }
    });

    let driving = true;

    let left = parseInt(window.getComputedStyle(taxi.current).left);

    const moveRight = () => {
      if (left < 800) {
        taxi.current.style.left = `${(left += 10)}px`;
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
        taxi.current.style.left = `${(left -= 10)}px`;
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

    window.addEventListener("blur", () => pause());

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

      setTimeout(() => {
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
        left < 125 &&
        positionAuto12 > 500 &&
        positionAuto12 < 900
      ) {
        boom(12);
      } else if (
        activeAutomobiles[6] &&
        left < 125 &&
        positionAuto6 > 500 &&
        positionAuto6 < 900
      ) {
        boom(6);
      } else if (
        activeAutomobiles[5] &&
        left > 75 &&
        left < 275 &&
        positionAuto5 > 500 &&
        positionAuto5 < 900
      ) {
        boom(5);
      } else if (
        activeAutomobiles[11] &&
        left > 75 &&
        left < 275 &&
        positionAuto11 > 500 &&
        positionAuto11 < 900
      ) {
        boom(11);
      } else if (
        activeAutomobiles[4] &&
        left > 225 &&
        left < 425 &&
        positionAuto4 > 500 &&
        positionAuto4 < 900
      ) {
        boom(4);
      } else if (
        activeAutomobiles[10] &&
        left > 225 &&
        left < 425 &&
        positionAuto10 > 500 &&
        positionAuto10 < 900
      ) {
        boom(10);
      } else if (
        activeAutomobiles[3] &&
        left > 375 &&
        left < 575 &&
        positionAuto3 > 500 &&
        positionAuto3 < 900
      ) {
        boom(3);
      } else if (
        activeAutomobiles[9] &&
        left > 375 &&
        left < 575 &&
        positionAuto9 > 500 &&
        positionAuto9 < 900
      ) {
        boom(9);
      } else if (
        activeAutomobiles[2] &&
        left > 525 &&
        left < 725 &&
        positionAuto2 > 500 &&
        positionAuto2 < 900
      ) {
        boom(2);
      } else if (
        activeAutomobiles[8] &&
        left > 525 &&
        left < 725 &&
        positionAuto8 > 500 &&
        positionAuto8 < 900
      ) {
        boom(8);
      } else if (
        activeAutomobiles[1] &&
        left > 675 &&
        left < 875 &&
        positionAuto1 > 500 &&
        positionAuto1 < 900
      ) {
        boom(1);
      } else if (
        activeAutomobiles[7] &&
        left > 675 &&
        left < 875 &&
        positionAuto7 > 500 &&
        positionAuto7 < 900
      ) {
        boom(7);
      }
    }, 10);

    return () => {
      clearInterval(gameActionInterval);
    };
  }, []);

  return (
    <div>
      <div className="game" ref={game}>
        <div className="taxi" ref={taxi}></div>

        <div className="auto-wrapper-first" ref={autoWrapperFirst}>
          <div
            className="auto-lane auto-wrapper-first__auto-six"
            ref={automobiles[6]}
          ></div>
          <div
            className="auto-lane auto-wrapper-first__auto-five"
            ref={automobiles[5]}
          ></div>
          <div
            className="auto-lane auto-wrapper-first__auto-four"
            ref={automobiles[4]}
          ></div>
          <div
            className="auto-lane auto-wrapper-first__auto-three"
            ref={automobiles[3]}
          ></div>
          <div
            className="auto-lane auto-wrapper-first__auto-two"
            ref={automobiles[2]}
          ></div>
          <div
            className="auto-lane auto-wrapper-first__auto-one"
            ref={automobiles[1]}
          ></div>
        </div>

        <div className="auto-wrapper-second" ref={autoWrapperSecond}>
          <div
            className="auto-lane auto-wrapper-second__auto-six"
            ref={automobiles[12]}
          ></div>
          <div
            className="auto-lane auto-wrapper-second__auto-five"
            ref={automobiles[11]}
          ></div>
          <div
            className="auto-lane auto-wrapper-second__auto-four"
            ref={automobiles[10]}
          ></div>
          <div
            className="auto-lane auto-wrapper-second__auto-three"
            ref={automobiles[9]}
          ></div>
          <div
            className="auto-lane auto-wrapper-second__auto-two"
            ref={automobiles[8]}
          ></div>
          <div
            className="auto-lane auto-wrapper-second__auto-one"
            ref={automobiles[7]}
          ></div>
        </div>

        <div
          className="roadside-strip roadside-strip__first roadside-strip__left"
          ref={roadsideStrips[1]}
        ></div>
        <div
          className="roadside-strip roadside-strip__first roadside-strip__right"
          ref={roadsideStrips[2]}
        ></div>

        <div
          className="roadside-strip roadside-strip__second roadside-strip__left"
          ref={roadsideStrips[3]}
        ></div>
        <div
          className="roadside-strip roadside-strip__second roadside-strip__right"
          ref={roadsideStrips[4]}
        ></div>

        <div
          className="roadstrips roadstrips__first-block"
          ref={roadstripsFirstBlock}
        >
          <div className="roadstrips-lane"></div>
          <div className="roadstrips-lane"></div>
          <div className="roadstrips-lane"></div>
          <div className="roadstrips-lane"></div>
          <div className="roadstrips-lane"></div>
        </div>

        <div
          className="roadstrips roadstrips__second-block"
          ref={roadstripsSecondBlock}
        >
          <div className="roadstrips-lane"></div>
          <div className="roadstrips-lane"></div>
          <div className="roadstrips-lane"></div>
          <div className="roadstrips-lane"></div>
          <div className="roadstrips-lane"></div>
        </div>
      </div>
    </div>
  );
}

export default Game;
