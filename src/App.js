import React, { useState } from 'react';
import {
  Box,
  Fab,
  Grid,
  makeStyles,
} from '@material-ui/core';
import NavigationIcon from '@material-ui/icons/Navigation';
import NavBar from './core/navBar/index';
import TopicDialog from './core/topicDialog/index';
import topicInfo from './assets/topicsInfo'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    width: '100vw',
    flexGrow: 1,
    backgroundColor: theme.palette.backgroundColor.color,
    backgroundSize: 'cover',
    overflow: 'hidden',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginTop: '100px',
    display: "flex",
    justifyContent: "center",
    color: 'white'
  },
  textBox: {
    display: 'flex',
    alignItems: 'center'
  },
  shadow: {
    boxShadow: theme.palette.backgroundColor.boxShadow,
    backgroundColor: theme.palette.backgroundColor.color,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  grid: {
    justifyContent: 'center',
  }
}));

const App = () => {
  const classes = useStyles();
  const [openDialog, setDialogOpen] = useState(false);
  const [topicData, setTopicData] = useState([])

  const handleClickOpen = (item) => {
    setDialogOpen(true);
    setTopicData(item)
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Box >
      <NavBar />
      <Box
        className={classes.root}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box className={classes.shadow} borderRadius={16} width='75%' height='65%'>
          <Grid className={classes.grid} container spacing={3} justifyContent='center'>
              {topicInfo.map(item => (
                <Grid item xs={4}>
                    <Fab key={item.id} color="primary" variant="extended" onClick={() => handleClickOpen(item)}>
                      {/* <NavigationIcon  className={classes.extendedIcon} /> */}
                      {item.topicTitle}
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
    </Box>
  );
}

export default App;
