import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: '50%',
    margin: '10px auto',
    paddingTop: '20px',
  },
  title: {
    fontSize: 20,
  },
});

const AboutProject = ({ title }) => {
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
        </CardContent>
      </Card>
  );
}

export default AboutProject;
