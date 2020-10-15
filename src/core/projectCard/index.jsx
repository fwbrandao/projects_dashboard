import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    makeStyles,
    Typography,
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 700,
    maxHeight: 790,
    minWidth: 500,
    minHeight: 290,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.main
  },
  media: {
    height: 370,
  },
  iconLiked: {
      marginLeft: 'auto',
      color: theme.palette.secondary.main
  },
  iconNotLiked: {
    marginLeft: 'auto',
    // color: theme.palette.secondary.main
  }
}));

const ProjectCard = ({ data }) => {
  const classes = useStyles();
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={data.img}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" color="textPrimary" component="h2">
              {data.projectTitle}
            </Typography>
            <Typography variant="body2" color="textPrimary" component="p">
              {data.projectIntro}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing>
          <Button size="small">
            View Project
          </Button>
          <IconButton
              className={isLiked ? classes.iconLiked : classes.iconNotLiked}
              onClick={handleLike}
              aria-label="liked"
          >
            <ThumbUpOutlinedIcon />
          </IconButton>
          <IconButton aria-label="github">
            <GitHubIcon />
          </IconButton>
        </CardActions>
      </Card>
  );
};

export default ProjectCard;
