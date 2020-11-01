import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography
}
  from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '80%',
    margin: '10px auto',
    display: "flex",
    backgroundColor: theme.palette.primary.main
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
}));

const HowIDidIt = ({ title, description, code, code2, code3, code4, code5, code6, code7, link }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={5}>
      <CardContent>
        <Typography
          variant="h2"
          className={classes.title}
          color="textPrimary"
          gutterBottom>
          {title}
        </Typography>
        <Typography
          className={classes.description}
          variant="body2"
          color="textPrimary"
          component="p"
        >
          {description}
        </Typography>
        <Typography
          color="textPrimary"
          display="block"
          gutterBottom
        >
          {code}
        </Typography>
        <Typography
          color="textPrimary"
          display="block"
          gutterBottom
        >
          {code2}
        </Typography>
        <Typography
          color="textPrimary"
          display="block"
          gutterBottom
        >
          {code3}
        </Typography>
        <Typography
          color="textPrimary"
          display="block"
          gutterBottom
        >
          {code4}
        </Typography>
        <Typography
          color="textPrimary"
          display="block"
          gutterBottom
        >
          {code5}
        </Typography>
        <Typography
          color="textPrimary"
          display="block"
          gutterBottom
        >
          {code6}
        </Typography>
        <Typography
          color="textPrimary"
          display="block"
          gutterBottom
        >
          {code7}
        </Typography>
        <Typography color="textPrimary">{link}</Typography>
      </CardContent>
    </Card>
  );
}

export default HowIDidIt;
