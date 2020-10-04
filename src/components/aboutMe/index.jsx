import React from 'react';
import clsx from 'clsx';
import {
    Avatar,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Chip,
    Collapse,
    Link,
    IconButton,
    makeStyles,
    Paper,
    Typography,
    Tooltip
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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
        backgroundColor: theme.palette.aboutDrawer.main,
        height: '100vh',
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
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

const AboutMe = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Tensorflow' },
    { key: 1, label: 'Convolutional Neural Network' },
    { key: 2, label: 'Artificial Neural Network' },
    { key: 3, label: 'Deep Learning' },
    { key: 4, label: 'Backpropagation' },
    { key: 4, label: 'Python Programming' },
    { key: 4, label: 'Hyperparameter' },
    { key: 4, label: 'Hyperparameter Optimization' },
    { key: 4, label: 'Machine Learning' },
    { key: 4, label: 'Inductive Transfer' },
    { key: 4, label: 'Multi-Task Learning' },
    { key: 4, label: 'Facial Recognition System' },
    { key: 4, label: 'Keras' },
  ]);

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
        Hello and Welcome to my Data Science portfolio.
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        This is a space where I share my projects and ideas.
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
        <Tooltip title="Navigate to my github" aria-label="code">
            <Link href="https://github.com/fwbrandao" target="_blank">
                <IconButton aria-label="github" >
                    <GitHubIcon fontSize="large"/>
                </IconButton>
            </Link>
            </Tooltip>
            <Tooltip title="Navigate to my LinkedIn" aria-label="code">
            <Link href="https://www.linkedin.com/in/fernando-b-170060151/" target="_blank">
                <IconButton aria-label="LinkedIn" >
                    <LinkedInIcon color="action" fontSize="large"/>
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
        <Typography paragraph>Skills learned with my projects</Typography>
            <Paper component="ul" className={classes.chipRoot}>
                {chipData.map((data) => {
                    let icon;

                    // if (data.label === 'React') {
                    // icon = <TagFacesIcon />;
                    // }

                    return (
                    <li key={data.key}>
                        <Chip
                            icon={icon}
                            label={data.label}
                            // onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                            className={classes.chip}
                        />
                    </li>
                    );
                })}
            </Paper>
      </CardContent>
    </Collapse>
  </Card>
  );
}

export default AboutMe;