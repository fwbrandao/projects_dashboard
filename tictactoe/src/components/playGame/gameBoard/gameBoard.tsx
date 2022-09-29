import * as React from 'react';
import { BoardState } from '../gameState/gameState';
import { CellProps, CellButton } from '../cellButton/cellButton';
import { Box } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      display: 'flex',
      flexDirection: 'row',
      margin: theme.spacing(1)
    },
    col: {
      display: 'flex',
      flexDirection: 'column',
      margin: theme.spacing(1)
    },
  }),
);

type BoardProps = {
  board: BoardState;
  onClick: (cell: number) => void;
};

export function GameBoard({ board, onClick }: BoardProps) {
  const classes = useStyles();

  const createProps = (cell: number): CellProps => {
    return {
      value: board[cell],
      onClick: () => onClick(cell),
    };
  };
  return (
    <Box className={classes.col}>
      <Box className={classes.row}>
        <CellButton {...createProps(0)} />
        <CellButton {...createProps(1)} />
        <CellButton {...createProps(2)} />
      </Box>
      <Box className={classes.row}>
        <CellButton {...createProps(3)} />
        <CellButton {...createProps(4)} />
        <CellButton {...createProps(5)} />
      </Box>
      <Box className={classes.row}>
        <CellButton {...createProps(6)} />
        <CellButton {...createProps(7)} />
        <CellButton {...createProps(8)} />
      </Box>
    </Box>
  );
}