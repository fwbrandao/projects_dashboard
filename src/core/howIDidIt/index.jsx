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
    marginBottom: '15px'
  },
});

const HowIDidIt = ({ title, description, code, code2, code3, code4, code5, code6, code7, link }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={5}>
      <CardContent>
        <Typography
          variant="h2"
          className={classes.title}
          color="inherit"
          gutterBottom>
          {title}
        </Typography>
        <Typography
          className={classes.description}
          variant="body2"
          color="inherit"
          component="p"
        >
          {description}
        </Typography>
        <Typography
          color="inherit"
          display="block"
          gutterBottom
        >
          {code}
        </Typography>
        <Typography
          color="inherit"
          display="block"
          gutterBottom
        >
          {code2}
        </Typography>
        <Typography
          color="inherit"
          display="block"
          gutterBottom
        >
          {code3}
        </Typography>
        <Typography
          color="inherit"
          display="block"
          gutterBottom
        >
          {code4}
        </Typography>
        <Typography
          color="inherit"
          display="block"
          gutterBottom
        >
          {code5}
        </Typography>
        <Typography
          color="inherit"
          display="block"
          gutterBottom
        >
          {code6}
        </Typography>
        <Typography
          color="inherit"
          display="block"
          gutterBottom
        >
          {code7}
        </Typography>
        <Typography>{link}</Typography>
      </CardContent>
    </Card>
  );
}

export default HowIDidIt;
