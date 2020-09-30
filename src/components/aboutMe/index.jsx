import React from 'react';
import clsx from 'clsx';
import {
    Avatar,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Collapse,
    Link,
    IconButton,
    makeStyles,
    Typography,
    Tooltip
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AvatarImg from '../../images/fwbAvatar.jpg';

const useStyles = makeStyles((theme) => ({
    // root: {
    //     maxWidth: 345,
    //     },
        // media: {
        // height: 0,
        // paddingTop: '56.25%', // 16:9
        // },
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
        // avatar: {
        // backgroundColor: red[500],
        // },
  root: {
    maxWidth: 345,
    // display: 'flex',
    backgroundColor: theme.palette.aboutDrawer.main,
    height: '100vh',
    // justifyContent: 'center',
    // '& > *': {
    //   margin: theme.spacing(1),
    // },
  },
  large: {
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
}));

const AboutMe = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <Card className={classes.root}>
    <CardHeader
      avatar={
        <Avatar alt="Fernando Brandao" src={AvatarImg} className={classes.large}/>
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      title="Fernando Brandao"
      subheader="Software Engineer & Data Scientist"
    />
    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
        Welcome to my Data Science portfolio.
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
        <Tooltip title="Navigate to my github" aria-label="code">
            <Link href="https://github.com/fwbrandao" target="_blank">
                <IconButton aria-label="github" >
                    <GitHubIcon />
                </IconButton>
            </Link>
            </Tooltip>
            <Tooltip title="Navigate to my LinkedIn" aria-label="code">
            <Link href="https://www.linkedin.com/in/fernando-b-170060151/" target="_blank">
                <IconButton aria-label="LinkedIn" >
                    <LinkedInIcon color="action"/>
                </IconButton>
            </Link>
        </Tooltip>
      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </IconButton>
    </CardActions>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <Typography paragraph>Education:</Typography>
        <Typography paragraph>
          Info about certification
        </Typography>
        <Typography paragraph>
        Info about certification
        </Typography>
        <Typography paragraph>
        Info about certification
        </Typography>
        <Typography>
        Info about certification
        </Typography>
      </CardContent>
    </Collapse>
  </Card>
  );
}

export default AboutMe;