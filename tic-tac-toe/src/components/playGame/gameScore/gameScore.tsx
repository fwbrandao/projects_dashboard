import React, { FC } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Box, Button, Paper, Typography } from '@material-ui/core';

interface Winner {
  winner: any | null
  nextToPlay: boolean
  playerOne: string | null
  playerTwo: string | null
  reasetGame: any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: '30px',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
    scoreBoard: {
      width: '300px',
      height: '200px',
      display: 'grid',
      justifyContent: 'center',
      alignItems: 'start',
    },
  }),
);
const GameScoreBoard: FC<Winner> = ({ 
  winner, 
  nextToPlay, 
  playerOne, 
  playerTwo, 
  reasetGame 
}) => {
const classes = useStyles();

let currentWinner = null;

if(winner === 'X') {
  currentWinner = playerOne;
} 
if(winner === 'O') {
  currentWinner = playerTwo
}



return (
  <Box className={classes.root}>
    <Paper className={classes.scoreBoard}>
      <Typography>
        {winner ? `Winner is ${currentWinner}` : null}
      </Typography>
      <Typography>
        Next to play: {nextToPlay === true ? playerOne : playerTwo}
      </Typography>
      <Button 
        variant="outlined" 
        color="primary"
        onClick={reasetGame}
        >
          Restart Game
      </Button>
    </Paper>
  </Box>
)
}

export default GameScoreBoard;