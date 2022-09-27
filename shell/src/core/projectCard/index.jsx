import React, { useState, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { JsProjectContext } from '../../context/use-current-project';
import clsx from 'clsx';
import {
  Box,
  Button,
  Chip,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  Paper,
  Tooltip,
  makeStyles,
  Typography,
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 600,
    maxHeight: 790,
    minWidth: 600,
    minHeight: 290,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    transition: 'all .2s ease-in-out',
    "&:hover": { transform: 'scale(1.01)' },
    '@media (max-width: 1024px)': {
      minWidth: 360,
    }
  },
  media: {
    height: 270,
  },
  iconLiked: {
    marginLeft: 'auto',
    color: theme.palette.primary.heart
  },
  iconNotLiked: {
    marginLeft: 'auto',
  },
  link: {
    textDecoration: 'none',
  },
  expand: {
    transform: 'rotate(0deg)',
    // marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
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
}));

const ProjectCard = ({ data }) => {
  const classes = useStyles();
  const { setProject } = useContext(JsProjectContext)
  const [isLiked, setIsLiked] = useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const { link, img, gitHub, projectTitle, projectIntro, skills, externalURL } = data;

  const handleProjectClick = useCallback(() => {
    setProject(projectTitle);
  }, [projectTitle, setProject]);

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box>
      <Card className={classes.root} elevation={5}>
        <Link to={link} className={classes.link} onClick={handleProjectClick}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={img}
              title={projectTitle}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" color="textPrimary" component="h2">
                {projectTitle}
              </Typography>
              <Typography variant="body2" color="textPrimary" component="p">
                {projectIntro}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>

        <CardActions disableSpacing>
          {link ? (
            <Link to={link} className={classes.link}>
              <Button size="small">
                View Project
              </Button>
            </Link>
          ) : (
            <Button href={externalURL} target="_blank" size="small">
              View Project
            </Button>
          )}
          <IconButton
            className={isLiked ? classes.iconLiked : classes.iconNotLiked}
            onClick={handleLike}
            aria-label="liked"
          >
            <ThumbUpOutlinedIcon />
          </IconButton>
          <IconButton aria-label="github" href={gitHub} target="_blank">
            <GitHubIcon />
          </IconButton>
          <Tooltip title="Technologies used" aria-label="Technologies used">
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
          </Tooltip>
        </CardActions>
      </Card>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Paper component="ul" className={classes.chipRoot} elevation={6}>
            {skills.map(skill => {
              let icon;

              // if (data.label === 'React') {
              // icon = <TagFacesIcon />;
              // }

              return (
                <li key={skill}>
                  <Chip
                    icon={icon}
                    label={skill}
                    size="small"
                    // onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                    className={classes.chip}
                  />
                </li>
              );
            })}
          </Paper>
        </CardContent>
      </Collapse>
    </Box>
  );
};

export default ProjectCard;
