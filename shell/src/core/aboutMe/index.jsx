import React from 'react';
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Chip,
  Collapse,
  Divider,
  Link,
  IconButton,
  makeStyles,
  Paper,
  Typography,
  Tooltip
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import { skillsData, linkedInURL, gitHubURL } from '../../assets/aboutMe';
import LinkedInIcon from '@material-ui/icons/LinkedIn';;
import AvatarImg from '../../images/fwbAvatar.jpg';

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  root: {
    maxWidth: 345,
    backgroundColor: theme.palette.primary.main,
    height: '100vh',
    overflow: 'auto',
  },
  avatar: {
    borderRadius: '52px'
  },
  large: {
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
  chipRoot: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
    backgroundColor: theme.palette.primary.main,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  footer: {
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
  },
}));

const AboutMe = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Paper elevation={10} className={classes.avatar}>
            <Avatar alt="F Brandao" src={AvatarImg} className={classes.large} />
          </Paper>
        }
        title="Fernando Brandao"
        subheader="Software Engineer"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Hello and welcome to my projects portfolio.
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          This is a space where I share some of my projects and ideas.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Navigate to my github" aria-label="code">
          <Link href={gitHubURL} target="_blank">
            <IconButton aria-label="github" >
              <GitHubIcon fontSize="large" />
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title="Navigate to my LinkedIn" aria-label="code">
          <Link href={linkedInURL} target="_blank">
            <IconButton aria-label="LinkedIn" >
              <LinkedInIcon fontSize="large" />
            </IconButton>
          </Link>
        </Tooltip>

      </CardActions>
      <Divider />

      <CardContent>
        <Typography variant="body2" paragraph>Skills learned with my projects</Typography>
        <Paper component="ul" className={classes.chipRoot} elevation={6}>
          {skillsData.map((item, index) => {
            let icon;
            return (
              <li key={index}>
                <Chip
                  icon={icon}
                  label={item}
                  size="small"
                  className={classes.chip}
                />
              </li>
            );
          })}
        </Paper>
      </CardContent>
    </Card>
  );
}

export default AboutMe;