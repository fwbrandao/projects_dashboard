import React, { FC, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Box, Button, Paper } from '@material-ui/core';
import AddPlayers from '../../core/addPlayer/addPlayer';
import PlayGame from '../playGame/playGame'

interface GamaPLayers {
  gameHasPlayers: boolean
  setGameHasPlayers: any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      width: '300px',
      flexWrap: 'wrap',
      margin: '100px auto 0 auto',
    },
    startButton: {
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '20px'
    }
  }),
);

const SignUpGame: FC<GamaPLayers> = ({ gameHasPlayers, setGameHasPlayers }) => {
  const classes = useStyles();
  const [playerOne, setPlayerOne] = useState('');
  const [playerTwo, setPlayerTwo] = useState('');

  const getPlayerName = (player: string, name: any):void => {
    if (player === 'playerOne') {
      setPlayerOne(name);
    } else if (player === 'playerTwo') {
      setPlayerTwo(name);
    } else {
      return;
    }
  }

  const handleGameStart = () => {
    if (
      (playerOne !== null && playerOne !== '') && 
      (playerTwo !== null && playerTwo !== '')) {
      setGameHasPlayers(true);
    } else {
      alert('Please add players!')
    }
  }

  return (
    <Box>
      {!gameHasPlayers ? (
        <>
          <Paper elevation={3} className={classes.root}>
            <AddPlayers 
              playerOne={playerOne} 
              playerTwo={playerTwo} 
              getPlayerName={getPlayerName}
            />
          </Paper>
          <Box className={classes.startButton}>
            <Button 
              variant="outlined" 
              color="primary"
              onClick={handleGameStart}
            >
              Start Game
            </Button>
          </Box>
        </>
      ) : (
        <PlayGame 
          playerOne={playerOne} 
          playerTwo={playerTwo}
        />
      )}
    </Box>
  );
}

export default SignUpGame;
