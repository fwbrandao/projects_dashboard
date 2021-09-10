import React from 'react';
import { Card, CardHeader, CardMedia, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '80%',
    margin: '10px auto',
    height: '250px',
    backgroundColor: theme.palette.primary.main
  },
  media: {
    paddingTop: '17.25%',
  },
  title: {
    fontSize: 5
  }
}));

const CodeScreenshot = ({ image }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={5}>
      <CardHeader
        className={classes.title}
        subheader="Output Screenshot:"
      />
      <CardMedia
        className={classes.media}
        image={image}
        title="images"
      />
    </Card>
  );
}

export default CodeScreenshot;
