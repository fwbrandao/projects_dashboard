import React, {useRef} from "react";
import {
  Box,
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    boxSizing: "border-box",
    background: "#ffc600",
    fontFamily: 'helvetica neue',
    fontSize: "20px",
    fontWeight: "200",
    margin: 0,
  },
  panels: {
    minHeight: "100vh",
    overflow: "hidden",
    display: "flex",
  },
  panel: {
    background: "#6B0F9C",
    boxShadow: "inset 0 0 0 5px rgba(255,255,255,0.1)",
    color: "white",
    textAlign: "center",
    alignItems: "center",
    /* Safari transitionend event.propertyName === flex */
    /* Chrome + FF transitionend event.propertyName === flex-grow */
    transition:
      "font-size 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11), flex 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11),background 0.2s",
    fontSize: "20px",
    flex: 1,
    backgroundSize: "cover",
    backgroundPosition: "center",
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
    flexDirection: "column",
    "& > *": {
      margin: 0,
      width: "100%",
      transition: "transform 0.5s",
      flex: "1 0 auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "& p": {
      textTransform: "uppercase",
      fontFamily: "'Amatic SC', cursive",
      textShadow: "0 0 4px rgba(0, 0, 0, 0.72), 0 0 14px rgba(0, 0, 0, 0.45)",
      fontSize: "2em",
    },
    "& p:nth-child(2)": {
      fontSize: "4em",
    },
    "& *:first-child": { transform: "translateY(-100%)" },
    "& *:last-child": { transform: "translateY(100%)" }
  },
  panel1: {
    backgroundImage: "url(https://source.unsplash.com/gYl-UtwNg_I/1500x1500)",
    // "& open": {
    //   flex: 5,
    //   fontSize: "40px",
    // }
  },
  panel2: {
    backgroundImage: "url(https://source.unsplash.com/rFKUFzjPYiQ/1500x1500)",
  },
  panel3: {
    backgroundImage: "url(https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&w=1500&h=1500&fit=crop&s=967e8a713a4e395260793fc8c802901d)",
  },
  panel4: {
    backgroundImage: "url(https://source.unsplash.com/ITjiVXcwVng/1500x1500)",
  },
  panel5: {
    backgroundImage: "url(https://source.unsplash.com/3MNzGlQM7qs/1500x1500)",
  }
}));

const FlexPanel = () => {
  const classes = useStyles();
  const panel1Ref = useRef();

  const handleClick = () => {
    const panel1El = panel1Ref.current;
    console.log("panel1El", panel1El.style)
    panel1El.style.flex = 5;
    panel1El.style.fontSize = "40px";
  }

  return (
    <Box className={classes.root}>
      <div className={classes.panels}>
        <button ref={panel1Ref} className={clsx(classes.panel, classes.panel1)} onClick={() => handleClick()}>
          <p>Let's</p>
          <p>Code</p>
          <p>Guys</p>
        </button>
        <div className={clsx(classes.panel, classes.panel2)}>
          <p>It</p>
          <p>Is</p>
          <p>Amazing</p>
        </div>
        <div className={clsx(classes.panel, classes.panel3)}>
          <p>Will Be</p>
          <p>Great</p>
          <p>Fun</p>
        </div>
        <div className={clsx(classes.panel, classes.panel4)}>
          <p>Now</p>
          <p>And</p>
          <p>Ever</p>
        </div>
        <div className={clsx(classes.panel, classes.panel5)}>
          <p>Have a</p>
          <p>Fun</p>
          <p>Day</p>
        </div>
      </div>
    </Box>
  );
};

export default FlexPanel;

