import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  Link,
  Tooltip,
  Typography
}
  from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import grey from '@material-ui/core/colors/grey';


const useStyles = makeStyles({
  root: {
    maxWidth: '80%',
    margin: '10px auto',
    paddingTop: '20px',
    backgroundColor: grey[100]
  },
  title: {
    fontSize: 18,
    display: "flex",
    justifyContent: "center"
  },
  description: {
    fontSize: 15,
    display: "flex",
    justifyContent: "center",
    margin: '15px 20px 0px 20px',
  }
});

const AboutProject = ({ title, description, gitHubLink }) => {
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
      </CardContent>
      <CardActions disableSpacing ml={20}>
        <Tooltip title="Navigate to see the code" aria-label="code">
          <Link href={gitHubLink} target="_blank">
            <IconButton aria-label="github" color='primary'>
              <GitHubIcon color='action' />
            </IconButton>
          </Link>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

export default AboutProject;
