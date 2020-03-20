import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography
}
  from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: '80%',
    margin: '10px auto',
    paddingTop: '20px',
    display: "flex"
  },
  title: {
    fontSize: 18,
    display: "flex",
  },
  description: {
    fontSize: 15,
    display: "flex",
    justifyContent: "center",
  }
});

const HowIDidIt = ({ title, description, link }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={5}>
      <CardContent>
        <Typography
          variant="h2"
          className={classes.title}
          color="colorPrimary"
          gutterBottom>
          {title}
        </Typography>
        <Typography
          className={classes.description}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {description}
        </Typography>
        <Typography>{link}</Typography>
      </CardContent>
    </Card>
  );
}

export default HowIDidIt;
