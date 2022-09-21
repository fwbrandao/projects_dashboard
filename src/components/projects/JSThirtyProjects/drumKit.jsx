import React from "react";
import {
  Box,
  makeStyles,
} from '@material-ui/core';
import image from '../../../images/drum.jpg';
import clap from './sounds/clap.wav';
import boom from './sounds/boom.wav';
import hihat from './sounds/hihat.wav';
import kick from './sounds/kick.wav';
import openhat from './sounds/openhat.wav';
import ride from './sounds/ride.wav';
import snare from './sounds/snare.wav';
import tink from './sounds/tink.wav';
import tom from './sounds/tom.wav';


const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    backgroundImage: `url(${image})`,
    backgroundSize: "cover"
  },
  keys: {
    display: "flex",
    flex: "1",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center"
  },
  key: {
    border: ".4rem solid black",
    borderRadius: ".5rem",
    margin: "1rem",
    fontSize: "1.5rem",
    padding: "1rem .5rem",
    transition: "all .07s ease",
    width: "10rem",
    textAlign: "center",
    color: "white",
    background: "rgba(0,0,0,0.4)",
    textShadow: "0 0 .5rem black",
  },
  sound: {
    fontSize: "1.2rem",
    textTransform: "uppercase",
    letterSpacing: ".1rem",
    color: "#ffc600",
  },
  kbd: {
    display: "block",
    fontSize: "4rem",
  },
  playing: {
    transform: "scale(1.1)",
    borderColor: "#ffc600",
    boxShadow: "0 0 1rem #ffc600",
  }
}))

const DrumKit = () => {
  const classes = useStyles();

  window.addEventListener('keydown', playSound);

  function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);

    if (!audio) return; //stop function 

    audio.currentTime = 0; //rewind to the start

    audio.play();

  }

  return (
    <Box className={classes.root}>
      <div className={classes.keys}>
        <div data-key="65" className={classes.key}>
          <kbd className={classes.kbd}>A</kbd>
          <span className={classes.sound}>clap</span>
        </div>
        <div data-key="83" className={classes.key}>
          <kbd className={classes.kbd}>S</kbd>
          <span className={classes.sound}>hihat</span>
        </div>
        <div data-key="68" className={classes.key}>
          <kbd className={classes.kbd}>D</kbd>
          <span className={classes.sound}>kick</span>
        </div>
        <div data-key="70" className={classes.key}>
          <kbd className={classes.kbd}>F</kbd>
          <span className={classes.sound}>openhat</span>
        </div>
        <div data-key="71" className={classes.key}>
          <kbd className={classes.kbd}>G</kbd>
          <span className={classes.sound}>boom</span>
        </div>
        <div data-key="72" className={classes.key}>
          <kbd className={classes.kbd}>H</kbd>
          <span className={classes.sound}>ride</span>
        </div>
        <div data-key="74" className={classes.key}>
          <kbd className={classes.kbd}>J</kbd>
          <span className={classes.sound}>snare</span>
        </div>
        <div data-key="75" className={classes.key}>
          <kbd className={classes.kbd}>K</kbd>
          <span className={classes.sound}>tom</span>
        </div>
        <div data-key="76" className={classes.key}>
          <kbd className={classes.kbd}>L</kbd>
          <span className={classes.sound}>tink</span>
        </div>
      </div>
      <audio data-key="65" src={clap}></audio>
      <audio data-key="83" src={hihat}></audio>
      <audio data-key="68" src={kick}></audio>
      <audio data-key="70" src={openhat}></audio>
      <audio data-key="71" src={boom}></audio>
      <audio data-key="72" src={ride}></audio>
      <audio data-key="74" src={snare}></audio>
      <audio data-key="75" src={tom}></audio>
      <audio data-key="76" src={tink}></audio>
    </Box>
  )
}

export default DrumKit;