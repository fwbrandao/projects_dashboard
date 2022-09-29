import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import NavBar from '../core/navBar/navBar';
import SignUpGame from './signUpGame/signUpGame';

const SignIn = () => {

  const [gameHasPlayers, setGameHasPlayers] = useState(false);

  return (
    <Box role="appContainer">
      <NavBar setGameHasPlayers={setGameHasPlayers}/>
      <SignUpGame gameHasPlayers={gameHasPlayers} setGameHasPlayers={setGameHasPlayers}/>
    </Box>
  );
}

export default SignIn;