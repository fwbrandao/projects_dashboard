import React, { useState } from 'react';
import {
  Box,
  Fab,
  Grid,
  makeStyles,
} from '@material-ui/core';
// import NavigationIcon from '@material-ui/icons/Navigation';
import NavBar from '../../core/navBar';
import TopicDialog from '../../core/topicDialog/index';
import dsTopicsInfo from '../../assets/dsTopicsInfo';

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
    alignItems: 'center',
    '@media (max-width: 1024px)': {
      boxShadow: 'none',

    }
  },
  grid: {
    justifyContent: 'center',
    '@media (max-width: 1024px)': {
      display: 'grid',
      justifyItems: 'center',
      margin: 'auto',
      width: 'min-content',
      height: 'inherit'
    }
  },
  gridItem: {
    flexBasis: '29.333333%',
    display: 'flex',
    justifyContent: 'center',
    '@media (max-width: 1024px)': {
      display: 'grid',
      width: '100vh',
    }
  },
  fab: {
    '@media (max-width: 1024px)': {
      height: 'auto'
    }
  }
}));

const DataScience = () => {
  const classes = useStyles();
  const [openDialog, setDialogOpen] = useState(false);
  const [topicData, setTopicData] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [predict, setPredict] = useState(0);

  // useEffect(() => {
  //   fetch('/api/time').then(res => res.json()).then(data => {
  //     setCurrentTime(data.time)
  //   })
  //   fetch('/api/predict').then(res => res.json()).then(data => {
  //     setPredict(data.result)
  //   })
  // }, []);

  const handleOpen = (item) => {
    setDialogOpen(true);
    setTopicData(item)
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const isMobile = window.screen.width < 600;

  return (
    <Box>
      <NavBar />
      <Box
        className={classes.root}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box className={classes.shadow} borderRadius={16} width='75%' height='65%'>
          <Grid className={classes.grid} container spacing={5} display='flex' justifyContent='center'>
            {dsTopicsInfo.map(item => (
              <Grid key={item.id} item xs={4} className={classes.gridItem}>
                <Fab className={classes.fab} key={item.id} color="primary" variant="extended" onClick={() => handleOpen(item)}>
                  {/* <NavigationIcon  className={classes.extendedIcon} /> */}
                  <span>{item.topicTitle}</span>
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
      {/* <Box>
      <p>The current time is {currentTime}</p>
      <p>Prediction is  {predict}</p>

      </Box> */}
    </Box>
  );
}

export default DataScience;
