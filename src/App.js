import React, { useState } from 'react';
import {
  Box,
  Fab,
  makeStyles,
} from '@material-ui/core';
import NavigationIcon from '@material-ui/icons/Navigation';
import NavBar from './core/navBar/index';
import TopicDialog from './core/topicDialog/index';

const topicInfo = [
  {id: 'CNN', title: 'Convolution Neural Networks'},
  {id: 'NNDL', title: 'Neural Networks and Deep Learning'},
  {id: 'SM', title: 'Sequence Models'}
];

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
}));

const App = () => {
  const classes = useStyles();
  const [openDialog, setDialogOpen] = useState(false);
  const [topicId, setTopicId] = useState('');
  const [topicTitle, setTopicTitle] = useState('');

  const handleClickOpen = (id, title) => {
    setDialogOpen(true);
    setTopicId(id);
    setTopicTitle(title)
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
          {topicInfo.map(item => (
            <Fab key={item.id} color="primary" variant="extended" onClick={() => handleClickOpen(item.id, item.title)}>
              <NavigationIcon  className={classes.extendedIcon} />
              {item.title}
            </Fab>
          ))}
          </Box>
        <TopicDialog
          open={openDialog}
          closeDialog={handleDialogClose}
          topicId={topicId}
          topicTitle={topicTitle}
        />
      </Box>
    </Box>
  );
}

export default App;
