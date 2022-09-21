import React, { useRef, useEffect } from "react";
import {
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    background: "#018DED url(http://unsplash.it/1500/1000?image=881&blur=50)",
    backgroundSize: "cover",
    fontFamily: 'helvetica neue',
    textAlign: "center",
    margin: "0",
    fontSize: "2rem",
    display: "flex",
    flex: "1",
    minHeight: "100vh",
    alignItems: "center",
  },
  clock: {
    width: "30rem",
    height: "30rem",
    border: "20px solid white",
    borderRadius: "50%",
    margin: "50px auto",
    position: "relative",
    padding: "2rem",
    boxShadow:
      "0 0 0 4px rgba(0,0,0,0.1) inset 0 0 0 3px #EFEFEF inset 0 0 10px black 0 0 10px rgba(0,0,0,0.2)",
  },
  clockFace: {
    position: "relative",
    width: "100%",
    height: "100%",
    transform: "translateY(-3px)", /* account for the height of the clock hands */
  },
  secondHand: {
    width: "50%",
    height: "6px",
    background: "black",
    position: "absolute",
    top: "50%",
    transformOrigin: "100%",
    transform: "rotate(90deg)",
    transition: "all 0.05s",
    transitionTimingFunction: "cubic-bezier(0, 1.63, 0.58, 1)",
    backgroundColor: "red"
  },
  hand: {
    width: "50%",
    height: "6px",
    background: "black",
    position: "absolute",
    top: "50%",
    transformOrigin: "100%",
    transform: "rotate(90deg)",
    transition: "all 0.05s",
    transitionTimingFunction: "cubic-bezier(0, 1.63, 0.58, 1)",
  }
}))

const JSClock = () => {
  const classes = useStyles();
  const hourRef = useRef();
  const minRef = useRef();
  const secRef = useRef();

  useEffect(() => {
    const hourElement = hourRef.current;
    const minElement = minRef.current;
    const secElement = secRef.current;

    function setDate() {
      //seconds
      const now = new Date();
      const seconds = now.getSeconds();
      const secondsDegrees = ((seconds / 60) * 360) + 90;
      secElement.style.transform = `rotate(${secondsDegrees}deg)`;

      //minutes
      const minutes = now.getMinutes();
      const minutesDegrees = ((minutes / 60) * 360) + 90;
      minElement.style.transform = (`rotate(${minutesDegrees}deg)`);

      //hours
      const hours = now.getHours();
      const hoursDegrees = ((hours / 12) * 360) + 90;
      hourElement.style.transform = (`rotate(${hoursDegrees}deg)`);
    }

    setInterval(setDate, 1000);
    
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.clock}>
        <div className={classes.clockFace}>
          <div ref={hourRef} className={classes.hand}></div>
          <div ref={minRef} className={classes.hand}></div>
          <div ref={secRef} className={classes.secondHand}></div>
        </div>
      </div>
    </div>
  );
}

export default JSClock;