import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Link,
  makeStyles,
  Tooltip,
  Typography
}
  from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles(theme =>  ({
  root: {
    maxWidth: '55%',
    margin: '15px auto 5px auto',
    backgroundColor: theme.palette.primary
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
}));

const AboutProject = ({ title, description, gitHubLink }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={5}>
      <Box>
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
      </Box>
      <Box ml={2}>
        <CardActions>
          <Tooltip title="Navigate to see the code" aria-label="code">
            <Link href={gitHubLink} target="_blank">
              <IconButton aria-label="github" color='primary'>
                <GitHubIcon color='action' fontSize='small' />
              </IconButton>
            </Link>
          </Tooltip>
        </CardActions>
      </Box>
    </Card>
  );
}

export default AboutProject;
