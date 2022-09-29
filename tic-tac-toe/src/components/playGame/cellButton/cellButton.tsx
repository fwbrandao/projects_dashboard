import * as React from 'react';
import { Cell } from '../gameState/gameState';
import { Button, Typography } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      height: '100px',
      width: '100px',
      marginLeft: theme.spacing(1)
    }
  }));

export type CellProps = {
  value: Cell;
  onClick: () => void;
};

export function CellButton(props: CellProps) {
  const classes = useStyles();

  return (
    <Button 
      className={classes.button}
      variant="contained" 
      color="primary" 
      onClick={props.onClick}
    >
      <Typography variant="h3">{props.value}</Typography>
    </Button>
  );
}