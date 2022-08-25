import React, { useState } from 'react';
import { Link as LinkReact } from 'react-router-dom';
import {
  Box,
  Fab,
  Link,
  Grid,
  makeStyles,
} from '@material-ui/core';
import NavBar from './core/navBar/index';
import TopicDialog from './core/topicDialog/index';
import mainTopicsInfo from './assets/mainTopicsInfo';
import bgImage from './images/bgImage.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.backgroundColor.color,
    // backgroundImage: 'src(bgImage)'
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
    textDecoration: 'none',
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
  const [openDialog, setDialogOpen] = useState(false);
  const [topicData, setTopicData] = useState([]);


  const handleOpen = (item) => {
    if (item.id === "dataScience") return;
    setTopicData(item);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

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
            {mainTopicsInfo.map(item => (
              <Grid key={item.id} item xs={4} className={classes.gridItem}>
                <Fab key={item.id} color="primary" variant="extended" onClick={() => handleOpen(item)}>
                  {item.id === "dataScience" ? (
                    <LinkReact to='/data-science' className={classes.title}>{item.topicTitle}</LinkReact>
                  ) : (
                    <Link className={classes.title}>{item.topicTitle}</Link>
                  )}
                </Fab>
              </Grid>
            ))}
          </Grid>
        </Box>
        <TopicDialog
          open={openDialog}
          closeDialog={handleDialogClose}
          topicData={topicData}
        />
      </Box>
    </Box >
  );
}

export default App;
