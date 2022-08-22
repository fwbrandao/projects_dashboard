import React, { useState } from 'react';
import {
  Box,
  Fab,
  Link,
  Grid,
  makeStyles,
} from '@material-ui/core';
import NavBar from './core/navBar/index';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.backgroundColor.color,
  },
  content: {
    height: '100vh',
    width: '100vw',
  },
  grid: {
    justifyContent: 'center',
    '@media (max-width: 1024px)': {
      display: 'none'
    }
  },
  gridItem: {
    flexBasis: '29.333333%',
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    color: theme.palette.textPrimary.main,
    "&:hover": { textDecoration: "none" }
  },
  topicsContainer: {
    display: "flex",
    alignItems: "center",
  }
}));

const App = () => {
  const classes = useStyles();

  const topics = [
    { id: "miniJS", title: "Mini JS projects" },
    { id: "data-science", title: "Data Science" },
    { id: "games", title: "Games" },
    { id: "react", title: "React" },
    { id: "coming", title: "Coming soon..." },

  ];

  return (
    <Box className={classes.root}>
      <NavBar />
      <Box
        className={classes.content}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box className={classes.topicsContainer} borderRadius={16} width='75%' height='65%'>
          <Grid className={classes.grid} container spacing={5} display='flex' justifyContent='center'>
            {topics.map(item => (
              <Grid key={item.id} item xs={4} className={classes.gridItem}>
                <Fab key={item.id} color="primary" variant="extended">
                  <Link href='/data-science' className={classes.title}>{item.title}</Link>
                </Fab>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
