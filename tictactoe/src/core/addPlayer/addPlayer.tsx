import React, { FC } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

interface Users {
  playerOne: string | null
  playerTwo: string | null
  getPlayerName: (arg1: string, arg2: string) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

const AddPlayers: FC<Users> = ({ playerOne, playerTwo, getPlayerName }) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField 
              role="textFieldUserOne"
              id="input-with-icon-grid" 
              label="Add player #1" 
              value={playerOne}
              onChange={(e) => getPlayerName('playerOne', e.target.value)}
            />
          </Grid>
        </Grid>
      </div>
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField 
              role="textFieldUserTwo"
              id="input-with-icon-grid" 
              label="Add player #2" 
              value={playerTwo}
              onChange={(e) => getPlayerName('playerTwo', e.target.value)}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default AddPlayers;
